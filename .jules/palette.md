## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-09-17 - Accessible Custom Form Validation
**Learning:** Custom form validation messages must be explicitly linked to their corresponding inputs using `aria-describedby` and marked with `aria-invalid="true"`. Dynamically appearing status or success messages need `aria-live="polite"` to ensure reliable screen reader announcements.
**Action:** When implementing custom form validation, always link dynamic error messages to inputs using `aria-describedby` (matching the error element's `id`), mark the input with `aria-invalid="true"`, and assign `role="alert"` to the error element. Use `aria-live="polite"` for dynamic success/status messages.
