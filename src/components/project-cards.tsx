import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";
import { projects } from "@/data/projects";
import { flowdesk } from "@/data/flowdesk";
import {
  flowdeskImagePath,
  flowdeskScreenshots,
} from "@/data/flowdesk-screenshots";
import { href, type Locale } from "@/lib/site";
import { FlowdeskLinks } from "./flowdesk-links";

export function ProjectCards({
  locale,
  featuredOnly = false,
}: {
  locale: Locale;
  featuredOnly?: boolean;
}) {
  const t = content[locale];
  const featured = flowdesk[locale];
  const dashboard = flowdeskScreenshots[0];
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
              <div className="project-preview">
                <Image
                  src={flowdeskImagePath(dashboard.file)}
                  alt={dashboard[locale][1]}
                  width={dashboard.width}
                  height={dashboard.height}
                  sizes="(max-width: 850px) 92vw, 48vw"
                />
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
              {publishedStudy ? (
                <p className="project-summary">{copy.solution}</p>
              ) : (
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
              )}
              <p className="stack-caption">
                {publishedStudy ? featured.technologies : t.proposedStack}
              </p>
              <ul
                className="tags"
                aria-label={
                  publishedStudy ? featured.technologies : t.proposedStack
                }
              >
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
                {publishedStudy && <FlowdeskLinks locale={locale} />}
              </div>
              {publishedStudy && (
                <p className="flowdesk-wake-note">{featured.wakeNote}</p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
