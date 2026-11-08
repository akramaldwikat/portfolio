import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";
import { flowdesk, type CaseSection } from "@/data/flowdesk";
import { site, type Locale } from "@/lib/site";
import { CTA, PageIntro, TechStack } from "./ui";
import { SystemDiagram } from "./architecture-diagram";

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
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th scope="row" key={i}>
                    {technical ? <bdi dir="ltr">{cell}</bdi> : cell}
                  </th>
                ) : (
                  <td key={i}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
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
        <div
          className={
            section.id === "workflow" ? "workflow-steps" : "decision-list"
          }
        >
          {section.items.map((item, i) => (
            <article key={item.title}>
              {section.id === "workflow" && (
                <span className="workflow-number" aria-hidden="true">
                  0{i + 1}
                </span>
              )}
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      )}
      {section.id === "roles" && (
        <DataTable
          caption={t.permissionCaption}
          columns={t.permissionColumns}
          rows={t.permissionRows}
        />
      )}
      {section.id === "architecture" && (
        <div className="case-diagram">
          <SystemDiagram locale={locale} planned />
        </div>
      )}
      {section.id === "database" && (
        <DataTable
          caption={t.databaseCaption}
          columns={t.databaseColumns}
          rows={t.databaseRows}
          technical
        />
      )}
      {section.id === "stack" && <TechStack locale={locale} />}
      {section.id === "responsive-ux" && (
        <div className="concept-block">
          <p>{t.conceptNote}</p>
          <figure className="case-screenshot">
            <Image
              src="/flowdesk-concept.svg"
              alt={t.conceptCaption}
              width={1000}
              height={620}
              sizes="(max-width: 760px) 92vw, 65vw"
            />
            <figcaption>{t.conceptCaption}</figcaption>
          </figure>
        </div>
      )}
      {(section.id === "github" || section.id === "live-demo") &&
        (() => {
          const url =
            section.id === "github" ? site.flowdeskGithub : site.flowdeskDemo;
          return url ? (
            <a
              className="button secondary case-source"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {section.title}
              <ArrowUpRight
                size={17}
                className="directional"
                aria-hidden="true"
              />
            </a>
          ) : (
            <div className="source-unavailable">
              {section.id === "github"
                ? t.unavailableGithub
                : t.unavailableDemo}
            </div>
          );
        })()}
    </>
  );
}
export function FlowdeskPage({ locale }: { locale: Locale }) {
  const t = content[locale],
    study = flowdesk[locale];
  return (
    <>
      <PageIntro
        label={t.caseLabel}
        title={t.caseTitle}
        description={t.caseIntro}
      />
      <div className="container case-meta">
        <span className="status-pill">
          <span className="status-dot" />
          {t.independent}
        </span>
        <strong>{t.caseStatus}</strong>
        <p>{study.reviewNote}</p>
      </div>
      <div className="container case-layout">
        <aside className="case-toc">
          <div className="case-toc-desktop">
            <p className="toc-heading">{study.contents}</p>
            <nav aria-label={study.contents}>
              {study.sections.map((section, i) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
          <details className="case-toc-mobile">
            <summary>{study.contents}</summary>
            <nav aria-label={study.contents}>
              {study.sections.map((section, i) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              ))}
            </nav>
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
      <CTA locale={locale} />
    </>
  );
}
