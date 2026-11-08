import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { content } from "@/data/content";
import { services } from "@/data/services";
import { href, site, type Locale } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { isContactConfigured } from "@/lib/contact-config";
export { FlowdeskPage } from "./flowdesk-case-study";
import {
  Arrow,
  CTA,
  PageIntro,
  Process,
  ProjectCards,
  SectionHeading,
  ServiceRows,
  SocialLinks,
  SystemDiagram,
  TechStack,
  Values,
} from "./ui";

export function HomePage({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-square" />
            {t.shortRole}
          </p>
          <h1>
            {t.heroStart} <span>{t.heroAccent}</span> {t.heroEnd}
          </h1>
          <p className="hero-role">{t.role}</p>
          <p className="hero-description">{t.heroDescription}</p>
          <div className="hero-buttons">
            <Link href={href(locale, "contact")} className="button">
              {t.discuss}
              <Arrow />
            </Link>
            <Link href={href(locale, "projects")} className="button secondary">
              {t.work}
              <Arrow straight />
            </Link>
          </div>
          <p className="hero-note">
            <span className="note-line" />
            {t.heroNote}
          </p>
          <Link
            href={`${href(locale, "projects/flowdesk")}#architecture`}
            className="text-link hero-proof-link"
          >
            {t.proofLink}
            <Arrow />
          </Link>
        </div>
        <SystemDiagram locale={locale} />
      </section>
      <div className="hero-bottom container proof-band">
        {t.proofPoints.map((point, i) => (
          <span key={point}>
            <span aria-hidden="true">0{i + 1}</span>
            {point}
          </span>
        ))}
      </div>
      <section className="container section">
        <SectionHeading
          label={t.servicesLabel}
          title={t.servicesTitle}
          description={t.servicesIntro}
        >
          <Link href={href(locale, "services")} className="text-link">
            {t.allServices}
            <Arrow />
          </Link>
        </SectionHeading>
        <ServiceRows locale={locale} />
      </section>
      <section className="tinted-section">
        <div className="container section">
          <SectionHeading
            label={t.projectsLabel}
            title={t.projectsTitle}
            description={t.projectsIntro}
          >
            <Link href={href(locale, "projects")} className="text-link">
              {t.allProjects}
              <Arrow />
            </Link>
          </SectionHeading>
          <ProjectCards locale={locale} featuredOnly />
        </div>
      </section>
      <section className="container section">
        <SectionHeading label={t.whyLabel} title={t.whyTitle} />
        <Values locale={locale} />
      </section>
      <section className="stack-section">
        <div className="container section">
          <SectionHeading
            label={t.stackLabel}
            title={t.stackTitle}
            description={t.stackIntro}
          />
          <TechStack locale={locale} />
        </div>
      </section>
      <section className="container section">
        <SectionHeading label={t.processLabel} title={t.processTitle} />
        <Process locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function AboutPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <>
      <PageIntro
        label={t.aboutLabel}
        title={t.aboutTitle}
        description={t.aboutIntro}
      />
      <section className="container about-grid">
        <aside className="engineering-card">
          <p className="eyebrow">{t.shortRole}</p>
          <ul>
            {t.responsibilities.map((item, i) => (
              <li key={item}>
                <span aria-hidden="true">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
        <div className="prose">
          <p>{t.aboutBody}</p>
          <h2>{t.approachTitle}</h2>
          <p>{t.approachBody}</p>
          <ol className="how-steps">
            {t.howSteps.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="confidentiality">
            <ShieldCheck size={24} />
            <div>
              <h3>{t.confidentiality}</h3>
              <p>{t.confidentialityBody}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container section">
        <SectionHeading label={t.whyLabel} title={t.whyTitle} />
        <Values locale={locale} />
      </section>
      <section className="tinted-section">
        <div className="container section">
          <SectionHeading label={t.stackLabel} title={t.stackTitle} />
          <TechStack locale={locale} />
        </div>
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function ServicesPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <>
      <PageIntro
        label={t.servicesLabel}
        title={t.servicesPageTitle}
        description={t.servicesPageIntro}
      />
      <section className="container detailed-services">
        {services[locale].map((service, i) => (
          <article
            key={service.title}
            id={`service-${i + 1}`}
            className="detailed-service"
          >
            <div>
              <span className="service-number">0{i + 1}</span>
              <h2>{service.title}</h2>
              <p>{service.short}</p>
              <Link
                href={`${href(locale, "contact")}?service=${service.inquiryType}`}
                className="text-link"
              >
                {t.discuss}
                <Arrow />
              </Link>
            </div>
            <div className="service-detail-grid">
              <div className="service-outcome">
                <h3>{t.outcome}</h3>
                <p>{service.outcome}</p>
              </div>
              <div>
                <h3>{t.problem}</h3>
                <p>{service.problem}</p>
              </div>
              <div>
                <h3>{t.solution}</h3>
                <p>{service.solution}</p>
              </div>
              <div>
                <h3>{t.deliverables}</h3>
                <ul className="check-list">
                  {service.deliverables.map((d) => (
                    <li key={d}>
                      <Check size={15} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t.suitable}</h3>
                <p>{service.suitable}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="container section">
        <SectionHeading label={t.processLabel} title={t.processTitle} />
        <Process locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function ProjectsPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <>
      <PageIntro
        label={t.projectsLabel}
        title={t.projectsPageTitle}
        description={t.projectsPageIntro}
      />
      <section className="container projects-page">
        <ProjectCards locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function ContactPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <>
      <PageIntro
        label={t.contactLabel}
        title={t.contactTitle}
        description={t.contactIntro}
      />
      <section className="container contact-layout">
        <aside>
          <h2>{t.nextTitle}</h2>
          <ul className="check-list">
            {t.nextItems.map((item) => (
              <li key={item}>
                <Check size={17} />
                {item}
              </li>
            ))}
          </ul>
          <div className="contact-channels">
            <h3>{t.channels}</h3>
            <SocialLinks locale={locale} detailed />
            {!site.email && !site.github && !site.linkedin && (
              <p className="small-text muted">{t.unconfigured}</p>
            )}
          </div>
        </aside>
        <ContactForm
          locale={locale}
          enabled={isContactConfigured()}
          email={site.email}
          whatsappUrl={site.whatsappUrl}
        />
      </section>
      <section className="container contact-close">
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaDescription}</p>
        <a
          href={
            site.email && !isContactConfigured()
              ? `mailto:${site.email}`
              : "#inquiry"
          }
          className="text-link"
        >
          {t.discuss}
          <Arrow />
        </a>
      </section>
    </>
  );
}
