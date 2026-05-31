# Implementation Checklist — MYSC 수출바우처 안내페이지 MVP

> **Source of truth**: `docs/prd.md` (functionality, data, routing, Tally, MVP scope)
> **Visual reference**: Figma nodes 1:198 (landing), 1:483 (service finder), 1:982 (drawer)
> **If Figma and PRD conflict**: ask before deciding

---

## Final Decisions Record

| Topic | Decision |
|---|---|
| Logo | `docs/mysc_logo.png` — copy to `public/` for Next.js |
| Service card buttons | Both buttons per PRD: primary = 신청 페이지 바로가기, secondary = 자세히 보기; compact two-button layout |
| Card clickability | Whole card NOT clickable; only the two buttons trigger actions |
| Country filter | Multi-select; no "전체" chip; empty = show all |
| Support type filter | Multi-select; empty = show all |
| Filter reset | Per-group reset link: "국가/권역 선택 초기화" / "지원유형 선택 초기화" |
| Filter logic | OR within group; AND between groups |
| "전체 국가" tag | Real tag meaning "broadly applicable"; shown when that country is selected OR when any other country is selected but service also has "전체 국가" |
| Support type label in UI | Middle dot `·` (e.g. `시장조사·진출전략`) |
| Support type normalization | Normalize both `/` and `·` when filtering (CSV may use either) |
| FAQ | Hardcoded in `lib/static-content.ts`; 6 items with links opening in new tab |
| Curriculum section | Static image from Figma if extractable; else placeholder container |
| Next.js router | App Router |
| Nav active state | Highlight current page link |

---

## Phase 1 — Project Bootstrap

- [ ] Initialize Next.js 14 project (TypeScript + App Router)
- [ ] Install and configure Tailwind CSS
- [ ] Copy `docs/mysc_logo.png` → `public/mysc_logo.png`
- [ ] Set up folder structure: `app/`, `components/`, `lib/`, `types/`, `public/`
- [ ] Extract brand tokens from Figma `get_design_context` (colors, fonts, spacing) and configure in `tailwind.config.ts`
- [ ] Add Tally widget script to `app/layout.tsx` `<head>`
- [ ] Configure `next.config.ts` for external image domains (Google Sheets image URLs)

## Phase 2 — Data Layer

- [ ] Define `Service` TypeScript interface matching all 20 CSV columns (`types/service.ts`)
- [ ] Implement `lib/csv.ts`: server-side fetch of Google Sheets Published CSV with `revalidate: 300` (5 min)
- [ ] Implement CSV → `Service[]` parser:
  - [ ] Boolean normalization (`TRUE/true/Y/y/1` → `true`, else `false`)
  - [ ] Array fields (`countries`, `support_types`, `keyword_tags`) split on `,` and trimmed
  - [ ] `highlight_order` fallback to `sort_order` when blank
  - [ ] Empty optional fields default to `''` or `[]` without crashing
- [ ] Implement `getHighlightedServices(services)`: `is_highlighted=true`, sorted `highlight_order` asc
- [ ] Implement `getVisibleServices(services)`: `is_visible=true`, sorted `sort_order` asc
- [ ] Create `lib/static-content.ts` with hardcoded FAQ data (6 items, links, new-tab behavior)
- [ ] Store hardcoded filter values in `lib/filter-config.ts` (country list, support type list with `·` labels)

## Phase 3 — Shared Components

- [ ] `components/Navbar.tsx` — MYSC logo (`/mysc_logo.png`), nav links with active state
  - [ ] 홈 → `/`
  - [ ] 서비스 찾기 → `/services`
  - [ ] 상담신청 → `Tally.openPopup('EkDj8X', { hiddenFields: { source_page: 'top_nav' } })`
  - [ ] Active link visually highlighted (current page)
  - [ ] Mobile-safe compact layout (no overflow)
- [ ] `components/TagChip.tsx` — country / support type pill tag (Figma chip style)
- [ ] `components/KeywordTag.tsx` — `#keyword` small plain text style (Figma hashtag row)
- [ ] `components/Button.tsx` — primary and secondary variants (matches Figma button styles)
- [ ] `lib/tally.ts` — `openTally(hiddenFields)` utility; hash-link fallback if `Tally` not loaded

## Phase 4 — Service Finder Page (`/services`)

- [ ] `app/services/page.tsx` — server component; fetches CSV, passes data to client components

### Hero / Header
- [ ] Headline: "우리 기업에 맞는 수출바우처 서비스를 찾아보세요."
- [ ] Subtitle: "관심 국가와 필요한 지원유형을 선택해 활용 가능한 글로벌 진출 서비스를 확인할 수 있습니다."
- [ ] Helper: "아직 진출 국가가 정해지지 않았다면 '전체'로 두고, 필요한 지원유형부터 선택해보세요."

### Filter Area
- [ ] **국가/권역** label + multi-select pill buttons (전체 국가, 미국, 프랑스, 독일, 일본, 싱가포르, 유럽 — NO "전체" chip)
- [ ] **지원유형** label + multi-select pill buttons (5 types, `·` labels)
- [ ] Active/inactive visual states match Figma chips
- [ ] Per-group reset: "국가/권역 선택 초기화" / "지원유형 선택 초기화" (only shown when group has selection)
- [ ] Result count: "총 N개의 서비스를 확인할 수 있습니다."
- [ ] Global **필터 초기화** button (clears both groups)
- [ ] **전체 메뉴판 보기** link — `hidden` / `display:none` in DOM (MVP)

### Filtering Logic
- [ ] OR within country group; OR within support type group; AND between groups
- [ ] `전체 국가`-tagged services always included when any specific country is selected
- [ ] When `전체 국가` chip is selected: show only `전체 국가`-tagged services (plus any also-selected countries' OR)
- [ ] Empty selection in either group = no filter applied for that dimension
- [ ] Normalize both `/` and `·` in `support_types` values before comparison

### Service Card Grid
- [ ] 3-col desktop / 2-col tablet / 1-col mobile responsive grid
- [ ] **Loading state**: "서비스 정보를 불러오는 중입니다."
- [ ] **Error state**: "서비스 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
- [ ] **Empty state**: "조건에 맞는 서비스가 없습니다. 선택한 국가나 지원유형을 다시 조정해보세요."

### Bottom CTA
- [ ] "어떤 서비스를 선택해야 할지 고민되시나요?" → 상담 문의하기 → Tally (`source_page: 'service_finder_bottom_cta'`)

## Phase 5 — Service Card Component

- [ ] `components/ServiceCard.tsx`
- [ ] Service name (Heading 3 style from Figma)
- [ ] Country tags row (`TagChip` × N)
- [ ] Support type tags row (`TagChip` × N, `·` label display)
- [ ] Summary paragraph
- [ ] Keyword tags row (`KeywordTag` × N, `#tag` style)
- [ ] **Two-button footer** (compact layout if needed):
  - [ ] Primary: `신청 페이지 바로가기` → `application_url` new tab; disabled + "신청 페이지 준비 중" if URL empty
  - [ ] Secondary: `자세히 보기` → opens Service Detail Drawer for this service
- [ ] Card itself NOT clickable as a whole
- [ ] Disabled button: `aria-disabled`, visually distinct (greyed out)

## Phase 6 — Service Detail Drawer

- [ ] `components/ServiceDrawer.tsx`
- [ ] Right-side slide-in (desktop 520px wide); full-screen or bottom sheet (mobile)
- [ ] Dim overlay behind drawer
- [ ] **Header** (Figma 152px zone):
  - [ ] Service name (H2 style)
  - [ ] X close button with `aria-label="닫기"`
  - [ ] Country + support type tag row
- [ ] **Body** (Figma 606px zone):
  - [ ] Summary paragraph
  - [ ] Keyword tags row
  - [ ] DetailSection × 3: heading (H4) + body text
    - [ ] 서비스 소개 → `detail_intro`
    - [ ] 진행 방식 → `detail_process`
    - [ ] BASIC 구성 → `detail_composition`
    - [ ] Skip/hide section if field is blank
  - [ ] Body content scrollable if overflow
- [ ] **Footer** (Figma 171px zone):
  - [ ] Primary: `신청 페이지 바로가기` → `application_url` new tab; disabled if empty
  - [ ] Secondary: `상담 문의하기` → Tally with service hidden fields
- [ ] **Close interactions**: X button, ESC key, click outside overlay
- [ ] Focus trap while open
- [ ] Body scroll lock when open
- [ ] Tally hidden fields from drawer: `source_page='service_detail_drawer'`, `selected_service_id`, `selected_service_name`, `selected_countries`, `selected_support_types`

## Phase 7 — Landing Page (`/`)

- [ ] `app/page.tsx` — server component; fetches CSV for highlighted services

### Sections (in order)
- [ ] **Hero** — full-width, matches Figma Section 1 visual (static)
- [ ] **수출바우처 / MYSC 소개** — two side-by-side panels + 3 info cards (지원대상, 지원분야, 바우처한도)
- [ ] **해외 진출 커리큘럼** — static section:
  - [ ] Tab row (country buttons, static, decorative for MVP)
  - [ ] Main visual: static image asset extracted from Figma or placeholder `<div>` with note to replace
- [ ] **하이라이트 서비스 캐러셀**
  - [ ] Render only `is_highlighted=true` services sorted by `highlight_order`
  - [ ] Card fields: `highlight_image_url` (gradient placeholder if blank), `highlight_title` (fallback `service_name`), `highlight_subtitle`, `highlight_summary` (fallback `summary`), `highlight_period`, `highlight_cta_label` (fallback `신청하기`)
  - [ ] CTA → `application_url` new tab; disabled state if URL blank
  - [ ] Horizontal scroll (desktop); swipe (mobile)
  - [ ] Hide section entirely if zero highlighted services
- [ ] **수요기업 선정 프로세스** — 5-step static section (steps 1–5 with icons/numbers)
- [ ] **FAQ** — static accordion from `lib/static-content.ts`
  - [ ] 6 items; links open in new tab (`target="_blank" rel="noopener noreferrer"`)
  - [ ] Links styled subtly (recognizable but matching Figma visual tone)
- [ ] **하단 상담 CTA** — "지금 바로 상담을 신청해보세요." → Tally (`source_page: 'landing_cta'`)

## Phase 8 — Tally Integration

- [ ] Tally `<script>` in `app/layout.tsx` `<head>` (one time, `async`)
- [ ] `lib/tally.ts` util: `openTally(hiddenFields)` → calls `window.Tally?.openPopup(...)` or falls back to hash link
- [ ] Default popup options: `{ layout: 'modal', width: 700, emoji: { text: '👋', animation: 'wave' } }`
- [ ] Nav 상담신청: `source_page: 'top_nav'`
- [ ] Landing CTA: `source_page: 'landing_cta'`
- [ ] Service finder bottom CTA: `source_page: 'service_finder_bottom_cta'`
- [ ] Drawer 상담 문의하기: full 5 service hidden fields

## Phase 9 — Responsive Design

- [ ] Desktop (≥1280px): 3-col grid, right Drawer (520px), horizontal carousel
- [ ] Tablet (768–1279px): 2-col grid, filter chips wrap, Drawer as overlay modal
- [ ] Mobile (<768px): 1-col grid, swipe carousel, full-screen or bottom sheet Drawer
- [ ] Navbar compact on mobile — no overflow/wrapping issues

## Phase 10 — Accessibility

- [ ] All buttons and links keyboard-accessible
- [ ] Drawer focus trap
- [ ] Drawer close button `aria-label`
- [ ] Disabled buttons: `aria-disabled="true"` + visual grey style
- [ ] Images: `alt` text
- [ ] Color contrast maintained on dark brand backgrounds
- [ ] Carousel scroll accessible via keyboard or buttons

## Phase 11 — Deployment

- [ ] `next build` passes with no errors
- [ ] Deploy to Vercel
- [ ] Confirm CSV fetch works in production (server-side — no CORS issues)
- [ ] Confirm Tally popup works in production
- [ ] Confirm logo image loads from `public/`

---

## Still Open (Not Blocking — Will Proceed With Reasonable Approach)

| # | Topic | Planned approach |
|---|---|---|
| A | Curriculum image asset | Extract via `get_design_context` on curriculum section node; if not extractable, use placeholder `<div>` and report which image file to provide |
| B | Hero section visual | Extract via `get_design_context`; determine if static image or CSS-only recreation |
| C | Exact colors / fonts / spacing | Extract via `get_design_context` on key nodes at implementation start |
| D | FAQ accordion animation | Simple CSS expand/collapse; no external library |
