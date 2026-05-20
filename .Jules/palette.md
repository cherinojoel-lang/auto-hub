## 2024-05-20 - Dynamic Accessibility for Stateful Toggle Buttons
**Learning:** Hardcoded ARIA labels like 'Toggle menu' are insufficient for stateful UI elements. They fail to convey the current state and are often not localized properly.
**Action:** Always use dynamic `aria-label` attributes that update based on component state (e.g., 'Open menu' vs 'Close menu'), pair them with `aria-expanded`, and link them to the controlled element via `aria-controls` to ensure screen readers can announce state changes correctly.
