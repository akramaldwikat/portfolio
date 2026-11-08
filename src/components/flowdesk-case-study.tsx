import Image from "next/image";
import {
  ArrowDown,
  Braces,
  Check,
  Database,
  Layers3,
  Monitor,
} from "lucide-react";
import { content } from "@/data/content";
import { projects } from "@/data/projects";
import { flowdesk, type CaseSection } from "@/data/flowdesk";
import {
  flowdeskImagePath,
  flowdeskScreenshots,
} from "@/data/flowdesk-screenshots";
import { type Locale } from "@/lib/site";
import { CTA, PageIntro } from "./ui";
import { FlowdeskLinks } from "./flowdesk-links";

function DataTable({
  caption,
  columns,
  rows,
  technical = false,
}: {
  caption: string;
  columns: string[];
  rows: string[][];
  technical?: boolean;
}) {
  return (
    <div className="table-frame">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((col) => (
              <th scope="col" key={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, value]) => (
            <tr key={name}>
              <th scope="row">
                {technical ? <bdi dir="ltr">{name}</bdi> : name}
              </th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScreenshotGallery({ locale }: { locale: Locale }) {
  return (
    <div className="flowdesk-gallery">
      {flowdeskScreenshots.map(({ file, width, height, ...labels }, i) => {
        const [title, alt] = labels[locale];
        const src = flowdeskImagePath(file);
        return (
          <figure
            key={file}
            className={`case-screenshot ${i === 0 ? "gallery-lead" : ""} ${width < height && width < 500 ? "gallery-mobile" : ""}`}
          >
            <a
              href={src}
              aria-label={
                locale === "ar"
                  ? `عرض اللقطة كاملة · ${title}`
                  : `View full screenshot · ${title}`
              }
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={
                  width < 500
                    ? "(max-width: 480px) 80vw, 280px"
                    : i === 0
                      ? "(max-width: 900px) 92vw, 850px"
                      : "(max-width: 650px) 92vw, (max-width: 900px) 45vw, 420px"
                }
              />
            </a>
            <figcaption>{title}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function SectionBody({
  section,
  locale,
}: {
  section: CaseSection;
  locale: Locale;
}) {
  const t = flowdesk[locale];
  const icons = [Monitor, Layers3, Braces, Database];
  return (
    <>
      <p>{section.description}</p>
      {section.bullets && (
        <ul className="check-list case-checks">
          {section.bullets.map((item) => (
            <li key={item}>
              <Check size={17} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.items && (
        <div className="decision-list">
          {section.items.map(({ title, body }) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      )}
      {section.id === "workflow" && (
        <ol className="flowdesk-workflow">
          {t.workflow.map((step, i) => (
            <li key={step}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      )}
      {section.id === "screenshots" && <ScreenshotGallery locale={locale} />}
      {section.id === "roles" && (
        <DataTable
          caption={t.permissionCaption}
          columns={t.permissionColumns}
          rows={t.permissionRows}
        />
      )}
      {section.id === "architecture" && (
        <ol className="flowdesk-architecture" aria-label={section.title}>
          {t.architecture.map(([name, note], i) => {
            const Icon = icons[i];
            return (
              <li key={name}>
                {i > 0 && (
                  <ArrowDown
                    className="flowdesk-connector"
                    size={18}
                    aria-hidden="true"
                  />
                )}
                <div className="flowdesk-layer">
                  <span className="node-icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>
                      <bdi>{name}</bdi>
                    </strong>
                    <p>{note}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {section.id === "database" && (
        <DataTable
          caption={t.databaseCaption}
          columns={t.databaseColumns}
          rows={t.databaseRows}
          technical
        />
      )}
    </>
  );
}

export function FlowdeskPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const study = flowdesk[locale];
  const toc = (
    <nav aria-label={study.contents}>
      {study.sections.map((section, i) => (
        <a key={section.id} href={`#${section.id}`}>
          <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          {section.title}
        </a>
      ))}
    </nav>
  );
  return (
    <>
      <PageIntro
        label={t.caseLabel}
        title={t.caseTitle}
        description={t.caseIntro}
      />
      <div className="container case-meta flowdesk-meta">
        <span className="status-pill">
          <span className="status-dot" />
          {projects[0][locale].status}
        </span>
        <ul className="tags flowdesk-proof">
          {study.proof.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-links">
          <FlowdeskLinks locale={locale} />
        </div>
        <p className="flowdesk-wake-note">{study.wakeNote}</p>
      </div>
      <div className="container case-layout">
        <aside className="case-toc">
          <div className="case-toc-desktop">
            <p className="toc-heading">{study.contents}</p>
            {toc}
          </div>
          <details className="case-toc-mobile">
            <summary>{study.contents}</summary>
            {toc}
          </details>
        </aside>
        <div className="case-content">
          {study.sections.map((section, i) => (
            <section key={section.id} id={section.id}>
              <p className="eyebrow">
                {String(i + 1).padStart(2, "0")} / FLOWDESK
              </p>
              <h2>{section.title}</h2>
              <SectionBody section={section} locale={locale} />
            </section>
          ))}
        </div>
      </div>
      <CTA
        locale={locale}
        buttonLabel={study.discuss}
        contactQuery={`?service=${projects[0].inquiryType}`}
      />
    </>
  );
}
