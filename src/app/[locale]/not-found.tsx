"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { interfaceCopy } from "@/data/interface";
import { href } from "@/lib/site";
export default function NotFound() {
  const locale = usePathname().startsWith("/ar") ? "ar" : "en";
  const t = interfaceCopy[locale];
  return (
    <section className="not-found container">
      <p className="eyebrow">404</p>
      <h1>{t.notFound}</h1>
      <p>{t.notFoundBody}</p>
      <div className="hero-buttons">
        <Link className="button" href={href(locale)}>
          {t.back}
        </Link>
      </div>
    </section>
  );
}
