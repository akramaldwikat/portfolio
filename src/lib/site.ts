import { profile } from "@/data/profile";
export type Locale = "en" | "ar";
export const routes = [
  "",
  "about",
  "services",
  "projects",
  "projects/flowdesk",
  "contact",
] as const;
export type PageRoute = (typeof routes)[number];
export const href = (locale: Locale, path = "") =>
  `${locale === "ar" ? "/ar" : ""}/${path}`.replace(/\/$/, "") || "/";
export function safeUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}
export function siteOrigin(value?: string) {
  const safe = safeUrl(value);
  if (!safe) return undefined;
  const url = new URL(safe);
  return url.pathname === "/" &&
    !url.search &&
    !url.hash &&
    !url.username &&
    !url.password
    ? url.origin
    : undefined;
}
export function normalizePhone(value?: string) {
  if (!value) return undefined;
  const normalized = value
    .trim()
    .replace(/[\s()-]/g, "")
    .replace(/^00/, "+");
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : undefined;
}
const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || profile.email;
const whatsapp = normalizePhone(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || profile.whatsapp,
);
export const site = {
  name: profile.name,
  url: siteOrigin(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  configured: Boolean(siteOrigin(process.env.NEXT_PUBLIC_SITE_URL)),
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(publicEmail)
    ? publicEmail
    : undefined,
  linkedin: safeUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL || profile.linkedin),
  github: safeUrl(process.env.NEXT_PUBLIC_GITHUB_URL || profile.github),
  whatsapp,
  whatsappUrl: whatsapp ? `https://wa.me/${whatsapp.slice(1)}` : undefined,
  flowdeskGithub: "https://github.com/akramaldwikat/flowDesk",
  flowdeskDemo: "https://flowdesk-web-8atx.onrender.com/",
};
