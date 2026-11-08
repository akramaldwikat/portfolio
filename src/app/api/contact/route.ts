import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { contactSchema, rateLimit } from "@/lib/contact";
import { formCopy } from "@/data/contact-copy";
import { isContactConfigured } from "@/lib/contact-config";
import { site } from "@/lib/site";

export const runtime = "nodejs";
const reply = (status: number, code: string) =>
  NextResponse.json(
    { code },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const requestOrigin = `${request.nextUrl.protocol}//${request.headers.get("host") || request.nextUrl.host}`;
  const allowedOrigin =
    process.env.NODE_ENV === "production" && site.configured
      ? site.url
      : requestOrigin;
  if (!origin || origin !== allowedOrigin) return reply(403, "origin");
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply(415, "content-type");
  if (Number(request.headers.get("content-length")) > 20_000)
    return reply(413, "too-large");
  if (!request.body) return reply(400, "invalid");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 20_000) {
        await reader.cancel();
        return reply(413, "too-large");
      }
      chunks.push(value);
    }
  } catch {
    return reply(400, "invalid");
  }
  let body: unknown;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply(400, "invalid");
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return reply(400, "invalid");
  if (!isContactConfigured()) return reply(503, "not-configured");
  // Deployment must overwrite forwarded IP headers at the trusted reverse proxy.
  const ip =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  try {
    if (!(await rateLimit(key))) return reply(429, "rate-limited");
    const data = parsed.data;
    const t = formCopy[data.locale];
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(12_000),
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: data.email,
        subject: "New portfolio project inquiry",
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || "—"}`,
          `Type: ${t.types[Number(data.type)]}`,
          `Budget: ${t.budgets[Number(data.budget)]}`,
          `Language: ${data.locale}`,
          "",
          data.description,
        ].join("\n"),
      }),
    });
    if (!response.ok) return reply(502, "delivery-failed");
    const confirmation = (await response.json()) as { id?: string };
    if (!confirmation.id) return reply(502, "delivery-failed");
    return reply(200, "sent");
  } catch {
    return reply(502, "delivery-failed");
  }
}
