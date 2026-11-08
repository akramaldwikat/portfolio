import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";
import { projects } from "@/data/projects";
import { href, type Locale } from "@/lib/site";
import { DomainBlueprint } from "./architecture-diagram";

export function ProjectCards({
  locale,
  featuredOnly = false,
}: {
  locale: Locale;
  featuredOnly?: boolean;
}) {
  const t = content[locale];
  const visible = featuredOnly ? projects.filter((p) => p.caseStudy) : projects;
  return (
    <div className="project-grid">
      {visible.map((p, i) => {
        const publishedStudy = Boolean(p.caseStudy);
        const copy = p[locale];
        return (
          <article
            className={`project-card ${publishedStudy ? "featured-project" : "upcoming-project"}`}
            key={p.slug}
          >
            {publishedStudy ? (
              <div className="project-blueprint">
                <span className="status-pill">
                  <span className="status-dot" />
                  {t.independent}
                </span>
                <DomainBlueprint locale={locale} />
              </div>
            ) : (
              <div className={`upcoming-art upcoming-${i}`}>
                <span className="coming-badge">{t.coming}</span>
                <span className="project-monogram" dir="ltr" aria-hidden="true">
                  {p.slug === "commercekit" ? "Ck" : "Cp"}
                  <span>↗</span>
                </span>
              </div>
            )}
            <div className="project-info">
              <div className="project-title-line">
                <h3>
                  <bdi>{p.name}</bdi>
                </h3>
                <span className="project-index" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <p className="project-type">{copy.type}</p>
              <p className="project-status">
                <span className="sr-only">{t.statusLabel}: </span>
                <span className="status-dot" />
                {copy.status}
              </p>
              <dl className="project-story">
                <div>
                  <dt>{t.projectProblem}</dt>
                  <dd>{copy.problem}</dd>
                </div>
                <div>
                  <dt>{t.projectSolution}</dt>
                  <dd>{copy.solution}</dd>
                </div>
              </dl>
              <p className="stack-caption">{t.proposedStack}</p>
              <ul className="tags" aria-label={t.proposedStack}>
                {p.technologies.map((tech) => (
                  <li key={tech}>
                    <bdi>{tech}</bdi>
                  </li>
                ))}
              </ul>
              <div className="project-links">
                <Link
                  className={publishedStudy ? "button" : "text-link"}
                  href={
                    publishedStudy
                      ? href(locale, p.caseStudy)
                      : `${href(locale, "contact")}?service=${p.inquiryType}`
                  }
                >
                  {publishedStudy ? t.caseStudy : t.discuss}
                  <ArrowUpRight
                    className="directional"
                    size={17}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
