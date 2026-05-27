# Automobile Quick - Design Tokens & Standards

## Color Palette

### Primary Colors
- **--color-primary**: `#0A1628` (Navy) - Main brand color for headings and structure
- **--color-accent**: `#213A5C` (Secondary Dark Blue) - Hero sections and emphasis
- **--color-secondary**: `#FF6B00` (CTA Orange) - Primary actions only

### Semantic Colors
- **--color-success**: `#27AE60` (Green) - Success states, confirmations
- **--color-warning**: `#F39C12` (Amber) - Warnings, alerts
- **--color-neutral-100**: `#F5F5F5` (Light Gray) - Page backgrounds
- **--color-neutral-900**: `#1A1A1A` (Near Black) - Main text

### Neutral Colors
- **background**: `#FFFFFF` (White) - Card backgrounds
- **foreground**: `#1A1A1A` (Near Black) - Text content
- **border**: `#D8DEE8` - Subtle borders

## Typography

### Font Family
- **--font-base**: `Aptos`, `Segoe UI`, `Helvetica Neue`, Arial, sans-serif
- **font-heading**: `Aptos Display`, `Segoe UI`, `Helvetica Neue`, Arial, sans-serif
- **font-paragraph**: `Aptos`, `Segoe UI`, `Helvetica Neue`, Arial, sans-serif

### Font Sizes (Tailwind)
- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px) - Bold
- `2xl`: 1.5rem (24px) - Bold
- `3xl`: 1.875rem (30px) - Bold
- `4xl`: 2.25rem (36px) - Bold
- `5xl`: 3rem (48px) - Bold
- `6xl`: 3.75rem (60px) - Bold

## Spacing & Layout

### Container
- **max-width**: `100rem` (1600px) - Default content max-width
- **padding**: `1rem` (16px) - Standard horizontal padding on mobile
- **gap**: `1.5rem` (24px) - Standard grid/flex gap

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Component Standards

### Buttons
- **height**: `3rem` (48px) - Standard button height
- **border-radius**: `0.5rem` (8px)
- **padding**: `0.75rem 1.5rem` (12px 24px)
- **font-weight**: `700` (Bold)

### Cards
- **border-radius**: `0.5rem` (8px)
- **padding**: `1.5rem` (24px)
- **box-shadow**: none by default; use borders and spacing for premium structure
- **border**: `1px solid rgba(26, 43, 76, 0.1)`

### Touch Targets (Mobile)
- **minimum size**: `48x48px` - All interactive elements
- **spacing**: `0.5rem` (8px) - Between touch targets

## Mobile UX

### Vehicle Cards
- **Mobile**: 1 column
- **Tablet (md)**: 2 columns
- **Desktop (lg)**: 3 columns
- **Large Desktop (xl)**: 4 columns

### Sticky CTA Bar (Vehicle Detail)
- **Position**: Fixed bottom on mobile
- **Height**: `4rem` (64px)
- **Actions**: "Anrufen" | "Besichtigung anfragen"
- **Breakpoint**: Hidden on desktop (md and above)

## SEO Structure

### H1 Tags (One per page)
- **Homepage**: "Ihr Autohaus in Iserlohn-Letmathe"
- **Fahrzeugbestand**: "Aktuelle Gebrauchtwagen in Iserlohn-Letmathe"
- **Autoankauf**: "Auto verkaufen in Iserlohn"
- **Finanzierung**: "Gebrauchtwagen-Finanzierung in Iserlohn-Letmathe"
- **Über uns**: "Über uns"
- **Kontakt**: "Kontakt & Anfahrt"
- **Impressum**: "Impressum"
- **Datenschutz**: "Datenschutz"

## Navigation Structure

### Main Navigation
1. Start (/)
2. Fahrzeugbestand (/fahrzeugbestand)
3. Autoankauf (/autoankauf)
4. Finanzierung (/finanzierung)
5. Über uns (/ueber-uns)
6. Kontakt & Anfahrt (/kontakt)

### Footer Links
- Start
- Fahrzeugbestand
- Autoankauf
- Finanzierung
- Über uns
- Kontakt & Anfahrt
- Impressum
- Datenschutz

## Accessibility Standards

### Color Contrast
- **WCAG AA**: Minimum 4.5:1 for text
- **WCAG AAA**: Minimum 7:1 for text
- All buttons and interactive elements meet WCAG AA standards

### Touch Targets
- Minimum 48x48px for all interactive elements
- 8px spacing between touch targets

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus states are clearly visible
- Tab order is logical

## Brand Guidelines

### Company Name
- **Official**: Automobile Quick
- **Location**: Iserlohn-Letmathe
- **Address**: Hagener Str. 126a, 58642 Iserlohn
- **Phone**: +49 (0) 2374 / 912912
- **Email**: auto-quick@t-online.de

### Removed Branding
- ✓ Reinhardt (removed)
- ✓ reinhardtautomobile (removed)
- ✓ AutoHub (removed)
- ✓ autohubs (removed)

### Removed Features
- ✓ Shop (removed)
- ✓ Cart (removed)
- ✓ Checkout (removed)
- ✓ Login (removed)
- ✓ Registration (removed)
- ✓ Members Area (removed)
- ✓ Blog (removed)
- ✓ Events (removed)
- ✓ AGB (removed)

## Implementation Notes

### Tailwind Configuration
All design tokens are implemented in `/src/tailwind.config.mjs`:
- Colors use kebab-case (e.g., `text-neutral-100`)
- Responsive prefixes (e.g., `md:text-2xl`)
- Custom font families defined in `extend.fontFamily`

### CSS Custom Properties
For advanced styling, CSS custom properties can be used:
```css
:root {
  --color-primary: #1A2B4C;
  --color-accent: #1A2B4C;
  --color-secondary: #E8421A;
  --color-success: #27AE60;
  --color-warning: #F39C12;
  --color-neutral-100: #F8F9FA;
  --color-neutral-900: #1A1A1A;
  --font-base: 'Source Sans 3', system-ui, sans-serif;
}
```

## Last Updated
May 16, 2026
