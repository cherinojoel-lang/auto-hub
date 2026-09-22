## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-05-31 - Dynamic Form Validation Accessibility
**Learning:** When using custom form validation, error messages appear dynamically. Screen readers won't announce these unless they are linked to the input via `aria-describedby`, marked with `aria-invalid="true"`, and given a `role="alert"`. Global success/error messages should use `role="status"` with `aria-live="polite"` (or `assertive` for critical errors) to ensure they are read when they mount.
**Action:** Always link input validation errors using `aria-describedby` and `aria-invalid`, and ensure dynamic status messages have appropriate ARIA live regions.
