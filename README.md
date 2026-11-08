# Akram Aldwikat — portfolio

A bilingual personal portfolio focused on full-stack engineering and business systems. Built with Next.js 16.4.5 App Router, React 19.3.1, strict TypeScript and Tailwind CSS 4. No private employer material or invented professional results are included.

## Run locally

Use Node.js 22 or newer. In PowerShell:

```powershell
cd portfolio
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Arabic is at `/ar`. Stop the server with Ctrl+C before starting another server on port 3000.

To run the production build:

```powershell
npm run build
npm run start
```

## Architecture

| Location                                | Responsibility                                                                        |
| --------------------------------------- | ------------------------------------------------------------------------------------- |
| `src/app/[locale]/layout.tsx`           | Document language/direction, local fonts, shared shell and JSON-LD                    |
| `src/app/[locale]/[[...slug]]/page.tsx` | Typed route resolution and static generation of 12 pages                              |
| `src/proxy.ts`                          | Internal English locale rewrite; public English paths have no prefix                  |
| `src/data/content.ts`                   | Paired English and Arabic copy, process and technology groups                         |
| `src/data/services.ts`                  | Structured service problems, approach, deliverables and project fit                   |
| `src/data/projects.ts`                  | Project status, descriptions and technologies                                         |
| `src/components/pages.tsx`              | Page compositions                                                                     |
| `src/components/ui.tsx`                 | Shared headings, service rows, cards, diagram, values, stack, process, CTA and footer |
| `src/components/controls.tsx`           | Active navigation, mobile menu, locale switch and persistent theme                    |
| `src/components/contact-form.tsx`       | Localized accessible form, errors and submission status                               |
| `src/lib/site.ts`                       | Public contact/link configuration and URL helpers                                     |
| `src/lib/metadata.ts`                   | Localized titles, descriptions, canonical/alternate URLs and social metadata          |
| `src/lib/contact.ts`                    | Server-only shared Redis rate limiting; schema re-export for compatibility            |
| `src/app/api/contact/route.ts`          | Same-origin contact endpoint and server-only Resend delivery                          |
| `public/flowdesk/`                      | Reviewed screenshots copied from the public FlowDesk repository                       |

Most content is rendered on the server and prerendered at build time. Interactive navigation and the form are client components. Local variable fonts avoid third-party font requests. The architecture illustration is CSS and SVG iconography; project artwork uses `next/image`. There are no stock photos, remote image dependencies, motion libraries or unnecessary application state stores.

English pages are internally served from `/en`; those internal aliases retain canonical links to the public URLs. A direct `/en` redirect is intentionally avoided because the rewrite is reprocessed by the current Next.js proxy pipeline. Use only the documented public paths in navigation and marketing.

## Pages

| English              | Arabic                  |
| -------------------- | ----------------------- |
| `/`                  | `/ar`                   |
| `/about`             | `/ar/about`             |
| `/services`          | `/ar/services`          |
| `/projects`          | `/ar/projects`          |
| `/projects/flowdesk` | `/ar/projects/flowdesk` |
| `/contact`           | `/ar/contact`           |

Unknown pages return HTTP 404, include `noindex`, and offer a way home. Locale-specific unknown pages use a localized fallback. The global fallback also offers English and Arabic home links.

## Design and accessibility

Warm ivory, forest green, fine borders and generous spacing. Dark mode respects the system preference until the visitor makes a choice, then persists it locally. Arabic uses a self-hosted Noto Sans Arabic font and a server-rendered RTL document. Logical spacing, mirrored directional arrows, right-to-left navigation and isolated LTR technical labels support both reading directions.

Semantic header, navigation, main, section, article and footer elements; one H1 per page; skip link; visible focus outlines; labeled native form fields; required indicators; field-level errors with `aria-describedby` and `aria-invalid`; first-error focus; live submission status; accessible mobile menu state and Escape handling. Reduced-motion preferences disable transitions and smooth scrolling. Browser inspection checks responsiveness and keyboard behavior, but is not a formal WCAG certification.

## Honest project presentation

FlowDesk is a **Completed Independent Demo Project**. The bilingual case study documents the deployed Next.js, NestJS and Neon PostgreSQL architecture, tenant isolation, permissions, and verification. The featured card and case study link to the [live demo](https://flowdesk-web-8atx.onrender.com/) and [public source](https://github.com/akramaldwikat/flowDesk). The eight screenshots are actual application captures with fictional seed data. Their originals and capture details are in the [FlowDesk screenshot inventory](https://github.com/akramaldwikat/flowDesk/tree/main/docs/screenshots).

CommerceKit and ClientPilot are labeled **Coming soon**. They have abstract artwork rather than fabricated product screenshots. Their technology tags describe planned technologies. The portfolio repository does not implement these applications.

## Configure before launch

```powershell
Copy-Item .env.example .env.local
```

Edit `.env.local` locally or set the equivalent environment variables on the hosting provider. Never commit secrets.

| Variable                    | Purpose                                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Real owned HTTPS origin, no trailing slash or path. Required for production canonical URLs, sitemap, schema and contact origin checks. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Actual public business email; optional                                                                                                 |
| `NEXT_PUBLIC_LINKEDIN_URL`  | Actual HTTPS LinkedIn profile; optional                                                                                                |
| `NEXT_PUBLIC_GITHUB_URL`    | Actual HTTPS GitHub profile; optional                                                                                                  |
| `RESEND_API_KEY`            | Server-only Resend key                                                                                                                 |
| `CONTACT_FROM`              | Sender address on a verified Resend domain                                                                                             |
| `CONTACT_TO`                | Destination inbox for inquiries                                                                                                        |
| `UPSTASH_REDIS_REST_URL`    | HTTPS Upstash Redis REST endpoint                                                                                                      |
| `UPSTASH_REDIS_REST_TOKEN`  | Server-only Redis REST token                                                                                                           |

`NEXT_PUBLIC_*` values are embedded during the build. **Rebuild after changing them.** Akram’s supplied public GitHub, LinkedIn, email and WhatsApp details are centralized in `src/data/profile.ts`. LinkedIn tracking parameters have been removed, and WhatsApp uses `https://wa.me/962779103342`. Public environment values override these defaults. Missing or invalid link values are omitted, never rendered as dead buttons. With no site origin configured, pages are marked `noindex`, robots disallows crawling, schema is omitted and the local canonical fallback is `http://localhost:3000`.

The form clearly announces that online inquiries are unavailable and disables both fields and submission unless the real site origin, sender, recipient, Resend key and both Redis values are configured. The API independently fails closed with HTTP 503 when configuration is missing. The server-rendered availability flag is prerendered with the page: rebuild/redeploy after changing any delivery environment values, including server-only credentials. No inquiry is persisted in the portfolio, written to logs or silently discarded as successful. Draft fields are retained on failed delivery.

The endpoint validates the origin, content type, streaming body size, field lengths, enumerated choices and an invisible honeypot. An atomic Redis counter allows five valid attempts per IP in ten minutes across instances. Hashed IP counter keys expire after ten minutes. The local rate-limit helper remains for compatibility and unit tests; actual form delivery requires shared Redis in every environment. Redis is retained because its atomic cross-instance quota protects the paid email endpoint in serverless deployments. It is not a portfolio database and adds no runtime SDK dependency. The endpoint uses plain-text email and reports success only after provider acceptance, which does not guarantee inbox delivery.

Host behind a trusted proxy that **overwrites** forwarded IP headers. The handler prefers `x-vercel-forwarded-for`, then `x-forwarded-for`. Never expose a self-hosted origin directly to untrusted clients when relying on these headers. Consider provider-level bot protection if the public form sees abuse. Configure your providers' data handling and retention appropriately before accepting real inquiries.

## SEO

Unique page titles and descriptions in both languages, canonical URLs, reciprocal English/Arabic and x-default alternates, Open Graph, Twitter summary cards, generated 1200×630 social images, favicon, bilingual sitemap, robots.txt, and Person/WebSite JSON-LD when a real origin is configured. No fabricated reviews, ratings, organizations or achievements are used. The social artwork is in English as the shared professional identity; Arabic page metadata is localized.

## Verification

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

For HTTP smoke checks, set a reserved test origin before building and starting the local server. Leave the contact delivery settings empty.

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://portfolio.example'
npm run build
npm run start
```

In another terminal, use the same test origin:

```powershell
$env:TEST_SITE_ORIGIN = 'https://portfolio.example'
npm run test:smoke
```

The smoke test rejects remote targets and refuses to submit to an enabled form. It checks all 12 pages, language/direction, unique H1, metadata, internal routes and fragment targets, real 404 statuses, sitemap, robots, social images and contact HTTP boundaries. Its valid inquiry deliberately expects an unconfigured 503 response; use it against a local unconfigured instance, **not** a configured live site. API delivery tests mock both Redis and Resend and never send email. There are no tests that submit to a real provider.

The scoped `minimatch` override patches an audited development dependency used by TypeScript ESLint. ESLint 9 is retained because the plugins bundled with the current Next.js config declare ESLint 9 compatibility. Reassess the override and lint major version when updating Next.js tooling.

See `QA.md` for observed verification and limits. Phase 2 findings are recorded in `PHASE2-AUDIT.md`; the final assessment and remaining blockers are in `PHASE2-REPORT.md`.

## Deployment

### Vercel

1. Review and publish the portfolio repository when approved.
2. Import it into Vercel with the Next.js preset. If the repository contains a parent folder, set the project root to `portfolio`.
3. Use Node.js 22 or newer, install with `npm ci`, and build with `npm run build`.
4. Configure the actual production environment values above. Keep sender and Redis credentials server-only. Use a verified sender domain.
5. Attach the domain that exactly matches `NEXT_PUBLIC_SITE_URL`, and deploy/rebuild.
6. Check both locales and the theme, then submit one intentional real inquiry and verify its arrival. Test provider rejection and rate limiting on a staging environment.
7. Confirm that production metadata has the correct domain and permits indexing, inspect `/sitemap.xml` and `/robots.txt`, and submit the sitemap to your search console.

### Any Node.js host

Run `npm ci`, configure the environment, run `npm run build`, and run `npm run start` under your process manager behind an HTTPS reverse proxy. The start script binds to loopback by default. In a container or managed environment that requires a public bind, use `npx next start --hostname 0.0.0.0 --port 3000` and keep network access controlled by the host/proxy. Preserve the `.next`, `public`, `node_modules` and package/config files. A pure static host is insufficient because inquiry delivery uses a server endpoint.

Optional `NEXT_PUBLIC_WHATSAPP_NUMBER` overrides the supplied phone number. Use an international E.164 number such as `+962779103342`; an international `00` prefix is normalized.

## Phase 2 organization

The existing routing and server-rendered architecture are preserved. `src/data/flowdesk.ts` holds the bilingual deployed case study; `src/data/architecture.ts` holds diagram copy; `src/data/interface.ts` and `src/data/contact-copy.ts` keep interactive copy out of the full server content object. `src/lib/contact-schema.ts` contains only browser-safe validation, and `src/lib/contact-config.ts` supplies the shared server availability gate. Dedicated project-card, diagram and case-study components keep page compositions readable. The native HTML case-study contents control works without extra client state.

The six services have explicit business outcomes and inquiry category IDs. There are seven inquiry types, with separate integration and application-improvement options. Budget ranges start with “Not sure yet” and “Under $1,000”; no hourly rates are implied.

The unavailable form provides working email and WhatsApp alternatives immediately, using Akram’s supplied details. No actual inquiry was sent during QA.

No dependencies were added or removed in Phase 2. Next.js generates `AGENTS.md` on the first development-server run; it directs future agents to the bundled version-specific documentation.

## Remaining launch work

- Supply your actual website domain. Public business email, GitHub, LinkedIn and WhatsApp are already configured from the supplied details.
- Configure and verify real Resend and Redis credentials; no real email delivery has been exercised.
- Run Lighthouse/Core Web Vitals measurements on the deployed site and monitor real traffic; no performance score is claimed.
