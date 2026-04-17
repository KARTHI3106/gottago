# Port GigHood into GottaGO - Updated Plan

Migrate visual polish, interactive features, and production-grade dashboard from `gigHood-main` into `gottago-main`. Fix all dead-end buttons, add react-query for data fetching, lazy-load heavy components, and ensure registration/login workflows function end-to-end.

**Context**: This is a hackathon build. Mock data is acceptable for admin sub-pages, but core workflows (registration, login, claim flow) must work properly. SEO is not a priority.

## User Review Required

> [!IMPORTANT]
> **New dependencies**: `@tanstack/react-query` (~13KB), `@icons-pack/react-simple-icons` (~8KB tree-shaken), `react-hot-toast` (~5KB). Total ~26KB gzipped added.

> [!WARNING]
> Admin sub-pages (Vaults, Transactions, Security, Support) stay on hardcoded mock data. Their buttons will show toast feedback. The main admin overview will pull from real backend APIs via react-query.

---

## Discovered Bugs & Dead Ends

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | 14 dead-end action buttons | `admin/vaults`, `admin/transactions`, `admin/security`, `admin/support` | Wire to toast feedback |
| 2 | Logout button has no handler | `main-sidebar.tsx:57` | Add redirect to `/` with toast |
| 3 | No "Powered by" tech marquee | Landing page | Port TechStackMarquee |
| 4 | No 7-layer pipeline visual | Landing page | Port PipelineVisual |
| 5 | No architecture cards section | Landing page | Port from gigHood |
| 6 | No dual portal section | Landing page | Port Worker + Admin cards |
| 7 | Minimal footer | `page.tsx:215` | Rebuild with navigation columns |
| 8 | Admin dashboard lacks real-time data | `admin/page.tsx` | Add react-query + recharts panels |
| 9 | No error boundaries | Entire frontend | Add lightweight boundary component |
| 10 | Recharts loaded eagerly | `admin/page.tsx` | Lazy load with `next/dynamic` |

---

## Proposed Changes

### Phase 1: Dependencies & Infrastructure

#### [MODIFY] [package.json](file:///c:/Users/itska/Desktop/gottago-main/frontend/package.json)
- Add `@tanstack/react-query` - Suspense-first data fetching, caching, auto-refetch
- Add `@icons-pack/react-simple-icons` - tech stack logos for marquee
- Add `react-hot-toast` - lightweight toast feedback for action buttons

#### [NEW] `lib/query-client.ts`
- Configure `QueryClient` with defaults:
  - `staleTime: 30_000` (30s before refetch)
  - `gcTime: 5 * 60_000` (5min garbage collection)
  - `retry: 2` with exponential backoff
  - `refetchOnWindowFocus: true` for live dashboard data

#### [NEW] `components/providers.tsx`
- `QueryClientProvider` wrapping the app
- `Toaster` from react-hot-toast

#### [NEW] `components/error-boundary.tsx`
- Lightweight React error boundary component
- Shows a styled error card with retry button instead of crashing the page
- Used around dashboard panels and heavy components

---

### Phase 2: Landing Page Overhaul

#### [NEW] `components/landing/TechStackMarquee.tsx`
- Port the scrolling tech logos from gigHood
- "Powered by industry leaders and state-of-the-art open source" label
- Uses `framer-motion` (already installed) for infinite horizontal scroll at 36s duration
- Tech items: Supabase, PostgreSQL, Next.js, TypeScript, React, FastAPI, Python, Docker, Firebase, Vercel
- Rebranded to GottaGO color tokens

#### [NEW] `components/landing/PipelineVisual.tsx`
- Port 7-layer claim defense pipeline from gigHood
- Scroll-driven sticky card stacking via `framer-motion` `useScroll`/`useTransform`
- 7 stages: Claim Intake, Policy Eligibility, Signal Fusion, Fraud + Trust, Decision Router, Sandbox Settlement, Release + Audit Trail
- All text references changed from "gigHood" to "GottaGO"
- Lazy loaded via `next/dynamic` (heavy component with scroll math)

#### [MODIFY] [page.tsx](file:///c:/Users/itska/Desktop/gottago-main/frontend/app/page.tsx)
- **Make the static content a Server Component**: remove `'use client'` from the main page
- Extract animated hero into a small `<HeroSection />` client component
- Add `<TechStackMarquee />` below hero
- Add architecture cards grid (9 cards matching gigHood's tech stack showcase)
- Add `<PipelineVisual />` (lazy loaded)
- Add dual portal section (Worker Portal + Admin Dashboard link cards)
- Rebuild footer with 4-column navigation grid
- All links verified against real routes: `/register`, `/dashboard?worker_id=demo`, `/admin`

#### [MODIFY] [globals.css](file:///c:/Users/itska/Desktop/gottago-main/frontend/app/globals.css)
- Add `project-*` classes for landing page layout
- Add `gh-pipeline-*` classes for pipeline visual (stages, code cards, meter cards)
- Add `project-tech-*` classes for the marquee animation
- All responsive breakpoints (mobile 375px, tablet 768px, desktop 1024px+)
- Consolidate with existing design tokens, no parallel token system

---

### Phase 3: Fix All Dead-End Buttons

#### [MODIFY] [main-sidebar.tsx](file:///c:/Users/itska/Desktop/gottago-main/frontend/components/main-sidebar.tsx)
- Add `onClick` to Logout button: redirect to `/` with success toast
- Import `useRouter` from next/navigation

#### [MODIFY] [admin/vaults/page.tsx](file:///c:/Users/itska/Desktop/gottago-main/frontend/app/admin/vaults/page.tsx)
- Convert to `'use client'`
- "Export vault ledger" -> `toast.success('Vault ledger exported')`
- "Queue rebalance" -> `toast.success('Rebalance queued for next sweep window')`

#### [MODIFY] [admin/transactions/page.tsx](file:///c:/Users/itska/Desktop/gottago-main/frontend/app/admin/transactions/page.tsx)
- Convert to `'use client'`
- "Download audit CSV" -> `toast.success('Audit CSV download started')`
- "Force settlement batch" -> `toast('Settlement batch triggered', { icon: '...' })`

#### [MODIFY] [admin/security/page.tsx](file:///c:/Users/itska/Desktop/gottago-main/frontend/app/admin/security/page.tsx)
- Convert to `'use client'`
- "View audit log" -> `toast.success('Opening audit log...')`
- "Rotate credentials" -> `toast.success('Credential rotation initiated')`

#### [MODIFY] [admin/support/page.tsx](file:///c:/Users/itska/Desktop/gottago-main/frontend/app/admin/support/page.tsx)
- Convert to `'use client'`
- "Open macros" -> `toast.success('Macros panel loaded')`
- "Create priority case" -> `toast.success('Priority case SUP-202 created')`

---

### Phase 4: Admin Dashboard Enhancement

#### [NEW] `features/admin/api/adminApi.ts`
Feature-isolated API layer following frontend-dev-guidelines:
- `fetchReserves()` -> `GET /api/v1/admin/reserves`
- `fetchClaimsForecast()` -> `GET /api/v1/admin/claims-forecast`
- `fetchFraudHeatmap()` -> `GET /api/v1/admin/fraud-heatmap`
- `fireTrigger(body)` -> `POST /api/v1/triggers/fire`
- All responses typed with explicit interfaces

#### [NEW] `features/admin/types/index.ts`
- `ReserveStatus` interface (active_policies, premium_pool, reserve_ratio, signal, recommendation)
- `ClaimsForecast` interface (period_days, total_claims, forecast array)
- `FraudHeatmapEntry` interface (zone_name, city, combined_risk)
- `TriggerFireRequest` / `TriggerFireResponse` interfaces

#### [NEW] `features/admin/components/FinancialKPIs.tsx`
- 4-card KPI strip: Active Policies, Premium Pool, Reserve Ratio, Pending Payouts
- Data from `fetchReserves()` via `useSuspenseQuery`
- Traffic-light signal indicator (green/amber/red) from API response
- Wrapped in Suspense boundary with skeleton fallback

#### [NEW] `features/admin/components/PayoutChart.tsx`
- Bar chart showing claims forecast data using `recharts`
- Lazy loaded via `next/dynamic` to avoid blocking initial render
- Custom tooltip with branded styling
- Responsive container with proper height

#### [NEW] `features/admin/components/FraudBreakdown.tsx`
- Risk distribution bars (high/medium/low) computed from fraud heatmap data
- Color-coded progress bars with percentage labels
- Zone count per risk band

#### [MODIFY] [admin/page.tsx](file:///c:/Users/itska/Desktop/gottago-main/frontend/app/admin/page.tsx)
- Complete rebuild using the new feature components:
  - Hero section with breadcrumb, live badge, mini stats
  - `<Suspense fallback={<KPISkeleton />}>` wrapping `<FinancialKPIs />`
  - `<PayoutChart />` (lazy loaded) + forecast sidebar
  - `<FraudBreakdown />` with heatmap data
  - Manual trigger fire panel (existing functionality, now with toast feedback)
- All data fetched via react-query, no raw useEffect/fetch
- Error boundary around each panel section

---

### Phase 5: Layout & Registration Flow Verification

#### [MODIFY] [layout.tsx](file:///c:/Users/itska/Desktop/gottago-main/frontend/app/layout.tsx)
- Wrap children with `<Providers>` (QueryClientProvider + Toaster)
- Keep existing font and metadata configuration

#### Verify Registration Flow
- `/register` page -> form submission -> `POST /api/v1/workers/register`
- Confirm validation works (phone 10 digits, name 2-100 chars, rating 1-5)
- Confirm success redirects to dashboard with worker_id
- Confirm duplicate worker_id shows 409 error

#### Verify Dashboard Flow
- `/dashboard?worker_id=XXX` -> fetches worker data -> displays policy and claims
- "File Claim" button -> triggers claim creation flow
- Confirm claim status updates display correctly

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data fetching | `@tanstack/react-query` with Suspense | Caching, auto-refetch, retry. Frontend-dev-guidelines mandates Suspense-first |
| Toast library | `react-hot-toast` | 5KB, works without MUI. Lightweight for hackathon |
| Heavy component loading | `next/dynamic` | Recharts (~50KB) and PipelineVisual should not block initial paint |
| Feature organization | `features/admin/` for new admin code | Frontend-dev-guidelines: domain logic in features/, reusable in components/ |
| Error isolation | Error boundary component | Prevents single panel crash from taking down entire dashboard |
| CSS approach | Extend existing `globals.css` | No parallel token system. Map gigHood classes to existing custom properties |
| State management | None (URL params + react-query cache) | Hackathon scope. No need for zustand/redux |

---

## File Creation Order

1. `lib/query-client.ts`
2. `components/providers.tsx`
3. `components/error-boundary.tsx`
4. `features/admin/types/index.ts`
5. `features/admin/api/adminApi.ts`
6. `globals.css` updates (all new CSS classes)
7. `components/landing/TechStackMarquee.tsx`
8. `components/landing/PipelineVisual.tsx`
9. `app/page.tsx` overhaul
10. `features/admin/components/FinancialKPIs.tsx`
11. `features/admin/components/PayoutChart.tsx`
12. `features/admin/components/FraudBreakdown.tsx`
13. `app/admin/page.tsx` rebuild
14. Admin sub-page button fixes (4 files)
15. `main-sidebar.tsx` logout fix
16. `app/layout.tsx` provider wrap
17. Install dependencies + verify build

---

## Verification Plan

### Build Verification
1. `npm install` - confirm all dependencies resolve
2. `npm run build` - zero TypeScript/compilation errors
3. `npm run dev` - app starts without console errors

### Workflow Tests (Browser)
- **Registration**: Fill form on `/register`, submit, confirm redirect to dashboard
- **Dashboard**: Navigate to `/dashboard?worker_id=demo`, verify data loads, buttons respond
- **Admin Overview**: Navigate to `/admin`, verify KPIs load, charts render, trigger fire works
- **Admin Sub-pages**: Click every button on vaults/transactions/security/support, verify toasts
- **Navigation**: Click every link in navbar, sidebar, footer, dual portal section
- **Logout**: Click logout in sidebar, verify redirect to `/`
- **Landing page**: Verify marquee scrolls, pipeline stacks on scroll, all CTAs link correctly

### Responsive Check
- Test at 375px (mobile), 768px (tablet), 1440px (desktop)
