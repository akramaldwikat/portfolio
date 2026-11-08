# Phase 2 — audit before changes

Reviewed on 6 November 2026 before modifying application code. Sources: all page compositions, English/Arabic content, project/service data, configuration, contact endpoint and validation, client components, styles, metadata, routing, README, QA record, CI and tests. Browser review covered all six page types, English desktop/light, Arabic mobile/light, every route in mobile dark mode, plus desktop Arabic/dark project presentation. Baseline had no observed horizontal overflow at the inspected sizes; that did not establish conversion quality.

## Overall assessment

A coherent, restrained visual foundation and functioning bilingual architecture. Semantic pages, honest independent-project labeling, prerendered content and validation are worth preserving. The result reads more like a technical capabilities brochure than a convincing freelance engagement path. No invented metrics or testimonials were found.

## Findings and priorities

| Priority | Finding                                                                                                                                         | Phase 2 response                                                                                                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| High     | Hero lists capabilities but leaves the audience and operational value implicit. Supporting proof is a generic tagline.                          | Name the business audience, clarify full-stack ownership and connect truthful production-system experience to an independent engineering study.                                                      |
| High     | Mobile supporting text, tags, status and links often render at 7–11px.                                                                          | Establish readable text sizes, increase control sizes and rebalance spacing without changing the visual identity.                                                                                    |
| High     | Service descriptions explain technical activities but omit explicit business outcomes.                                                          | Add outcome-led introductions, focused deliverables and explicit project-type mappings.                                                                                                              |
| High     | Project cards lack a clear problem/solution pair. The `ready` flag means only that a case study exists.                                         | Use explicit lifecycle status, proposed stack labels, business problems, proposed solutions and honest CTAs.                                                                                         |
| High     | FlowDesk has only ten broad sections, reuses the generic architecture illustration and lacks requirements, database, security and UX rationale. | Add a structured 20-section engineering study, planned architecture, permission matrix, relational model and a staged roadmap. Do not claim implementation, results, customers or completed lessons. |
| High     | A visitor can fill and submit the form before discovering delivery is unconfigured.                                                             | Expose availability before the fields; disable submission without configuration. Keep actual Resend delivery and its acceptance checks.                                                              |
| Medium   | Header, hero and closing CTA use different phrases. Tablet header can hide Contact without exposing a menu.                                     | Standardize the primary CTA and keep Contact reachable at every width.                                                                                                                               |
| Medium   | About repeats general capabilities and gives a large decorative monogram substantial mobile space.                                              | Add a concise professional narrative and practical How I Work steps; replace the decorative emphasis with engineering responsibilities.                                                              |
| Medium   | English-to-Arabic wording is accurate but sometimes abstract or literal. Technical values embedded in Arabic need direction isolation.          | Edit Arabic for business readers and isolate technical names and budget values.                                                                                                                      |
| Medium   | Header, form and 404 import the entire bilingual content object; form validation shares a module with server rate limiting.                     | Give client UI small, dedicated copy modules and isolate the schema from server helpers. Keep the existing client component count.                                                                   |
| Medium   | Unconfigured social entries appear as muted labels that resemble unavailable links.                                                             | Render real configured links only, and document missing launch values.                                                                                                                               |

## Decisions

- Preserve Next.js App Router, TypeScript, Tailwind, locale routing, server rendering, fonts, palette, SEO foundation and tests.
- Keep the six-service catalog. Do not add unrelated services, frameworks or animation dependencies.
- Retain existing Redis REST rate limiting: it implements an atomic shared quota across serverless instances and protects the paid email endpoint. It is not used as a portfolio database. Split it out of browser-imported validation code.
- Keep FlowDesk truthful: application development remains unfinished. A planned architecture and design review can demonstrate reasoning without implying a working live product.
- No commits, pushes, merges, deployment or automatic Phase 3 work.

## Validation plan

Run format check, lint, typecheck, all existing tests plus tests for new form/configuration logic, production build and internal-link/anchor validation. Inspect all 12 routes at 375, 430, 768, 1024, 1440 and 1920px in light/dark modes, with explicit English/Arabic overflow checks. Review representative screenshots at each width, keyboard navigation, configured-form validation via a local test-only fixture and the real unconfigured state. Mock external delivery in automated tests; do not send real mail.
