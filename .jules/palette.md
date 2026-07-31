## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.

## 2026-06-17 - Supplementary Inputs Accessibility
**Learning:** When using supplementary inputs that share a visual label (like a range slider paired with a number input for the same value), screen readers may fail to announce the slider's purpose if it only relies on the visual layout. The HTML `<label>` tag is typically associated with only one of the inputs (usually the primary number input) via the `htmlFor` attribute.
**Action:** Always provide explicit `aria-label` attributes on supplementary inputs (like `type="range"`) to ensure full screen reader support, even if a visual label exists for the primary input field.
