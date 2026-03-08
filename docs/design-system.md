# Dot Portal — Design System

**Aesthetic:** Warm Editorial  
**Stack:** Vanilla HTML / CSS / JS — no frameworks, no build tools  
**Themes:** Light (default) + Dark — togglable, persisted via `localStorage`

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing Scale](#spacing-scale)
5. [Layout](#layout)
6. [Motion & Animation](#motion--animation)
7. [Components](#components)
8. [Dark Mode](#dark-mode)
9. [Accessibility](#accessibility)
10. [File Structure](#file-structure)

---

## Design Principles

The visual language directly reflects the brand's values: honest, human, built to last.

| Principle | Expression |
|-----------|-----------|
| **Useful first** | No decoration for decoration's sake. Every visual element earns its place. |
| **Warm, not cold** | Parchment cream palette instead of cold dark. Feels handcrafted, not corporate. |
| **Editorial confidence** | Large display type, generous whitespace, unhurried rhythm. |
| **Subtle atmosphere** | Grain texture, radial glow, faint watermarks — present but never loud. |
| **Respect motion** | Animations are purposeful and respect `prefers-reduced-motion`. |

---

## Color System

Colors are defined as CSS custom properties on `:root` and overridden under `[data-theme="dark"]`.

### Light Theme (default)

```css
--color-bg:          #faf7f2;   /* Warm parchment — main background */
--color-bg-alt:      #f3ede4;   /* Slightly deeper — section alternation */
--color-bg-card:     #ede5d8;   /* Card / elevated surface */
--color-ink:         #0f0d0a;   /* Near-black warm ink — primary text */
--color-ink-muted:   #6b5f52;   /* Warm mid-tone — secondary text, nav links */
--color-ink-faint:   #b5a899;   /* Subtle — labels, metadata, divider text */
--color-accent:      #bf4e1a;   /* Terracotta — CTAs, highlights, active states */
--color-accent-warm: #e87a3f;   /* Lighter terracotta — hover/glow states */
--color-rule:        #ddd4c7;   /* Warm divider lines, borders */
```

### Dark Theme

```css
--color-bg:          #100e0b;   /* Warm near-black */
--color-bg-alt:      #181410;   /* Slightly lighter warm black */
--color-bg-card:     #211c16;   /* Card surface */
--color-ink:         #f0ebe3;   /* Warm off-white */
--color-ink-muted:   #9e8e7c;   /* Warm mid-tone */
--color-ink-faint:   #5a4f44;   /* Subtle — labels, metadata */
--color-accent:      #e8703a;   /* Brighter terracotta (more contrast on dark bg) */
--color-accent-warm: #f09060;   /* Hover/glow */
--color-rule:        #2a2320;   /* Warm divider */
```

### Usage Rules

- **Never** use raw hex values in components — always reference a CSS variable.
- `--color-bg` and `--color-bg-alt` alternate between sections to create rhythm without hard borders.
- `--color-accent` is reserved for: active states, CTAs, section labels, hover highlights, and the hero headline.
- `--color-ink-faint` is for: DM Mono labels, monospace metadata, copyright text, footer links.

---

## Typography

Three typefaces, each with a distinct role.

### Typefaces

| Face | Role | Source |
|------|------|--------|
| **Fraunces** | Display — headlines, section titles, footer CTA, mobile nav | Google Fonts (variable) |
| **Syne** | Body / UI — body text, nav links, philosophy titles, product descriptions | Google Fonts |
| **DM Mono** | Monospace — labels, badges, numbers, eyebrow text, metadata | Google Fonts |

### Font Import

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Syne:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### CSS Variables

```css
--font-display: 'Fraunces', Georgia, serif;
--font-body:    'Syne', system-ui, sans-serif;
--font-mono:    'DM Mono', 'Courier New', monospace;
```

### Fraunces Variable Axis

Fraunces is a variable font with an optical size axis (`opsz`). Use `font-variation-settings` to tune it:

| Context | `opsz` value | Weight |
|---------|-------------|--------|
| Hero headline | `72` | `800` |
| Section titles | `32` | `700` |
| Product names | `28` | `700` |
| Footer email CTA | `36` | `700` |
| Mobile nav links | `36` | `700` |
| Hero wordmark (DP) | `144` | `900` |

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| Hero | `clamp(3.25rem, 9vw, 7.5rem)` | Hero `<h1>` |
| Section title | `clamp(1.75rem, 4vw, 3rem)` | `<h2>` section headings |
| Product name | `clamp(1.875rem, 3.5vw, 2.625rem)` | Product card `<h3>` |
| Footer email | `clamp(1.5rem, 4.5vw, 3.25rem)` | Footer CTA link |
| Body | `1rem` | Paragraphs, descriptions |
| Nav / UI | `0.875rem` | Navigation links |
| Label / eyebrow | `0.6875rem` | DM Mono uppercase labels |
| Badge / status | `0.5625rem` | Coming Soon pill |

### Typography Rules

- **Fraunces** is for *moments* — headlines, big statements, the footer email. Not for body text.
- **Syne** handles all readable body copy and navigation.
- **DM Mono** is for numbers, labels, metadata. Always uppercase with `letter-spacing: 0.1em+`.
- Letter-spacing on display type: `-0.025em` to `-0.03em` (tighter = more editorial).
- Line-height on body: `1.65–1.8`. On display: `1.02–1.2`.

---

## Spacing Scale

Based on a `0.25rem` (4px) base unit.

```css
--sp-1:  0.25rem;   /*  4px */
--sp-2:  0.5rem;    /*  8px */
--sp-3:  0.75rem;   /* 12px */
--sp-4:  1rem;      /* 16px */
--sp-5:  1.25rem;   /* 20px */
--sp-6:  1.5rem;    /* 24px */
--sp-8:  2rem;      /* 32px */
--sp-10: 2.5rem;    /* 40px */
--sp-12: 3rem;      /* 48px */
--sp-16: 4rem;      /* 64px */
--sp-20: 5rem;      /* 80px */
--sp-24: 6rem;      /* 96px */
--sp-32: 8rem;      /* 128px */
```

Section vertical padding uses `clamp(60px, 8vw, 100px)` for fluid rhythm across viewports.

---

## Layout

### Containers

```css
--container-max:    1160px;   /* Main content container */
--container-narrow: 860px;    /* Legal pages, prose content */
```

Usage: `.container` class centers content with `padding: 0 var(--sp-8)`.

### Page Sections

| Section | Background | Top border |
|---------|-----------|------------|
| Hero | `--color-bg` + radial glow + grain | — |
| Products | `--color-bg-alt` | `1px solid --color-rule` |
| Philosophy | `--color-bg` | `1px solid --color-rule` |
| Footer | `--color-bg-alt` | `1px solid --color-rule` |

Sections alternate between `--color-bg` and `--color-bg-alt` to create visual rhythm.

### Grid — Products

Two-column grid at full width, collapses to single column at `1024px`:

```css
.product-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-6);
    align-items: start;
}
```

### Breakpoints

| Breakpoint | Change |
|-----------|--------|
| `≤ 1024px` | Product grid → single column |
| `≤ 768px` | Desktop nav hidden → hamburger menu; footer grid collapses |
| `≤ 480px` | Reduce horizontal padding; hero pills hidden; wordmark scaled down |

---

## Motion & Animation

### Timing Tokens

```css
--ease-out:   cubic-bezier(0.16, 1, 0.3, 1);   /* Snappy deceleration — reveals */
--ease-inout: cubic-bezier(0.4, 0, 0.2, 1);    /* Smooth — theme transitions, header */
--dur-fast:   140ms;   /* Hover color changes */
--dur-base:   270ms;   /* Accordion, nav transitions */
--dur-slow:   500ms;   /* Theme switch, section backgrounds */
```

### Page Load Sequence

Elements stagger in with `fadeUp` (opacity 0 → 1, translateY 32px → 0):

| Element | Delay |
|---------|-------|
| Hero eyebrow | 100ms |
| Hero line 1 ("We build") | 200ms |
| Hero line 2 ("software.") | 350ms |
| Hero subtitle | 550ms |
| Scroll indicator | 1100ms |
| Hero product pills | 1300ms |

### Scroll Reveal

Sections and cards carry a `.reveal` class. An `IntersectionObserver` adds `.is-visible` when they enter the viewport, triggering:

```css
opacity: 0 → 1
transform: translateY(28px) → translateY(0)
duration: 700ms, var(--ease-out)
```

### Keyframe Animations

| Name | Description | Used on |
|------|-------------|---------|
| `fadeUp` | Opacity + vertical drift | Hero text, eyebrow |
| `fadeIn` | Opacity only | Scroll indicator, hero pills |
| `scrollLine` | Accent line sweeps right | Hero scroll indicator |
| `grain` | Translates noise texture in steps | Hero background overlay |

### Interaction Patterns

| Element | Hover behaviour |
|---------|----------------|
| Product card | Left-border slides in (scaleY 0→1), border turns accent, name turns accent |
| Footer email | Underline draws in from left, arrow translates right |
| Social links | `translateY(-2px)`, accent color |
| Philosophy items | Title + number turn ink-color; watermark number increases opacity |
| Nav CTA | Background fills with `--color-ink`, text inverts |
| Theme toggle | Background tint on hover |

---

## Components

### Header / Navigation

- Fixed, full-width. Transparent until scrolled > 80px.
- Scrolled state: `backdrop-filter: blur(20px)` + warm background at 94% opacity + bottom rule.
- Contains: logo (left), nav links + theme toggle + hamburger (right, grouped in `.nav-right`).
- Mobile: nav links hidden, hamburger shown. Mobile menu is a full-screen overlay with Fraunces navigation links + theme toggle.

### Theme Toggle

- Moon/sun icon button (`#themeToggle`), positioned in `.nav-right`.
- Mirrored in mobile menu (`#mobileThemeToggle`) with a text label ("Dark mode" / "Light mode").
- Logic in `initTheme()`: reads `localStorage('dp-theme')`, falls back to `prefers-color-scheme`.
- Sets/removes `data-theme="dark"` on `<html>`.

### Hero

- Full viewport (`100svh`), flex column, content centered vertically.
- Background: `radial-gradient` warm glow (top-center) + animated grain texture (`::before` pseudo-element using inline SVG).
- Contains: eyebrow label, `<h1>` with two `.hero-line` spans, subtitle paragraph.
- Decorative elements: `.hero-wordmark` (faint "DP" background text), `.hero-products` (floating pill badges, bottom-right).
- Scroll indicator bottom-left: DM Mono "SCROLL" label + animated accent line.

### Product Cards

- `.product-card` is an `<a>` tag (the whole card is a link).
- `::before` pseudo-element creates the left-border reveal on hover (`scaleY` transform).
- Structure inside: monospace number → icon wrap → product name + status badge → description.

### Philosophy Accordion

- `.philosophy-item` elements use `data-number="01"` attribute for the CSS `::before` watermark.
- Expand/collapse via `.active` class toggling `max-height` on `.philosophy-content`.
- One item open at a time (others close when a new one opens).
- Keyboard accessible: `tabindex="0"`, Enter/Space to toggle, Escape to close.
- Chevron icon rotates 180° when active.

### Footer

- Two-row layout: `.footer-main` (grid: CTA left, social right) + `.footer-bottom` (copyright + links).
- Footer email uses Fraunces display type, underline-draw on hover.
- `.footer-main` collapses to single column at `≤ 768px`.

---

## Dark Mode

Theme switching is driven entirely by the `[data-theme="dark"]` attribute on `<html>`. All colors are CSS variables, so the switch is instantaneous and smooth via `transition` on `body`.

**Initialization order:**
1. `localStorage.getItem('dp-theme')` — use saved preference if exists
2. `window.matchMedia('(prefers-color-scheme: dark)').matches` — respect OS preference on first visit
3. Default to light theme

**Persistence:** `localStorage` key `dp-theme` stores `"light"` or `"dark"`.

**Toggling:** `applyTheme()` sets or removes `data-theme="dark"` on `document.documentElement`.

---

## Accessibility

| Feature | Implementation |
|---------|---------------|
| Keyboard nav | All interactive elements reachable via Tab |
| Focus style | `outline: 2px solid var(--color-accent); outline-offset: 3px` |
| ARIA labels | All icon-only buttons have `aria-label` |
| Accordion | `tabindex="0"`, Enter/Space/Escape support |
| Mobile menu | `role="dialog"`, `aria-modal="true"`, `aria-expanded` on trigger |
| Motion | `prefers-reduced-motion`: all animations disabled, scroll-reveal skipped |
| Semantics | `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<h1>`–`<h3>` in correct hierarchy |
| Decorative text | Hero wordmark has `aria-hidden="true"` |
| Selection | Custom `::selection` uses accent color at low opacity, maintains readable contrast |

---

## File Structure

```
dot_portal_firm_website/
├── index.html                  # Main single-page site
├── privacy-policy.html         # Legal page
├── terms-of-service.html       # Legal page
├── assets/
│   ├── css/
│   │   └── style.css           # All styles — design tokens, components, responsive
│   └── js/
│       └── script.js           # Theme toggle, scroll reveal, accordion, mobile nav
├── images/
│   ├── logo.png
│   └── favicon/                # Full favicon set (PWA-ready)
└── docs/
    └── design-system.md        # This file
```

### CSS Architecture

`style.css` is organized in sections, in order:

1. Design tokens (`:root` variables)
2. Dark theme overrides (`[data-theme="dark"]`)
3. Reset
4. Layout utilities (`.container`)
5. Header & navigation
6. Hero section
7. Scroll reveal utility
8. Section common styles (`.section-label`, `.section-title`)
9. Products section
10. Philosophy section
11. Footer section
12. Mobile menu
13. Responsive breakpoints
14. Legal page styles (`.page-wrap`)
15. Focus, selection, reduced-motion
16. Enhancement additions (hero wordmark, pills, polish)

### JavaScript Architecture

`script.js` is organized as a single `init()` function calling six sub-functions:

| Function | Responsibility |
|----------|---------------|
| `initTheme()` | Theme toggle, localStorage persistence, OS preference |
| `initHeader()` | Scroll-triggered header state |
| `initMobileNav()` | Hamburger menu, overlay, close on link/Escape |
| `initPhilosophy()` | Accordion expand/collapse, keyboard support |
| `initSmoothScroll()` | Anchor link smooth scrolling with header offset |
| `initScrollReveal()` | IntersectionObserver for `.reveal` elements |
