import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { content } from "@/data/content";
import { site, type Locale } from "@/lib/site";
import { Header } from "@/components/controls";
import { Footer } from "@/components/ui";
import "../globals.css";
import "../phase-two.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    metadataBase: new URL(site.url),
    title: locale === "ar" ? "أكرم الدويكات" : "Akram Aldwikat",
  };
}

const manrope = localFont({
  src: "../../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
});
const arabic = localFont({
  src: "../../../node_modules/@fontsource-variable/noto-sans-arabic/files/noto-sans-arabic-arabic-wght-normal.woff2",
  variable: "--font-arabic",
  display: "swap",
});
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}catch(e){}})()`;
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: value } = await params;
  if (value !== "en" && value !== "ar") notFound();
  const locale: Locale = value;
  const sameAs = [site.github, site.linkedin].filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        alternateName: "أكرم الدويكات",
        url: site.url,
        jobTitle: content[locale].role,
        knowsLanguage: ["en", "ar"],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: ["en", "ar"],
        author: { "@id": `${site.url}/#person` },
      },
    ],
  };
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${manrope.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="color-scheme" content="light dark" />
        {site.configured && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        )}
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          {content[locale].skip}
        </a>
        <Header locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
