# NEXORA — Landing Page

> **CODSOFT Web Development Internship**
> Level 1 — Task 2: Landing Page

---

## Project Overview

This project is a fully responsive, modern landing page built for the **CODSOFT Web Development Internship (Level 1, Task 2)**. The task requires creating a landing page using HTML and CSS that demonstrates understanding of layout, alignment, spacing, color palettes, and responsive design.

**NEXORA** is a fictional technology platform brand created specifically for this demonstration. It does not represent a real company or product.

---

## Purpose

This project demonstrates proficiency in:

- Semantic **HTML5** structure
- Modern **CSS3** layout techniques (Flexbox, CSS Grid)
- **Responsive design** across all viewport sizes (320px to 1920px+)
- CSS custom properties (variables) for a consistent design system
- Strong **typography hierarchy** and spacing
- Visual hierarchy with cards, sections, and columns
- **Responsive navigation** with hamburger menu
- Basic **JavaScript** interaction (accordion, mobile nav, scroll effects)
- **Accessibility** considerations (ARIA, keyboard navigation, focus states)
- Clean, maintainable code organization

---

## Features

| Feature | Description |
|---|---|
| **Sticky Header** | Fixed navigation with blur backdrop, nav links, and mobile hamburger |
| **Hero Section** | High-impact hero with eyebrow text, heading with gradient accent, CTAs, and custom product visualization |
| **Product Visualization** | Custom HTML/CSS/SVG dashboard mockup with metrics, chart, activity feed, and node graph |
| **Statistics Strip** | 4-column trust/stats section with animated counters |
| **Feature Cards** | 6 feature cards with inline SVG icons and hover effects |
| **Solutions Section** | Split layout with Kanban-style dashboard visualization and numbered process steps |
| **Process Timeline** | 4-step horizontal timeline (desktop) → vertical timeline (mobile) |
| **Highlight CTA** | Mid-page call-to-action with CSS grid-line and radial glow background |
| **Testimonials** | 3 testimonial cards with fictional quotes and avatar initials |
| **FAQ Accordion** | 5 accessible accordion items with smooth open/close, one-at-a-time behavior |
| **Final CTA** | Closing call-to-action section with dual buttons |
| **Footer** | 4-column footer with brand info, navigation columns, social icons, and copyright |
| **Scroll Reveal** | Fade-up animations triggered on scroll with staggered delays |
| **Reduced Motion** | Full `prefers-reduced-motion` support to disable animations |
| **Responsive Design** | Fully responsive from 320px to 1920px+ |

---

## Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Styling, layout, animations, responsive design |
| **Vanilla JavaScript** | Mobile navigation, FAQ accordion, scroll reveal, active nav |
| **SVG** | Inline icons, logos, and product visualization elements |

No external frameworks, libraries, or build tools are used.

---

## Project Structure

```
Task-2-Landing-Page/
├── index.html          # Main HTML page
├── style.css           # Complete stylesheet
├── script.js           # JavaScript interactions
├── README.md           # This documentation
└── assets/
    ├── images/         # (Reserved for future image assets)
    └── icons/          # (Reserved for future icon assets)
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#050816` | Page background |
| `--surface` | `#0B1224` | Card/section backgrounds |
| `--surface-2` | `#101A30` | Elevated surfaces |
| `--primary` | `#4F7CFF` | Primary accent (blue) |
| `--primary-bright` | `#6EA8FF` | Hover/highlight blue |
| `--cyan` | `#22D3EE` | Secondary accent |
| `--text` | `#F8FAFC` | Primary text |
| `--text-secondary` | `#CBD5E1` | Secondary text |
| `--muted` | `#94A3B8` | Muted/caption text |
| `--border` | `rgba(148,163,184,0.12)` | Subtle borders |

### Typography

- **Font Family:** Inter (Google Fonts), with system-ui fallback stack
- **Heading Sizes:** Fluid scaling with `clamp()` (e.g., `clamp(2rem, 5.5vw, 3.5rem)`)
- **Body Text:** 0.875rem–1.125rem depending on context
- **Font Weights:** 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Spacing

CSS custom properties define a consistent spacing scale:
- `--space-xs` (0.25rem) through `--space-5xl` (8rem)

### Border Radius

- `--radius-sm` (6px) for small elements
- `--radius-md` (10px) for cards
- `--radius-lg` (16px) for larger cards
- `--radius-full` (9999px) for pills/badges

### Responsive Strategy

Mobile-first approach with progressive enhancement for larger screens. Layouts adapt through CSS Grid and Flexbox reflows rather than simple scaling.

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| **≤ 375px** | Extra small mobile — single column everywhere, simplified dashboard |
| **≤ 640px** | Mobile — stacked layouts, vertical timeline, full-width buttons, hamburger nav |
| **≤ 820px** | Tablet — 2-column grids, simplified footer layout |
| **≤ 1024px** | Large tablet — hero stacks, hamburger nav activates, 2-col features |
| **> 1024px** | Desktop — full multi-column layouts, horizontal timeline, all nav visible |

---

## Accessibility

| Area | Implementation |
|---|---|
| **Semantic HTML** | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<blockquote>` |
| **Heading Hierarchy** | Single `<h1>` (hero), `<h2>` for sections, `<h3>` for subsections |
| **Keyboard Navigation** | All interactive elements (links, buttons) are keyboard accessible |
| **Focus States** | Custom `:focus-visible` outlines on all interactive elements |
| **ARIA Attributes** | `aria-expanded`, `aria-controls`, `aria-hidden`, `aria-label` on hamburger and FAQ |
| **Alt Text** | Decorative SVGs marked `aria-hidden="true"`, meaningful labels where needed |
| **Color Contrast** | Text colors meet WCAG contrast requirements against dark backgrounds |
| **Reduced Motion** | `@media (prefers-reduced-motion: reduce)` disables all animations |
| **Screen Reader** | `.sr-only` utility class available for screen-reader-only content |

---

## JavaScript Functionality

### Mobile Navigation
- Hamburger button toggles mobile menu overlay
- Updates `aria-expanded` and `aria-hidden` attributes
- Closes on link click, CTA click, Escape key, or window resize past breakpoint
- Prevents body scrolling while open

### FAQ Accordion
- Click toggles individual FAQ items open/closed
- Only one item open at a time (closes others automatically)
- Smooth CSS `max-height` transition for open/close
- Updates `aria-expanded` on each toggle

### Scroll Reveal
- Elements with `[data-reveal]` attribute fade up when scrolled into view
- `data-reveal-delay` attribute adds staggered timing
- Uses `requestAnimationFrame` throttling for performance
- Triggers at 88% of viewport height

### Active Navigation
- Desktop nav links highlight based on current scroll position
- Uses throttled scroll listener with `requestAnimationFrame`

### Header Opacity
- Header background opacity increases on scroll for better readability

---

## Testing Checklist

### Viewport Testing

- [ ] **320px** — All content visible, single column, no overflow
- [ ] **375px** — Mobile layout, hamburger nav, stacked cards
- [ ] **390px** — Similar to 375px, consistent spacing
- [ ] **430px** — Larger mobile, no unexpected gaps
- [ ] **768px** — Tablet layout, 2-column grids appear
- [ ] **820px** — Tablet, footer and stats adapt
- [ ] **1024px** — Desktop nav appears, multi-column layouts
- [ ] **1280px** — Full desktop experience
- [ ] **1440px** — Generous whitespace, contained max-width
- [ ] **1920px** — Centered content, no stretching

### Functionality

- [ ] No horizontal scrolling at any viewport
- [ ] No overlapping elements
- [ ] Desktop navigation links work (smooth scroll)
- [ ] Mobile hamburger opens and closes
- [ ] Mobile menu links navigate and close menu
- [ ] Escape key closes mobile menu
- [ ] FAQ accordion opens/closes items
- [ ] Only one FAQ open at a time
- [ ] All buttons have hover and focus states
- [ ] Keyboard navigation works throughout
- [ ] Console has no JavaScript errors
- [ ] Page loads correctly with no missing assets
- [ ] No broken or fake external links
- [ ] Scroll reveal animations work
- [ ] `prefers-reduced-motion` disables animations

---

## How to Run

1. Navigate to the `Task-2-Landing-Page/` directory
2. Open `index.html` in a web browser

### Using VS Code Live Server:
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. The page will open in your default browser with live reload

### Using Python HTTP Server:
```bash
cd Task-2-Landing-Page
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Using Node.js:
```bash
npx serve .
```

---

## CODSOFT Task

**Program:** CODSOFT Web Development Internship
**Level:** 1
**Task:** 2 — Landing Page
**Status:** Complete

---

*This is a demonstration project. NEXORA is a fictional brand created for educational purposes. All testimonials, statistics, and company references are fictional.*
