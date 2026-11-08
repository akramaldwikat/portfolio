import type { Metadata } from "next";
import { content } from "@/data/content";
import { href, site, type Locale, type PageRoute } from "./site";
const pageNames = {
  en: [
    "Full-Stack Software Engineer & Business Systems Developer",
    "About",
    "Services",
    "Projects",
    "FlowDesk — Multi-Tenant Business Operations Platform",
    "Contact",
  ],
  ar: [
    "مهندس برمجيات متكامل ومطوّر أنظمة أعمال",
    "نبذة عني",
    "الخدمات",
    "المشاريع",
    "FlowDesk — منصة إدارة عمليات الأعمال متعددة المؤسسات",
    "تواصل معي",
  ],
};
const paths = [
  "",
  "about",
  "services",
  "projects",
  "projects/flowdesk",
  "contact",
];
export function pageMetadata(locale: Locale, route: PageRoute): Metadata {
  const t = content[locale];
  const index = paths.indexOf(route);
  const title = `${pageNames[locale][index]} | ${locale === "ar" ? "أكرم الدويكات" : site.name}`;
  const description = [
    t.heroDescription,
    t.aboutIntro,
    t.servicesPageIntro,
    t.projectsPageIntro,
    locale === "ar"
      ? "دراسة مشروع FlowDesk المستقل، تطبيق متكامل لإدارة عمليات الأعمال باستخدام Next.js وNestJS وPostgreSQL، مع عزل بيانات المؤسسات وإدارة الصلاحيات حسب الدور."
      : "A full-stack portfolio case study built with Next.js, NestJS and PostgreSQL, covering organization isolation, RBAC and a deployed business operations workflow.",
    t.contactIntro,
  ][index];
  const canonical = href(locale, route);
  const image = locale === "ar" ? "/ar/opengraph-image" : "/opengraph-image";
  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages: {
        en: href("en", route),
        ar: href("ar", route),
        "x-default": href("en", route),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "ar" ? "ar_JO" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_JO",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${t.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: site.configured, follow: site.configured },
  };
}
