// Server-side rate limiting. Browser validation is isolated in contact-schema.ts.
export { contactSchema } from "./contact-schema";
export type { Inquiry } from "./contact-schema";
const buckets = new Map<string, { count: number; reset: number }>();
export function localRateLimit(key: string, now = Date.now()) {
  for (const [id, bucket] of buckets)
    if (bucket.reset <= now) buckets.delete(id);
  const current = buckets.get(key);
  if (current) {
    current.count += 1;
    return current.count <= 5;
  }
  // Bounded memory even under traffic with many distinct keys.
  if (buckets.size >= 10_000) return false;
  buckets.set(key, { count: 1, reset: now + 600_000 });
  return true;
}
export async function rateLimit(key: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token)
    return process.env.NODE_ENV !== "production" && localRateLimit(key);
  // Atomic fixed-window counter: expiry cannot be lost between separate commands.
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n",
      "1",
      `portfolio:contact:${key}`,
    ]),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!result.ok) throw new Error("Rate limit unavailable");
  const data = (await result.json()) as { result?: number };
  if (typeof data.result !== "number")
    throw new Error("Invalid limiter response");
  return data.result <= 5;
}
