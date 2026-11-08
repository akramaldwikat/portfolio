"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { interfaceCopy } from "@/data/interface";
import { href, type Locale } from "@/lib/site";

export function Header({ locale }: { locale: Locale }) {
  const t = interfaceCopy[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      const stored = localStorage.getItem("theme");
      document.documentElement.dataset.theme =
        stored === "dark" || (!stored && media.matches) ? "dark" : "light";
    } catch {
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
    }
    const update = () =>
      setDark(document.documentElement.dataset.theme === "dark");
    update();
    const change = () => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
      update();
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, [pathname]);
  const paths = ["", "about", "services", "projects", "contact"];
  const publicPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const other = locale === "en" ? "ar" : "en";
  const switchPath = href(other, publicPath.replace(/^\//, ""));
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={href(locale)} className="brand" aria-label={t.homeLabel}>
          <span className="brand-mark" aria-hidden="true">
            a<span>.</span>
          </span>
          <span>
            Akram Aldwikat
            <span className="brand-sub">{t.brandRole}</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={t.navLabel}>
          {paths.map((p, i) => (
            <Link
              key={p}
              href={href(locale, p)}
              aria-current={
                publicPath === `/${p}` ||
                (p === "projects" && publicPath.startsWith("/projects/"))
                  ? "page"
                  : undefined
              }
            >
              {t.nav[i]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href={switchPath}
            className="locale-switch"
            lang={other}
            hrefLang={other}
          >
            {locale === "en" ? "العربية" : "English"}
          </Link>
          <span className="header-divider" />
          <button
            className="icon-button"
            type="button"
            onClick={toggle}
            aria-label={t.theme}
            aria-pressed={dark}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link
            className="button small header-contact"
            href={href(locale, "contact")}
          >
            {t.discuss}
            <ArrowUpRight size={15} className="directional" />
          </Link>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label={t.mobileNavLabel}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          {paths.map((p, i) => (
            <Link
              key={p}
              href={href(locale, p)}
              onClick={() => setOpen(false)}
              aria-current={publicPath === `/${p}` ? "page" : undefined}
            >
              {t.nav[i]}
              <ArrowUpRight size={16} className="directional" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
