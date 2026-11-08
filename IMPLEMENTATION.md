# Implementation plan

1. Establish typed bilingual content, routes, site configuration, and design tokens.
2. Build shared navigation, footer, project cards, service rows, process, architecture artwork, and conversion sections.
3. Implement Home, About, Services, Projects, FlowDesk case study, and Contact in English and Arabic.
4. Add theme persistence, locale-preserving navigation, mobile navigation, contact validation, and server-side email delivery.
5. Add localized metadata, canonical/alternate links, social images, sitemap, robots and structured data.
6. Run lint, typecheck, contact/security tests, production build, route/link checks, and browser QA.

## Architecture

Next.js App Router + React + strict TypeScript. Public English URLs rewrite internally to `/en`; Arabic lives at `/ar`. Locale root layouts set document language and direction on the server. Pages render on the server; only navigation controls and the contact form use client components. Content belongs in `src/data`, configuration and validation in `src/lib`, reusable UI in `src/components`. No CMS or database is needed for this portfolio. Contact requests go to a server-only Resend integration with optional shared Redis rate limiting.

## Design system

Warm ivory canvas, near-black typography, forest-green accents, fine neutral borders, generous spacing. Manrope and Noto Sans Arabic are self-hosted variable fonts. A restrained grid and technical diagrams connect the visual language to systems engineering. Dark mode uses ink surfaces and brighter mint accents. Logical CSS properties support RTL; directional arrows mirror, technical identifiers remain LTR. Native semantic elements are preferred over unnecessary UI dependencies.

## Content policy

No invented employers, statistics, customers, testimonials, profile links or achievements. FlowDesk is an independent project presentation and proposed architecture, not a shipped client system. Its artwork is explicitly a UI concept, not an application screenshot. CommerceKit and ClientPilot are upcoming concepts. Profile and project URLs are environment configuration. Missing delivery configuration must never report that a message was sent.
