import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Layers3,
  Database,
  Braces,
  Workflow,
  Check,
} from "lucide-react";
import { content, stack } from "@/data/content";
import { services } from "@/data/services";
import { href, site, type Locale } from "@/lib/site";

export function Arrow({ straight = false }: { straight?: boolean }) {
  return straight ? (
    <ArrowRight size={17} className="directional" aria-hidden="true" />
  ) : (
    <ArrowUpRight size={17} className="directional" aria-hidden="true" />
  );
}
export function SectionHeading({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
    </section>
  );
}
export { SystemDiagram } from "./architecture-diagram";
export { ProjectCards } from "./project-cards";
export function ServiceRows({ locale }: { locale: Locale }) {
  return (
    <div className="service-rows">
      {services[locale].map((s, i) => (
        <Link
          className="service-row"
          key={s.title}
          href={`${href(locale, "services")}#service-${i + 1}`}
        >
          <span className="service-number">0{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <span className="round-arrow">
            <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}
export function Values({ locale }: { locale: Locale }) {
  return (
    <div className="values-grid">
      {content[locale].values.map(([title, text], i) => (
        <article key={title}>
          <span className="value-icon">
            {i === 0 ? (
              <Workflow size={21} />
            ) : i === 1 ? (
              <Layers3 size={21} />
            ) : i === 2 ? (
              <Database size={21} />
            ) : i === 3 ? (
              <Braces size={21} />
            ) : (
              <Check size={21} />
            )}
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}
export function TechStack({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <div className="stack-grid">
      {stack.map((group, i) => (
        <div key={i}>
          <span className="stack-index">0{i + 1}</span>
          <h3>{t.stackGroups[i]}</h3>
          <ul>
            {group.map((tech) => (
              <li key={tech} dir="ltr">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export function Process({ locale }: { locale: Locale }) {
  return (
    <ol className="process-grid">
      {content[locale].process.map(([title, text], i) => (
        <li key={title}>
          <span>0{i + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  );
}
export function CTA({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="container cta-wrap">
      <div className="cta">
        <div className="cta-decoration" aria-hidden="true">
          ↗
        </div>
        <div>
          <p className="eyebrow">
            {locale === "ar"
              ? "الخطوة التالية تبدأ بمحادثة"
              : "GOOD SOFTWARE STARTS WITH A CONVERSATION"}
          </p>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDescription}</p>
        </div>
        <Link href={href(locale, "contact")} className="button light">
          {t.discuss}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
export function SocialLinks({
  locale,
  detailed = false,
}: {
  locale: Locale;
  detailed?: boolean;
}) {
  const links = [
    ["LinkedIn", site.linkedin],
    ["GitHub", site.github],
    [
      detailed ? site.email : locale === "ar" ? "البريد الإلكتروني" : "Email",
      site.email ? `mailto:${site.email}` : undefined,
    ],
    [detailed ? `WhatsApp · ${site.whatsapp}` : "WhatsApp", site.whatsappUrl],
  ];
  if (!links.some(([, url]) => url)) return null;
  return (
    <div className="social-links">
      {links
        .filter(([, url]) => Boolean(url))
        .map(([name, url]) => (
          <a
            key={name}
            href={url}
            target={url?.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            <bdi>{name}</bdi>
            <Arrow />
          </a>
        ))}
    </div>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <footer className="container footer">
      <div className="footer-top">
        <div>
          <Link href={href(locale)} className="footer-name">
            Akram Aldwikat<span>.</span>
          </Link>
          <p>{t.footerLine}</p>
        </div>
        <SocialLinks locale={locale} />
        <nav className="footer-nav" aria-label={t.footerNavLabel}>
          {["services", "projects", "contact"].map((path, i) => (
            <Link key={path} href={href(locale, path)}>
              {t.nav[i + 2]}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Akram Aldwikat. {t.rights}
        </span>
        <span>{t.footerNote}</span>
      </div>
    </footer>
  );
}
