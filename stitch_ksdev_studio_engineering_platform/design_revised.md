# KSDev Studio (`ksdev`) — Design System & UI/UX Specification (`design.md`)

> **Purpose of this Document:**  
> This `design.md` file is the single source of truth for the visual identity, color tokens, typography, layout grids, component architecture, and screen structure of **KSDev Studio (`ksdev`)**.  
> Attach or paste this file into any AI coding or UI generation system (v0, Bolt.new, Lovable, Cursor, Claude, or Windsurf) whenever generating new screens, upgrading components, or refactoring the frontend.

---

## 1. Brand Identity & Aesthetic Direction

- **Brand Name:** KSDev Studio (`ksdev`)
- **Brand Positioning:** An elite, brand-first software engineering and cloud infrastructure studio. The identity is strictly agency-focused and professional (no individual founder names or personal team bios are shown on public-facing pages).
- **Core Offerings:** Full-Stack Web Development (Active), Cloud & DevOps Infrastructure (Active Standalone + Bundled in Premium Plans), Mobile App Development (Flutter/Supabase — Coming Soon / Custom Inquiry).
- **Primary Conversion Goal:** Funnel prospective clients from **Hero Hook → Studio Advantages → Portfolio Proof → Tiered Package Selection → Fiverr Gig Checkout**.
- **Theme Polarity:** **Strictly Daylight-First (Crisp Modern Light Theme)**. Never default to dark mode.
- **Visual Aesthetic ("Swiss Engineering Daylight"):**
  - Inspired by **Stripe, Vercel (Light Mode), Cal.com, and Linear Light**.
  - Crisp alabaster and pure white surfaces, exposed `1px solid` structural hairline borders (`#E2E8F0`), subtle warm stone secondary sections (`#F8FAFC`), high-contrast slate ink typography (`#0F172A`), and surgical use of **Royal Cobalt (`#2563EB`)** for interactive UI and **Emerald (`#10B981`)** for Fiverr conversion signals and online availability indicators.

---

## 2. Color System & Semantic Tokens (Light Theme)

All UI components must use the following light-mode color tokens. Avoid muddy grays or overly saturated neon backgrounds.

### 2.1 Surface & Background Palette
| Token Name | Hex Code | Tailwind Equivalent | Usage Guidelines |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#FFFFFF` | `bg-white` | Primary page background for Hero, Services, and Case Studies. |
| `--bg-subtle` | `#F8FAFC` | `bg-slate-50` | Alternating section background (Studio Advantages, Portfolio Archive, Admin Canvas). |
| `--bg-muted` | `#F1F5F9` | `bg-slate-100` | Filter pills, code blocks, inactive tabs, table headers, skeleton loaders. |
| `--bg-card` | `#FFFFFF` | `bg-white` | Project cards, Value proposition cards, Pricing Tier cards, Admin form containers. |
| `--bg-elevated-tint` | `#EFF6FF` | `bg-blue-50/60` | Highlighted surface tint for the **Premium + DevOps** pricing card and callout banners. |
| `--bg-glass-nav` | `rgba(255, 255, 255, 0.85)` | `bg-white/85 backdrop-blur-md` | Sticky top navigation bar and sticky Admin action bars. |

### 2.2 Typography & Ink Hierarchy
| Token Name | Hex Code | Tailwind Equivalent | Contrast Ratio (on `#FFF`) | Usage Guidelines |
| :--- | :--- | :--- | :--- | :--- |
| `--text-primary` | `#0F172A` | `text-slate-900` | 17.4 : 1 (AAA) | All H1–H4 headings, card titles, package prices, primary body emphasis. |
| `--text-secondary` | `#475569` | `text-slate-600` | 7.5 : 1 (AAA) | Standard body copy, project descriptions, studio descriptions, form labels. |
| `--text-muted` | `#64748B` | `text-slate-500` | 4.8 : 1 (AA) | Metadata, publication dates, input helper text, secondary captions. |
| `--text-on-brand` | `#FFFFFF` | `text-white` | — | Text inside primary buttons and solid accent badges. |

### 2.3 Brand, Funnel Conversion & Status Accents
| Token Name | Hex Code | Tailwind Equivalent | Usage Guidelines |
| :--- | :--- | :--- | :--- |
| `--accent-primary` | `#2563EB` | `bg-blue-600` / `text-blue-600` | Primary engineering brand color, active tabs, links, primary UI buttons, focus rings. |
| `--accent-primary-hover` | `#1D4ED8` | `hover:bg-blue-700` | Hover state for primary buttons and interactive links. |
| `--accent-devops` | `#4F46E5` | `text-indigo-600` / `bg-indigo-50` | Dedicated accent for **"Includes DevOps & Cloud CI/CD"** badges and infrastructure tags. |
| `--funnel-emerald` | `#10B981` | `bg-emerald-500` / `text-emerald-700` | Live **"Available for New Projects"** pulse dot, Fiverr trust badges, and feature checkmarks. |
| `--status-coming-soon` | `#D97706` | `text-amber-700 bg-amber-50 border-amber-200` | **"Launching Soon / Early Access"** badge for upcoming Mobile App Development services. |
| `--status-danger` | `#DC2626` | `text-red-600 bg-red-50 border-red-200` | Destructive confirmation modals, form validation errors, delete actions in Admin CMS. |

### 2.4 Borders, Dividers & Elevation Shadows
| Token Name | Value | Tailwind Equivalent | Usage Guidelines |
| :--- | :--- | :--- | :--- |
| `--border-subtle` | `1px solid #E2E8F0` | `border border-slate-200` | Default border for all cards, inputs, tables, and section dividers. |
| `--border-hover` | `1px solid #CBD5E1` | `hover:border-slate-300` | Card hover border transition. |
| `--border-featured` | `2px solid #2563EB` | `border-2 border-blue-600` | Border for the **Premium Plan (Most Popular)** Fiverr package card. |
| `--shadow-card` | `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)` | `shadow-sm` | Default resting shadow for white cards on `#F8FAFC` backgrounds. |
| `--shadow-card-hover` | `0 12px 24px -6px rgba(15, 23, 42, 0.08), 0 4px 8px -4px rgba(15, 23, 42, 0.04)` | `hover:shadow-lg hover:shadow-slate-900/5` | Elevated hover state for interactive project and pricing cards. |

---

## 3. Typography System

Use Google Fonts loaded cleanly in `index.html`. The pairing balances geometric startup authority with crisp readability and technical precision.

### 3.1 Font Families
1. **Heading & Display Font (`--font-display`):** `'Plus Jakarta Sans'`, sans-serif (`weights: 600, 700, 800`)
   - *Why:* Modern geometric proportions that look authoritative, friendly, and sharp on light backgrounds.
2. **Body & Admin UI Font (`--font-sans`):** `'Inter'`, sans-serif (`weights: 400, 500, 600`)
   - *Why:* Industry-standard legibility for dense pricing checklists, case studies, and Admin CMS forms.
3. **Technical & Metadata Font (`--font-mono`):** `'JetBrains Mono'`, monospace (`weights: 400, 500`)
   - *Why:* Used for brand logo (`ksdev_`), URL slugs (`/projects/geargo`), tech stack pills (`Docker`, `PostgreSQL`, `Flutter`), package delivery days (`7 DAYS DELIVERY`), and price tags.

### 3.2 Typographic Scale & Rules
| Element | Font Family | Desktop Size | Mobile Size | Line Height | Letter Spacing | Weight |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display (H1)** | `Plus Jakarta Sans` | `3.5rem` (`56px`) | `2.25rem` (`36px`) | `1.1` | `-0.03em` (`tracking-tight`) | `700` / `800` |
| **Section Heading (H2)** | `Plus Jakarta Sans` | `2.25rem` (`36px`) | `1.75rem` (`28px`) | `1.2` | `-0.025em` | `700` |
| **Card / Subsection (H3)** | `Plus Jakarta Sans` | `1.375rem` (`22px`) | `1.25rem` (`20px`) | `1.3` | `-0.015em` | `600` |
| **Lead / Hero Subtitle** | `Inter` | `1.125rem` (`18px`) | `1rem` (`16px`) | `1.65` | `0em` | `400` |
| **Body Default** | `Inter` | `1rem` (`16px`) | `0.9375rem` (`15px`) | `1.6` | `0em` | `400` |
| **UI Label / Button** | `Inter` | `0.875rem` (`14px`) | `0.875rem` (`14px`) | `1.25` | `+0.01em` | `500` / `600` |
| **Mono Pill / Eyebrow** | `JetBrains Mono` | `0.75rem` (`12px`) | `0.75rem` (`12px`) | `1.2` | `+0.04em` (`uppercase`) | `500` |

---

## 4. Layout, Grid & Spacing Architecture

- **Max Container Width (Public Website):** `1200px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Max Reading Width (Case Study Prose):** `720px` (`max-w-3xl`) for effortless long-form reading.
- **Section Vertical Rhythm:**
  - Desktop: `py-24` (`96px` top and bottom padding) separated by a `1px solid #E2E8F0` horizontal hairline.
  - Mobile: `py-16` (`64px` top and bottom padding).
- **Architectural Grid Lines (Signature Visual Motif):**
  - Wrap the main `1200px` content container in subtle vertical `1px solid #E2E8F0` left/right structural borders on desktop viewports (similar to Vercel/Stripe light mode) to give an engineered blueprint feel.
- **Border Radius Scale:**
  - Buttons, Inputs & Tech Badges: `8px` (`rounded-lg`)
  - Project, Value Proposition & Pricing Cards: `16px` (`rounded-2xl`)
  - Status Pills & Eyebrow Badges: `9999px` (`rounded-full`)

---

## 5. Core UI Components & Micro-Interactions

### 5.1 Sticky Glass Navbar
- **Height:** `68px` (`h-17`), sticky top (`sticky top-0 z-50`), background `bg-white/85 backdrop-blur-md border-b border-slate-200`.
- **Left:** Brand wordmark `ksdev` in `Plus Jakarta Sans Bold` (`#0F172A`) with a royal blue underscore `_` in `JetBrains Mono` (`#2563EB`).
- **Center:** Clean anchor links (`Studio`, `Featured Work`, `Services & Pricing`, `Tech Stack`) in `text-slate-600 hover:text-slate-900 font-medium`.
- **Right:**
  1. **Live Availability Pill:** Soft emerald background (`bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full`) with an animated pulsing green dot (`bg-emerald-500`).
  2. **Primary Funnel CTA Button:** `"Order on Fiverr ↗"` (`bg-slate-900 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm`).

### 5.2 Button Hierarchy
1. **Primary Conversion CTA (Fiverr Checkout / Package Selection):**
   - `bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-150 inline-flex items-center gap-2`
   - Always includes a subtle external-link arrow icon (`ArrowUpRight` from `lucide-react`) when routing to Fiverr.
2. **Secondary Action Button (Explore Work / Case Study / Live Demo):**
   - `bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300 font-medium px-5 py-3 rounded-lg transition-all duration-150`
3. **Ghost / Filter Pill Button:**
   - Default: `bg-slate-100 text-slate-600 hover:bg-slate-200 px-3.5 py-1.5 rounded-full text-xs font-mono`
   - Active Filter: `bg-slate-900 text-white px-3.5 py-1.5 rounded-full text-xs font-mono shadow-xs`

### 5.3 Studio Advantages & Core Pillars (Replacing Personal Bios)
- **Layout:** 3-column Bento grid on `#F8FAFC` background highlighting the agency's institutional strengths rather than individual people.
- **Card Styling:** `bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between`.
- **Contents:**
  - Icon badge top-left (`bg-blue-50 text-blue-600 p-3 rounded-xl w-fit`).
  - Pillar Title (`H3`, `#0F172A`, e.g., *"Direct Senior Architecture"* or *"Zero Bloat, Production Code"*).
  - Concise value proposition prose (`text-slate-600 text-sm leading-relaxed`).
  - Interactive tech stack integration strip (`JetBrains Mono` technology pills showing institutional capability).

### 5.4 Portfolio Project Card (`projects`)
- **Card Container:** `group bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 flex flex-col`.
- **Thumbnail Frame:** `aspect-16/10 bg-slate-100 border-b border-slate-100 overflow-hidden relative`.
  - Category badge floating top-left (`bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200 text-xs font-mono px-2.5 py-1 rounded-md`).
- **Card Body:**
  - Project Title (`H3`) + Short Description (`line-clamp-2 text-slate-600 text-sm`).
  - Associated Technology Pills.
  - Footer bar (`border-t border-slate-100 pt-4 mt-auto flex items-center justify-between`):
    - Left: Agency verified badge (`"Verified KSDev Build"`).
    - Right: `"Read Case Study →"` (`text-blue-600 font-semibold text-sm`) + icon links for `"Live Demo ↗"` and `"GitHub"`.

### 5.5 3-Tier Fiverr Package Matrix (`services` + `pricing_tiers_json`)
- **Service Switcher Tabs:** Centered segmented control (`bg-slate-100 p-1.5 rounded-xl inline-flex border border-slate-200`):
  - **Full-Stack Web Dev** (`ACTIVE` badge)
  - **Cloud & DevOps** (`ACTIVE` badge)
  - **Mobile App Dev** (`COMING SOON` amber pill)
- **3-Column Pricing Grid (`Basic`, `Standard`, `Premium`):**
  - **Basic & Standard Cards:** `bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between`.
  - **Premium Card (Visual Anchor):** `bg-gradient-to-b from-blue-50/50 to-white border-2 border-blue-600 rounded-2xl p-7 relative shadow-md flex flex-col justify-between`.
    - Top floating pill: `"MOST POPULAR • INCLUDES CLOUD DEVOPS"` in `bg-blue-600 text-white font-mono text-xs uppercase px-3 py-1 rounded-full`.
  - **Card Anatomy:**
    1. Tier Name (`Basic • Landing Funnel`)
    2. Price in large display font (`$350` in `Plus Jakarta Sans Bold 36px`) + delivery metadata (`⏱ 7 Days Delivery • 4 Revisions` in `JetBrains Mono text-xs text-slate-500`).
    3. Optional **DevOps Included Callout Box** (if `includes_devops = true`): `bg-indigo-50/80 border border-indigo-200 text-indigo-900 rounded-lg p-3 text-xs font-medium flex items-center gap-2`.
    4. Feature Checklist with emerald check icons (`CheckCircle2` in `#10B981`).
    5. Full-width bottom CTA button: `"Continue to Fiverr Gig ↗"` (routes directly to the tier's `fiverr_url`).

---

## 6. Screen Inventory & Funnel Flow Architecture

### 6.1 Public Conversion Funnel Screens (4 Screens)
1. **Screen P-1: Main Funnel Landing Page (`/`)**
   - **Exact Vertical Section Order:**
     1. `Sticky Glass Navbar` (Brand, jump-links, live availability indicator, Fiverr CTA)
     2. `Hero Funnel Section` (Service pill, H1 headline, studio motto, subheadline, Primary `"Compare Fiverr Packages"` CTA, Secondary `"Explore Our Work"` CTA, 4-item engineering trust strip)
     3. `Studio Advantages & Core Pillars` (Agency value proposition — eliminating individual developer bios and emphasizing institutional reliability + tech stack strip)
     4. `Featured Engineering Work` (Category/Tech filter bar + 3–6 published project cards proving technical capability before showing prices)
     5. `Service Ecosystem & Fiverr Pricing Funnel` (Service switcher tabs + 3-Tier Basic/Standard/Premium Fiverr comparison matrix + DevOps bundle callout)
     6. `Bottom Conversion Banner & Minimal Footer` (Final callout for custom quotes + direct Fiverr & email/social links)
2. **Screen P-2: Project Case Study Detail View (`/projects/:slug`)**
   - Breadcrumb navigation, project header with Live Demo & GitHub buttons, interactive screenshot gallery with thumbnail switcher and captions, 2-column layout (70% rich case study prose, 30% sticky sidebar with Tech Stack, agency delivery guarantee, and a contextual `"Order a Similar System on Fiverr ↗"` conversion card).
3. **Screen P-3: Full Portfolio Archive (`/projects`)**
   - Clean header, search input, technology & category filter pills (`All`, `Web App`, `Mobile App`, `DevOps & Cloud`, `React`, `Node.js`, `Docker`, `Flutter`), and responsive 3-column grid of all published projects.
4. **Screen P-4: Custom Brief / Early Access Modal (Slide-Over Drawer or `/contact`)**
   - Triggered when a user clicks `"Need a Custom Scope?"` or selects a `"Coming Soon"` service (like Mobile App Dev). Displays direct Fiverr message link, pre-formatted email/WhatsApp brief generator, and expected response time (`< 2 hours`).

### 6.2 Backend Admin CMS Screens (8 Screens — Light Mode Workspace)
The Admin CMS also uses the **Crisp Light Theme**: a `#F8FAFC` workspace canvas with a fixed `260px` white left sidebar (`bg-white border-r border-slate-200`), clean white data tables, and sticky bottom save bars.

1. **Screen A-1: Admin Sign-In (`/admin/login`)** — Centered white card on subtle grid background, email/password inputs, inline error alert, rate-limit notice.
2. **Screen A-2: CMS Overview Dashboard (`/admin`)** — KPI metric cards (Published Projects, Drafts, Active Services), one-click toggle switch for the homepage `"Available for New Projects"` green pulse badge, and quick-action shortcuts.
3. **Screen A-3: Global Site & Funnel Copy Editor (`/admin/settings`)** — Tabbed form controlling 100% of `site_settings` (Brand Name, Motto, Hero Headlines, Studio Pillar Copy, Section Headings, Section Visibility switches, Primary Fiverr URL, and Social Links).
4. **Screen A-4: Services & Fiverr Pricing Manager (`/admin/services`)** — Visual editor for Web, Mobile App, and DevOps services. Includes `ACTIVE` / `COMING_SOON` / `HIDDEN` selector, display order, `"Includes DevOps"` toggle, and a 3-column editor for Basic/Standard/Premium pricing tiers and Fiverr checkout URLs.
5. **Screen A-5: Projects Directory (`/admin/projects`)** — Filterable table (`All`, `Published`, `Draft`, `Archived`), quick `Featured` star toggle, numeric order input, status pills, and safe Archive/Delete confirmation modal.
6. **Screen A-6: Project Editor & Media Uploader (`/admin/projects/new` & `/admin/projects/:id`)** — 2-column form: Left side for Title, auto-slug, descriptions, URLs, Tech Stack multi-select; Right side for Drag-and-Drop Multi-Image Uploader (`JPEG/PNG/WebP <= 5MB`), image reordering, alt text inputs, and the single `"Set as Thumbnail"` radio button.
7. **Screen A-7: Tech Stack Catalog (`/admin/catalog`)** — Management screen to add/edit technology filter tags and icons (`technologies`).
8. **Screen A-8: Admin Users & Role Access (`/admin/users`)** — Admin-only table to manage accounts, toggle `is_active`, and assign `admin` or `editor` roles.

---

## 7. Strict Guardrails for AI UI Generators

When generating or updating code for **KSDev Studio (`ksdev`)**, all AI assistants must obey these rules:
1. **Never Use Dark Mode Defaults:** Do not use `#000000`, `#09090B`, or dark zinc backgrounds. Always use `#FFFFFF` and `#F8FAFC` surfaces with `#0F172A` slate typography.
2. **Strict Agency Anonymity:** Never display individual founder names (Khizar or Saad), personal photos, or developer bio sections. The site represents **KSDev Studio** as a unified software engineering agency.
3. **Zero Hardcoded Marketing Copy in Components:** Every headline, motto, service tier, project card, and value proposition must accept dynamic props mapped to the PostgreSQL schema (`site_settings`, `services`, `projects`, `technologies`), using the seeded values as fallback defaults.
4. **External Link Safety:** Every Fiverr gig button, GitHub link, and Live Demo link must render with `target="_blank" rel="noopener noreferrer"`.
5. **Complete UI States:** Every data-driven section must include a clean light-mode loading skeleton (`bg-slate-100 animate-pulse`), an empty filter state with a `"Reset Filters"` button, and a non-crashing error fallback banner.
6. **Responsive Mobile Ergonomics:** Pricing matrices and Bento grids must stack cleanly into a single column (`grid-cols-1`) below `768px`, and primary Fiverr CTA buttons must be full-width (`w-full sm:w-auto`) on mobile viewports.