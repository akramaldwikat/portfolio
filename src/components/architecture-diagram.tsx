import {
  Braces,
  Database,
  Layers3,
  Monitor,
  Workflow,
  ArrowDown,
} from "lucide-react";
import { architectureCopy } from "@/data/architecture";
import type { Locale } from "@/lib/site";

export function SystemDiagram({
  locale,
  planned = false,
}: {
  locale: Locale;
  planned?: boolean;
}) {
  const t = architectureCopy[locale];
  return (
    <figure
      className="system-art"
      aria-label={planned ? t.flowdeskTitle : t.title}
    >
      <figcaption className="art-top">
        <span className="art-dot" />
        {planned ? t.planned : t.generic}
        <span className="art-number" dir="ltr">
          SYS—01
        </span>
      </figcaption>
      <div className="system-flow">
        <div className="browser-node">
          <Monitor size={17} aria-hidden="true" />
          <span>
            {t.browser}
            <small>{t.browserNote}</small>
          </span>
        </div>
        <ArrowDown className="flow-arrow" size={17} aria-hidden="true" />
        <div className="system-node frontend">
          <span className="node-icon">
            <Layers3 size={21} aria-hidden="true" />
          </span>
          <div>
            <strong>
              <bdi>{t.frontend}</bdi>
            </strong>
            <small>{t.frontendNote}</small>
          </div>
          <span className="node-index" aria-hidden="true">
            01
          </span>
        </div>
        <ArrowDown className="flow-arrow" size={17} aria-hidden="true" />
        <div className="system-node api">
          <span className="node-icon">
            <Braces size={22} aria-hidden="true" />
          </span>
          <div>
            <strong>
              <bdi>{t.api}</bdi>
            </strong>
            <small>{t.apiNote}</small>
          </div>
          <span className="node-index" aria-hidden="true">
            02
          </span>
        </div>
        <div className="branch-lines" aria-hidden="true" />
        <div className="system-bottom">
          {[
            { Icon: Database, label: t.data, note: t.dataNote },
            { Icon: Workflow, label: t.jobs, note: t.jobsNote },
            { Icon: Braces, label: t.integrations, note: t.integrationsNote },
          ].map(({ Icon, label, note }) => {
            return (
              <div key={label} className="small-node">
                <Icon size={20} aria-hidden="true" />
                <strong>
                  <bdi>{label}</bdi>
                </strong>
                <small>{note}</small>
              </div>
            );
          })}
        </div>
      </div>
      <p className="art-bottom">{planned ? t.plannedNote : t.note}</p>
    </figure>
  );
}

export function DomainBlueprint({ locale }: { locale: Locale }) {
  const t = architectureCopy[locale];
  return (
    <div className="domain-blueprint">
      <p className="eyebrow">{t.domainLabel}</p>
      <h3>{t.domainTitle}</h3>
      <ol>
        {[
          [t.client, t.clientNote],
          [t.project, t.projectNote],
          [t.task, t.taskNote],
        ].map(([title, note], i) => (
          <li key={title}>
            <span className="domain-index" aria-hidden="true">
              0{i + 1}
            </span>
            <div>
              <strong>{title}</strong>
              <p>{note}</p>
            </div>
            <span className="domain-port" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <p className="domain-footer">{t.domainFooter}</p>
    </div>
  );
}
