## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-07-01 - Missing ARIA Labels on Gallery Thumbnails and State Toggles
**Learning:** Image gallery thumbnail buttons without text content must have `aria-label`s (e.g., "Galeriebild 1 anzeigen") so screen readers don't just announce "button". Filter toggle buttons that control a section's visibility need `aria-expanded` and `aria-controls` linked to the section's ID.
**Action:** When adding functional interactive buttons (especially image thumbnails or collapsible menus) without visible text, always include descriptive `aria-label`s and state management attributes (`aria-expanded`, `aria-controls`).
