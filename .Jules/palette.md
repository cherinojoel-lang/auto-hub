## 2024-05-24 - Mobile Menu Accessibility
**Learning:** Added dynamic aria-label and aria-expanded/aria-controls properties to a mobile menu toggle icon button. The toggle button needs `aria-expanded` and `aria-controls` linked to the ID of the navigation menu container for optimal screen reader behavior.
**Action:** Always link interactive toggle buttons to the content they control using `aria-controls` and sync their state with `aria-expanded`.
