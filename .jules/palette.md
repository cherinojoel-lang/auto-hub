## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.

## 2024-07-12 - Range Input Keyboard Accessibility and Screen Readers
**Learning:** Supplementary range inputs that share a visual label with number inputs are often overlooked for accessibility. Screen readers require explicit `aria-label`s, and keyboard users require clear `focus-visible` styles as native focus rings are often stripped out by custom range styling like `appearance-none`.
**Action:** Always provide explicit `aria-label`s and `focus-visible` utility classes to supplementary inputs. Use `id` and `htmlFor` pairings for primary inputs.
