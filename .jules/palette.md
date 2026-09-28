## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2026-09-28 - Accessible Form Validation Errors
**Learning:** Custom form validation messages must explicitly link to their input fields for screen readers using `aria-describedby` (pointing to the error element's `id`), setting `aria-invalid="true"`, and assigning `role="alert"` to the error element. Failing to do so causes screen readers to skip dynamic validation errors.
**Action:** When adding or updating custom forms with dynamic errors (like in `ContactSection.tsx`), always include these ARIA attributes to ensure users with assistive technologies are properly notified of invalid fields.
