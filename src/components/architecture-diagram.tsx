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

export function SystemDiagram({ locale }: { locale: Locale }) {
  const t = architectureCopy[locale];
  return (
    <figure className="system-art" aria-label={t.title}>
      <figcaption className="art-top">
        <span className="art-dot" />
        {t.generic}
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
      <p className="art-bottom">{t.note}</p>
    </figure>
  );
}
