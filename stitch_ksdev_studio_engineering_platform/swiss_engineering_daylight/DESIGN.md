---
name: Swiss Engineering Daylight
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  canvas-pure: '#FFFFFF'
  surface-subtle: '#F8FAFC'
  surface-muted: '#F1F5F9'
  accent-tint: '#EFF6FF'
  border-subtle: '#E2E8F0'
  border-hover: '#CBD5E1'
  text-primary: '#0F172A'
  text-secondary: '#475569'
  text-muted: '#64748B'
  accent-primary-hover: '#1D4ED8'
  accent-devops: '#4F46E5'
  status-warning: '#D97706'
  status-danger: '#DC2626'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lead:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.65'
    letterSpacing: 0em
  body-default:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: 0em
  ui-action:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: 0.01em
  ui-caption:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.01em
  code-badge:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.04em
  code-meta:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers a disciplined, institutional aesthetic anchored in modern engineering precision. Inspired by the visual clarity of Stripe, Vercel Light, Linear, and Cal.com, the interface trades ornamental gimmicks for structural confidence, generous daylight whitespace, and architectural hairline divisions.

### Personality & Emotional Response
The interface evokes absolute technical competence, reliability, and calm authority. By stripping out dark canvas conventions and personal vanity metrics, it presents an anonymous, high-caliber software engineering studio. Visual hierarchy is established through high typographic contrast, structural wireframe grids, and purposeful accent touches.

### Core Stylistic Pillars
- **Daylight Exclusivity:** A strict light-mode design language rejecting dark canvas palettes in favor of clean alabaster surfaces, micro-graded slates, and pure white planes.
- **Architectural Wireframes:** Layout elements, cards, and page boundaries are defined by crisp 1-pixel hairline borders (`#E2E8F0`), echoing mechanical blueprints and technical schematics.
- **Functional Materiality:** Depth is conveyed through surface tiering, subtle background shifts, and delicate, high-diffusion elevation states rather than heavy drop shadows.
- **Typographic Triad:** Geometric display titles (Plus Jakarta Sans) provide modern impact, neutral sans-serif body copy (Inter) ensures reading efficiency, and monospaced accents (JetBrains Mono) ground metadata and developer credentials.

## Colors

The palette operates under a daylight-first discipline. Pure black and saturated dark canvases are prohibited. The chromatic hierarchy establishes strict functional boundaries between navigation, content reading, interactive affordances, and conversion signals.

### Application Guidelines
- **Canvas & Surfaces:** Use `#FFFFFF` for the primary canvas, elevated card bodies, admin form containers, and sticky headers. Use `#F8FAFC` (Slate-50) for alternate structural sections (Bento grids, admin canvas backgrounds) and `#F1F5F9` (Slate-100) for interactive troughs, segmented switcher bases, and code surfaces.
- **Text & Ink Hierarchy:** Primary headers and solid high-intent controls use `#0F172A` (Slate-900) achieving a 17.4:1 contrast ratio against white. Standard reading copy and interface labels utilize `#475569` (Slate-600). Timestamps, supplementary technical tags, and delivery indicators utilize `#64748B` (Slate-500).
- **Brand & Action Accents:** `#2563EB` (Royal Cobalt) commands primary software actions, focus outlines, inline links, and featured card boundaries. Hover states transition to `#1D4ED8`.
- **Domain Indicators:** `#10B981` (Emerald) acts strictly as a conversion and operational trust signal (live availability indicator, verified checkmarks, platform badges). `#4F46E5` is dedicated to cloud, CI/CD, and DevOps architectural tags. `#D97706` indicates preview states, and `#DC2626` flags destructive mutations or system validation failures.

## Typography

The typographic system orchestrates structural hierarchy through three specialized font families, balancing editorial geometry, neutral prose scanning, and developer-centric precision.

### Typographic Hierarchy & Roles
- **Display & Headings (Plus Jakarta Sans):** Applied to high-impact marketing headers, Bento section titles, pricing tags, and section intros. Tight tracking (`-0.03em` to `-0.015em`) and solid weights (600 to 800) give hero elements an architectural stance.
- **Interface & Prose (Inter):** Applied across all body paragraphs, documentation, admin table cells, form labels, and button labels. Line heights are tuned for effortless readability (`1.55` to `1.65`), preserving scannability across high-density layouts.
- **Technical & Metadata (JetBrains Mono):** Reserved for technical tags, category badges, uptime counters, pricing delivery timelines, and the brand punctuation mark (`_`). Badges enforce uppercase transformation with wider letter-spacing (`+0.04em`) to simulate terminal hardware interfaces.

## Layout & Spacing

Layout geometry follows an 8-pixel structural grid with 4-pixel micro-alignments, establishing rhythm across viewports.

### Architectural Layout Grid
- **Main Container Frame:** Capped at `1200px` (`max-w-7xl`). On desktop viewports (`>= 1280px`), the outer wrapper is framed on the left and right by `1px solid #E2E8F0` vertical blueprint guides, demarcating the edge of the visual layout canvas.
- **Reading Containers:** Long-form technical case studies are restricted to `720px` (`max-w-3xl`) to enforce a line length of 65–75 characters per row.
- **Vertical Rhythm:** Public page sections alternate with `6rem` (`96px`) top/bottom padding on desktop and `4rem` (`64px`) on mobile viewports.
- **Grid Structures:**
  - Bento Studio Grid: 3 columns desktop (`grid-cols-3`), collapsing to single column below `768px`.
  - Pricing Matrix: 3-column comparative view with explicit 24px gaps (`gap-6`).
  - Admin Workspaces: 2-column layout pairing a `260px` fixed-width navigation rail with an open fluid editing pane.

## Elevation & Depth

Visual hierarchy relies on structural hairline boundaries and micro-tints rather than heavy skeuomorphic drops.

### Elevation Tiers
- **Hairline Rest (`border-subtle`):** All cards, inputs, and content panels rest on a `1px solid #E2E8F0` border.
- **Card Ambient Rest:** Cards resting on `#F8FAFC` employ a subtle elevation token: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`. This softly decouples the container without dirtying the light canvas.
- **Interactive Lift (Hover):** On mouse entry, cards elevate subtly with a `-2px` vertical translation (`-translate-y-0.5`), accompanied by an expanded light dispersion shadow: `0 12px 24px -6px rgba(15, 23, 42, 0.08), 0 4px 8px -4px rgba(15, 23, 42, 0.04)` and border shift to `#CBD5E1`.
- **Translucent Overlays:** The top navigation header is locked to `z-50` with a 68px height, utilizing `rgba(255, 255, 255, 0.85)` surface fill alongside `backdrop-blur-md` and a clean `border-b border-slate-200`.

## Shapes

The design system uses a calibrated rounded geometry (Level 2), providing organic approachability while retaining engineering discipline.

### Geometry Roles
- **Base Rounding (`rounded-lg` / `8px`):** The primary radius applied to buttons, text inputs, form select fields, and inline utility containers.
- **Large Rounding (`rounded-xl` / `12px`):** Icon highlight boxes, segmented controller tracks, and popover panels.
- **Card Rounding (`rounded-2xl` / `16px`):** Main presentation containers, including project showcase tiles, Bento boxes, and pricing matrix tiers.
- **Full Radius (`rounded-full` / `9999px`):** Interactive filter badges, status pills, live availability indicators, and circular avatar containers.
- **Structural Lines:** Dividers and bounding frames use non-rounded, razor-sharp 1px lines to anchor fluid container shapes against the viewport.

## Components

### Buttons & Interactive Triggers
- **Primary Action (Brand):** Rendered in `#2563EB` with `#FFFFFF` text, `0.875rem` font size, semi-bold weight, `rounded-lg` (8px), padding of `10px 20px` (`py-2.5 px-5`). Hover state transitions to `#1D4ED8` within 150ms. Focus renders a 2px offset ring of `#2563EB`.
- **Primary Conversion (Fiverr):** Solid `#0F172A` background with `#FFFFFF` text. Employs a right-angled Lucide `ArrowUpRight` icon (`w-4 h-4`) aligned to the trailing edge.
- **Secondary (Outline):** Background of `#FFFFFF`, border of `1px solid #E2E8F0`, text in `#0F172A`. Transitions on hover to `#F8FAFC` background and `#CBD5E1` border.
- **Tertiary (Ghost):** Transparent background, `#475569` text, transitioning to `#F1F5F9` background and `#0F172A` text on hover.

### Filter Chips & Metadata Pills
- **Tech Stack Badges:** Composed using `JetBrains Mono`, `0.75rem` uppercase text, `rounded-md` (6px) or `rounded-full`, padding of `4px 10px`. Background `#F1F5F9`, text `#475569`, border `1px solid #E2E8F0`.
- **Live Availability Pill:** `rounded-full`, background `rgba(16, 185, 129, 0.1)` (`#ECFDF5`), border `1px solid #A7F3D0`, text `#065F46`. Houses an emerald status dot featuring a continuous keyframe pulse animation.
- **Filter Switcher:** Segmented control track in `#F1F5F9` with `4px` padding and `rounded-xl`. Active segment features a `#FFFFFF` fill with `shadow-sm` and `#0F172A` text; inactive segments feature `#64748B` text.

### Form Inputs & Controls
- **Text Inputs & Textareas:** `#FFFFFF` background, `1px solid #E2E8F0` border, `rounded-lg`, padding `10px 14px`. Placeholder text styled in `#64748B`. Active focus state triggers an immediate `border-[#2563EB]` and `ring-2 ring-blue-500/20` transition without harsh outlines.
- **Checkboxes & Radios:** `16px` bounding box, `rounded-md` for checks and `rounded-full` for radios. Border is `1px solid #CBD5E1`. When checked, surfaces fill with `#2563EB` and display a pure white check vector.

### Cards & Content Containers
- **Project Showcase Cards:** Built on a `#FFFFFF` container with `rounded-2xl`, `1px solid #E2E8F0` border, and an integrated `16:10` aspect ratio image container framed with a subtle bottom divider (`border-b border-slate-100`). Hover induces `-translate-y-0.5` and elevates the border to `#CBD5E1`.
- **Featured Pricing Card:** Anchored with a dominant `2px solid #2563EB` frame, top subtle gradient tint (`from-blue-50/60 to-white`), and a floating prominent badge indicating package priority. Includes an internal feature list populated by `#10B981` `CheckCircle2` icons.