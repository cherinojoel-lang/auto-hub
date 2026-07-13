## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2026-07-13 - Textarea Character Counters and DoS Prevention
**Learning:** Large textareas in public forms without a `maxLength` can lead to buffer issues or client-side DoS vulnerabilities. Adding a hard limit should always be paired with a visual character counter so users know their limit before typing.
**Action:** Always include `maxLength` on form textareas (like in ContactPage), and ensure accessibility by linking the visual counter with `aria-describedby` and `aria-live="polite"` so screen readers read the limits and updates correctly.
