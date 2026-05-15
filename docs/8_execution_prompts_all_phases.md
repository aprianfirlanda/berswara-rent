# Berswara Rent — Execution Prompts (All Phases)

Use these prompts with your coding agent.  
If one prompt is too large, run the split prompts in order.

## Prompt A (Single Prompt: All Phases)

```text
You are a senior Next.js engineer working in this repository: berswara-rent.

Goal:
Implement all items from docs/6_feature_checklist.md across Phase 1, Phase 2, and Phase 3, in order, with production-quality code.

Source of truth:
- docs/1_product_brief.md
- docs/2_sitemap.md
- docs/3_user_flow.md
- docs/4_wireframe.md
- docs/5_content_assets.md
- docs/6_feature_checklist.md
- docs/7_seo_notes.md

Execution rules:
1) Read all docs first and summarize assumptions.
2) Implement Phase 1 fully, then Phase 2, then Phase 3.
3) Keep existing coding style and folder structure unless refactor is necessary.
4) Use App Router best practices for Next.js.
5) Ensure responsive UI and clean UX on mobile + desktop.
6) Add/adjust metadata for SEO per page and per product.
7) Use reusable components where it reduces duplication.
8) For each phase:
   - implement features
   - run lint/build/tests (or add tests if missing)
   - fix errors
   - update docs/6_feature_checklist.md by checking completed boxes
   - write a short progress note in docs/progress_phase_X.md
9) For dynamic features in Phase 3:
   - add clear architecture (data model, API routes/server actions, auth approach)
   - if external services are required (payment, e-sign), scaffold integration with env-based config and fallback mocks
10) At the end:
   - provide a final summary
   - list changed files
   - list remaining risks / TODOs
   - include exact commands to run locally

Feature checklist to implement:
Phase 1:
- Responsive Navigation (Mobile friendly).
- Home Page with Hero and Featured Items.
- Product Catalog with Category Filtering.
- Static Product Detail Pages (SSG using Next.js).
- Product gallery with multiple photos (static) and embedded videos.
- "Rent via WhatsApp" integration (dynamic links).
- Basic Hygiene/About Us section.
- SEO optimized (meta tags per product).

Phase 2:
- Search functionality (client-side).
- Availability Calendar (read-only, manual update).
- Advanced Media Lightbox/Zoom for products.
- Blog/Articles for parenting tips & gear reviews.

Phase 3:
- User Accounts (wishlist, rent history).
- Real-time inventory/booking system.
- Online payment integration (Midtrans/Stripe).
- Automated rental agreements (e-sign).
- Review/rating system for products.

Start now. Do not stop after planning—execute all phases.
```

## Prompt B1 (Split: Phase 1 Only)

```text
You are a senior Next.js engineer working in this repository: berswara-rent.

Task:
Implement Phase 1 from docs/6_feature_checklist.md completely.

Required context files:
- docs/1_product_brief.md
- docs/2_sitemap.md
- docs/3_user_flow.md
- docs/4_wireframe.md
- docs/5_content_assets.md
- docs/6_feature_checklist.md
- docs/7_seo_notes.md

Phase 1 scope:
- Responsive Navigation (Mobile friendly).
- Home Page with Hero and Featured Items.
- Product Catalog with Category Filtering.
- Static Product Detail Pages (SSG using Next.js).
- Product gallery with multiple photos and embedded videos.
- "Rent via WhatsApp" integration (dynamic links).
- Basic Hygiene/About Us section.
- SEO optimized (meta tags per product).

Rules:
1) Implement directly; do not stop at planning.
2) Keep code clean, reusable, and aligned with existing patterns.
3) Ensure responsive behavior for mobile and desktop.
4) Run lint/build/tests (or create minimal tests when needed), fix issues.
5) Update docs/6_feature_checklist.md by checking completed Phase 1 items.
6) Create docs/progress_phase_1.md with:
   - what was built
   - file changes
   - validation commands
   - known gaps (if any)

Output format at end:
- Summary
- Changed files
- Commands run
- Remaining TODOs
```

## Prompt B2 (Split: Phase 2 Only)

```text
You are a senior Next.js engineer working in this repository: berswara-rent.

Prerequisite:
Assume Phase 1 is complete in current branch. If not, complete missing Phase 1 dependencies first.

Task:
Implement Phase 2 from docs/6_feature_checklist.md completely.

Phase 2 scope:
- Search functionality (client-side).
- Availability Calendar (read-only, manual update).
- Advanced Media Lightbox/Zoom for products.
- Blog/Articles for parenting tips & gear reviews.

Rules:
1) Reuse existing product/content structures from Phase 1.
2) Keep performance in mind (avoid heavy client bundle where possible).
3) Maintain SEO quality for blog/article pages.
4) Run lint/build/tests and fix issues.
5) Update docs/6_feature_checklist.md by checking completed Phase 2 items.
6) Create docs/progress_phase_2.md with:
   - what was built
   - file changes
   - validation commands
   - known gaps (if any)

Output format at end:
- Summary
- Changed files
- Commands run
- Remaining TODOs
```

## Prompt B3 (Split: Phase 3 Only)

```text
You are a senior Next.js engineer working in this repository: berswara-rent.

Prerequisite:
Assume Phase 1 and Phase 2 are complete in current branch.

Task:
Implement Phase 3 from docs/6_feature_checklist.md completely with a practical production-ready baseline.

Phase 3 scope:
- User Accounts (wishlist, rent history).
- Real-time Inventory/Booking system.
- Online Payment Integration (Midtrans/Stripe).
- Automated Rental Agreements (e-sign).
- Review/Rating system for products.

Implementation requirements:
1) Define and implement a clear data model (DB schema + migrations).
2) Implement auth and authorization for user-specific actions.
3) Build API/server actions for booking, wishlist, reviews, rent history.
4) Add real-time inventory updates (websocket/polling/event-based, choose practical approach).
5) Integrate payment via env-driven provider config and secure webhook handling.
6) Add e-sign flow scaffold with provider abstraction and mock fallback.
7) Add validation, error states, loading states, and basic audit logging.
8) Add automated tests for critical flows (booking, payment callback, review permissions).
9) Run lint/build/tests and fix issues.
10) Update docs/6_feature_checklist.md by checking completed Phase 3 items.
11) Create docs/progress_phase_3.md with:
    - architecture decisions
    - what was built
    - file changes
    - env variables needed
    - validation commands
    - known gaps (if any)

Output format at end:
- Summary
- Architecture notes
- Changed files
- Required env vars
- Commands run
- Remaining TODOs
```
