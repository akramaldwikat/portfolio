import { ArrowUpRight } from "lucide-react";
import { flowdesk } from "@/data/flowdesk";
import { site, type Locale } from "@/lib/site";

export function FlowdeskLinks({ locale }: { locale: Locale }) {
  const copy = flowdesk[locale];
  return (
    <>
      {[
        [site.flowdeskDemo, copy.demo],
        [site.flowdeskGithub, copy.github],
      ].map(([url, label]) => (
        <a
          key={url}
          className="button secondary"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <bdi>{label}</bdi>
          <span className="sr-only"> ({copy.newTab})</span>
          <ArrowUpRight size={17} className="directional" aria-hidden="true" />
        </a>
      ))}
    </>
  );
}
