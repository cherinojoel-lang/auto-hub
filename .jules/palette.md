## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.

## 2024-05-29 - Contextual Accessibility Bindings
**Learning:** The application uses a mix of conditional rendering (unmounting nodes, e.g., in Header.tsx) and CSS classes (e.g., translate-x-full) to hide/show content (e.g., in StickyHeader.tsx). For accessibility toggle buttons, dynamically apply aria-controls (or set to undefined) when nodes unmount, and use static assignment when elements are hidden via CSS but remain in the DOM.
**Action:** Always verify the DOM rendering behavior of target elements before assigning aria-controls to ensure they do not point to non-existent nodes, causing validation issues for screen readers.
