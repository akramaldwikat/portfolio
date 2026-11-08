import type { MetadataRoute } from "next";
import { href, routes, site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "ar"].flatMap((value) =>
    routes.map((route) => ({
      url: `${site.url}${href(value as "en" | "ar", route)}`,
      alternates: {
        languages: {
          en: `${site.url}${href("en", route)}`,
          ar: `${site.url}${href("ar", route)}`,
        },
      },
    })),
  );
}
