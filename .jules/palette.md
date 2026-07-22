## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2025-02-28 - Accessible Character Limits
**Learning:** Adding `maxLength` attributes to form fields restricts excessive input, protecting against client-side buffer risks while improving usability. Long limits (like 2000 chars for textareas) need visual counters for the user. These counters must be linked to the textarea via `aria-describedby` and utilize `aria-live="polite"` so screen readers appropriately announce character progress.
**Action:** Always add `maxLength` properties to user text inputs. Pair large textareas with a dynamic counter and ensure they are connected and announced semantically.
