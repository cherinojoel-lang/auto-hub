## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2026-09-30 - Form Accessibility Pattern in AutoHub
**Learning:** Found a specific pattern in the application's forms (e.g., `ContactSection.tsx`) where inline error messages were rendered conditionally without explicit ARIA linkage (`aria-describedby`) or semantic roles.
**Action:** Always link conditionally rendered error elements to their inputs via `id` and `aria-describedby`, set `aria-invalid={!!hasError}` on the input, and ensure the error text has `role="alert"`.
## 2026-09-30 - CI Failure: Invalid Windows Symlink
**Learning:** Found an invalid symlink (`run_all_phases.`) ending with a dot that was causing the `actions/checkout` step to fail on Windows GitHub Actions runners with exit code 128 (invalid path).
**Action:** Remove the invalid symlink (`git rm`) as it is unsupported on Windows and breaks CI workflows.
