# Verification record — Phase 2

Verified locally on 6 November 2026 against the production Next.js build. See PHASE2-REPORT.md for the complete assessment and PHASE2-AUDIT.md for the pre-change findings.

## Current results

- Format check, lint (zero warnings), typecheck and production build passed.
- All 11 tests passed, including the original five and new configuration, canonical-origin, service mapping, flexible budget and WhatsApp normalization tests.
- Dependency audit: zero vulnerabilities. No dependencies were added or removed.
- HTTP smoke passed for all 12 localized routes, 288 internal links and fragment targets, 40 case-study sections, five true 404s, disabled forms, sitemap, robots, social images, artwork and inquiry safeguards. Supplied public contact destinations are asserted.
- Responsive browser validation passed for 144 route/width/theme combinations: all 12 English/Arabic pages at 375, 430, 768, 1024, 1440 and 1920px, in light and dark modes. Each check compared document scroll width to client width (excluding the scrollbar), checked main-content overflow, verified one H1 and checked document language/direction. There were zero overflow or language/direction failures.
- After a final table readability adjustment, 24 case-study combinations were rechecked; all passed with 12px table text.
- Visually inspected hero wrapping, project presentation, architecture, contact, case-study tables, navigation and footer at representative widths. Keyboard menu/Escape, locale-preserving navigation, persistent theme and native case-study contents worked.
- In an inert local configured-form fixture, English/Arabic service preselection, specific field errors and first-error focus passed. Only invalid inputs were submitted; the fixture log contained GET requests only. No real provider call or message occurred.
- The delivered form is disabled without actual origin/delivery configuration. Supplied email and WhatsApp alternatives work as links immediately; GitHub and LinkedIn are configured.

## Limits

Chromium inspection is not Safari/Firefox or a formal assistive-technology audit. No Lighthouse or field Core Web Vitals score is claimed. Real Resend delivery, sender verification, Redis connectivity and production proxy behavior require deliberate staging verification after credentials are supplied. FlowDesk remains an independent design-stage case study, with no finished application claimed. Nothing was committed, pushed, merged or deployed.

The remainder is retained as the Phase 1 historical record; its earlier counts and unconfigured-profile notes do not describe the current Phase 2 build.

---

# Phase 1 verification archive

Verified locally on 6 November 2026 against the production Next.js build. No real domain or provider credentials were supplied.

## Automated checks

| Check                  | Observed result                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`         | Passed with zero warnings                                                                                                                                                       |
| `npm run typecheck`    | Passed                                                                                                                                                                          |
| `npm test`             | Five test cases passed, including nested endpoint assertions                                                                                                                    |
| `npm run build`        | Passed; all 12 content pages prerendered                                                                                                                                        |
| `npm run format:check` | Passed                                                                                                                                                                          |
| `npm audit`            | Zero reported vulnerabilities                                                                                                                                                   |
| `npm run test:smoke`   | All 12 public localized routes, 180 internal links/fragment targets, five true 404s, sitemap, robots, generated social images, icon, artwork and contact HTTP safeguards passed |

The inquiry tests validate English/Arabic inputs, field limits, enumerated options, honeypot rejection, rate-limit isolation/reset, safe external URLs, same-origin enforcement, content type, body limits, missing configuration, rate-limit rejection, provider errors and success only with a provider acceptance ID. Both providers are mocked; no email is sent by these tests.

## Browser inspection

- Inspected English desktop home in light and dark mode at the default 1280px viewport.
- Inspected Arabic layout, mirrored navigation, directional arrows, system illustration and the mobile form at 390px.
- Measured document width on **every page in both locales** at 320px and 768px: no horizontal overflow; one H1; correct server-rendered language and direction.
- Checked persistent dark mode through reloads, same-language navigation and switching between the Arabic and English contact pages.
- Opened the mobile menu, navigated to contact and checked that the menu closed. Pressing Escape from a menu link closed it and returned focus to the toggle.
- Submitted an empty Arabic form: invalid controls were marked and the name field received focus. Submitted valid test input locally: the form reported delivery was not configured and retained the inquiry. No false success state was shown.
- Inspected the localized Arabic 404 and verified actual HTTP 404 and `noindex` through smoke tests.
- Inspected text foreground/background contrast on the home page in both themes. Adjusted project-status captions and unavailable social-label opacity after review. CSS color-mix backgrounds and illustrative SVG text are not covered by a formal automated accessibility audit.

## Findings resolved

- Removed a redirect that caused the English internal locale rewrite to loop in the current Next.js proxy pipeline.
- Reapplied the stored theme during navigation so document updates do not lose the selected theme.
- Added a locale-aware 404 fallback and a title inherited from the locale layout.
- Ensured local origin checks work for both localhost and 127.0.0.1 while configured production uses the exact public origin.
- Patched the audited TypeScript ESLint transitive minimatch dependency with a scoped override; retained plugin-compatible ESLint 9.

## Verification limits and launch work

- Real Resend acceptance, inbox delivery, sender verification, Redis integration and hosted reverse-proxy behavior require actual credentials and a deliberate staging/live test.
- The default site deliberately disallows indexing until `NEXT_PUBLIC_SITE_URL` is set. Rebuild after configuration and confirm the actual production domain in canonical links, alternates, sitemap and Person/WebSite JSON-LD.
- Browser checks used Chromium through the available in-app browser. Safari, Firefox and assistive-technology testing have not been performed.
- No Lighthouse score or field Core Web Vitals result is claimed. Measure on the final host and monitor real traffic.
- FlowDesk remains a project presentation, with proposed architecture and illustrative UI. No working business platform, actual product screenshots, demo or repository are claimed. The other projects remain upcoming.
- Nothing was committed, pushed or deployed.

See `README.md` for configuration, exact local commands and deployment instructions.
