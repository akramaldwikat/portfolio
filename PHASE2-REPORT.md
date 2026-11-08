# Phase 2 — conversion, credibility & visual quality

Completed locally on 6 November 2026. The existing Next.js application and routing were preserved. This report closes Phase 2; no Phase 3 implementation or deployment was started.

## 1. Overall quality before changes

The original portfolio had a solid technical foundation: bilingual server-rendered routes, a coherent palette, semantic structure, basic SEO and working validation. Its commercial story was weaker. It described capabilities more clearly than the client problems, intended outcomes and engineering judgment behind them. The original tests passing did not establish readability or conversion quality.

## 2. Biggest weaknesses discovered

- Supporting text, badges and links sometimes rendered at 7–11px on mobile.
- Hero proof was a general tagline rather than a meaningful connection to professional systems experience.
- Header, hero and closing sections used different primary CTA phrases.
- Service descriptions omitted explicit business outcomes.
- Project cards lacked a clear problem/solution pair; `ready` meant a case study existed, not that the application was finished.
- FlowDesk lacked requirements, a data model, a permission matrix and concrete security/UX reasoning.
- The form accepted visitor effort before disclosing that delivery was unconfigured.
- Client components imported the full bilingual content module, and browser validation shared a module with server rate limiting.

The pre-change audit and decisions are retained in `PHASE2-AUDIT.md`.

## 3. Content improvements

The hero now leads with **“I build software for real business operations.”** It identifies Akram as a **Full-Stack Software Engineer & Business Systems Developer** and names small and medium-sized businesses as the audience. Professional production-system experience is stated without names, figures or confidential examples.

All six services now explain a client problem, what is built, intended business value, example deliverables and suitable projects. About tells a concise professional story across interfaces, backend logic, databases, APIs and system design, followed by practical How I Work steps. No clients, testimonials, experience durations or performance results were invented.

## 4. Visual/UI improvements

Retained the ivory/forest palette, local variable fonts and restrained visual identity. Increased supporting text sizes and control sizes, rebalanced spacing, improved form labels and hints, and kept navigation reachable at tablet widths. Mobile project cards put the name, lifecycle status and business context before the visual. The large About monogram became an engineering-responsibility panel. Dense mobile case-study tables now use 12px text and wrap within the page.

The featured project graphic is a domain blueprint, rather than a finished-product-looking dashboard. The original UI concept remains only in the case study, explicitly labeled as illustrative and unimplemented.

## 5. Conversion improvements

The primary CTA is consistently **Discuss your project / ناقش مشروعك**. The hero retains a distinct View my work secondary action. Major pages end in a conversion action; the contact page can hand off directly to email when online inquiry delivery is unavailable.

The homepage focuses on the one available study rather than giving equal weight to unfinished concepts. Cards communicate the problem, proposed solution, proposed technologies and status. Budget choices now start with Not sure yet and Under $1,000. Project type preselection uses explicit service mappings rather than array-position assumptions.

After Akram supplied public contact details, these were centralized in `src/data/profile.ts`:

- GitHub: https://github.com/akramaldwikat
- LinkedIn: https://www.linkedin.com/in/akram-aldwikat/ — tracking parameters removed
- Email: akram.aldwikat1@gmail.com
- WhatsApp: +962779103342, linked as https://wa.me/962779103342

The unavailable form shows working email and WhatsApp alternatives immediately. Destinations were inspected without sending messages. Conversion improvement is a design intent, not a measured conversion-rate claim.

## 6. FlowDesk improvements

The independent study now has 20 sections: Overview, The Problem, Target Users, Requirements, Solution, Core Features, Roles & Permissions, System Workflow, Architecture, Database Design Overview, Engineering Decisions, Security Considerations, Performance Considerations, Responsive UX, Technology Stack, Technical Challenges, Design Review & Improvements, Future Roadmap, GitHub and Live Demo.

It includes a planned architecture, four-step workflow, proposed permission matrix, relational entity model, tenant-isolation rules, transaction/notification reasoning, concurrency and retry considerations, and an accessible Kanban alternative. The native mobile contents disclosure adds no new client state.

**Portfolio Case Study — Application Development In Progress** is prominent. The page states that the application is unfinished, the design decisions still require implementation and validation, and no client commissioned the work. No production benchmarks, completed lessons, actual screenshots, live demo or repository are claimed. Unavailable project links remain explanatory text.

## 7. Arabic improvements

Edited Arabic around recognizable business needs: organizing operations, clarifying responsibility, linking systems and automating workflows. Replaced abstract or literal phrasing where it weakened the client message. Used natural budget descriptions and specific field errors. Maintained RTL document direction, mirrored directional icons, localized navigation and content, and isolated technical identifiers, email addresses and the international phone number with `bdi` where appropriate.

## 8. Contact form status

The online form is **disabled in the delivered build** because a real site origin and delivery credentials were not supplied. Visitors see this before the fields, plus usable email and WhatsApp routes. The backend independently returns HTTP 503 if configuration is missing; it never reports fake success.

Existing Resend delivery is retained, including origin checks, streaming request limits, schema validation, honeypot validation, timeouts and success only after a provider acceptance ID. Redis REST is retained for its justified atomic quota across server instances: five valid attempts per IP in ten minutes. It is not used as a portfolio database, and no SDK or other infrastructure dependency was added.

To enable the form, configure the real HTTPS site origin, `RESEND_API_KEY`, verified `CONTACT_FROM`, `CONTACT_TO`, `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, then rebuild/redeploy. The availability flag is prerendered. A trusted reverse proxy must overwrite forwarded IP headers. Real sender verification, Redis connectivity and inbox delivery still need a deliberate staging test.

## 9. Dependencies and client components

No dependencies were added or removed; `package.json` and the lockfile retain the existing versions. Interactive boundaries remain limited to the same three files: header controls, contact form and localized 404. Static project and case-study content stays on the server. Dedicated interface/form copy modules keep the expanded case study out of client imports. Browser-safe schema code is separate from server rate-limit helpers.

`AGENTS.md` was generated by the existing Next.js development server and retained. It points future agents to the installed version’s local documentation.

## 10. Checks and exact results

| Check                      | Result                                                                                                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Format check               | Passed                                                                                                                                                                              |
| ESLint                     | Passed, zero warnings                                                                                                                                                               |
| TypeScript                 | Passed                                                                                                                                                                              |
| Unit/endpoint tests        | 11 passed, 0 failed; original five tests preserved                                                                                                                                  |
| Production build           | Passed; all 12 bilingual content pages prerendered                                                                                                                                  |
| Dependency audit           | 0 vulnerabilities                                                                                                                                                                   |
| Local HTTP smoke           | 12 pages, 288 internal links/anchors, 40 case-study sections, disabled unconfigured forms, five genuine 404s, sitemap, robots, social images, artwork and contact safeguards passed |
| Public contact links       | Supplied email, GitHub, clean LinkedIn and normalized WhatsApp destinations verified in both contact pages                                                                          |
| Responsive matrix          | 144 combinations passed: 12 routes × six widths × two themes; no document or main-content horizontal overflow; one H1; correct language/direction                                   |
| Table refinement recheck   | 24 additional case-study checks passed after raising mobile table text to 12px                                                                                                      |
| Keyboard/navigation        | Mobile menu Escape returned focus to toggle; locale switch retained case-study route and theme; native contents and anchor navigation worked                                        |
| Configured-form UI fixture | English and Arabic validation, explicit service preselection, field-specific messages and first-error focus passed                                                                  |

Responsive widths: **375, 430, 768, 1024, 1440 and 1920px**. Browser checks used the production build. Representative screens were visually inspected; the form validation fixture used inert, process-local test values and submitted only invalid inputs. The fixture log showed GET page requests only. Provider delivery tests mock both Resend and Redis. No real email or WhatsApp message was sent.

One viewport-change check ran before the browser applied the new size. That timing sample was discarded and rerun at the verified target width; it was not counted as a passed layout. A new configuration-test type mismatch was corrected before the final successful typecheck/build.

No Lighthouse score, real-user Core Web Vitals, Safari/Firefox result or formal accessibility certification is claimed.

## 11. Git status

`git status --short` reports **“not a git repository”** for this folder and its parents. No repository was initialized. Nothing was committed, pushed, merged or deployed.

## 12. Remaining launch blockers

- Provide the actual website domain and rebuild localized canonical URLs, sitemap, indexing settings and structured data against it.
- Configure and verify delivery credentials if the online inquiry form is to be enabled. Direct email and WhatsApp are already usable.
- Run a real, intentional staging delivery check with the verified sender and shared quota.
- Check the final host, cross-browser behavior and measured performance before making performance claims.
- Keep FlowDesk labeled as unfinished until there is an implementation that supports actual source, screenshots and demo claims.

## 13. Recommended Phase 3

Build FlowDesk’s small operational core: authentication, membership, organization isolation, roles, clients, projects and tasks. Verify denied access and full workflows before adding analytics or automation. Then publish reviewed independent source and an isolated demo with safe sample data. Connect the portfolio domain and delivery services, and measure the deployed portfolio.

This is a recommendation only. **Phase 3 was not started.**
