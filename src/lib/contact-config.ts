import { safeUrl, siteOrigin } from "./site";

/** Shared readiness gate for the server-rendered form and server-only endpoint. */
export function isContactConfigured(
  env: Readonly<Record<string, string | undefined>> = process.env,
) {
  const origin = siteOrigin(env.NEXT_PUBLIC_SITE_URL);
  return Boolean(
    origin &&
    env.RESEND_API_KEY &&
    env.CONTACT_FROM &&
    env.CONTACT_TO &&
    safeUrl(env.UPSTASH_REDIS_REST_URL) &&
    env.UPSTASH_REDIS_REST_TOKEN,
  );
}
