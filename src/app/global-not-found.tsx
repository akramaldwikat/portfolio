import Link from "next/link";
import "./globals.css";
export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>Page not found | Akram Aldwikat</title>
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <main className="not-found container">
          <span className="eyebrow">404 / OFF THE MAP</span>
          <h1>
            This page isn’t
            <br />
            in the plan.
          </h1>
          <p>The address may have changed, or the page may not exist.</p>
          <div className="hero-buttons">
            <Link className="button" href="/">
              Back to home ↗
            </Link>
            <Link className="button secondary" href="/ar" lang="ar" dir="rtl">
              العودة للرئيسية ↖
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
