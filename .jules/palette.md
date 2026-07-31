## 2024-05-28 - Invalid HTML Button Nesting in Links
**Learning:** Avoid nesting `<button>` elements inside `<Link>` or `<a>` tags (e.g., found in VehicleInventorySection.tsx). This produces invalid HTML and severe accessibility issues for screen readers.
**Action:** Use `<span>` or `<div>` with appropriate styling classes instead to preserve the visual appearance of a button without the invalid semantic nesting.
## 2024-05-31 - Mobile Menu Toggle Accessibility
**Learning:** The application uses two different patterns for hiding/showing mobile menus: `Header.tsx` conditionally unmounts the `<nav>` node entirely, while `StickyHeader.tsx` keeps the menu in the DOM but hides it using CSS transform classes (`translate-x-full`). This requires different strategies for the `aria-controls` attribute on the toggle buttons to prevent screen readers from pointing to non-existent nodes when unmounted.
**Action:** When adding accessibility features to toggle buttons, always verify if the target container is hidden via CSS or conditionally unmounted, and set `aria-controls` to `undefined` dynamically when the target is removed from the DOM.
## 2024-05-31 - Range Slider Accessibility in Dual-Input Components
**Action:** Always explicitly define an `aria-label` for the secondary supplementary input (the range slider) when it shares a visual label with another primary input, and explicitly link the visual label to the primary input using `htmlFor` and `id`.
## 2024-05-31 - Range Slider Accessibility in Dual-Input Components
**Learning:** When an interface pairs a primary number input with a supplementary range slider (e.g., in `FinancingCalculatorSection.tsx`), standard `<label>` element association via `htmlFor` only connects to the first input. The range slider remains implicitly unlabeled to screen readers.
**Action:** Always explicitly define an `aria-label` for the secondary supplementary input (the range slider) when it shares a visual label with another primary input, and explicitly link the visual label to the primary input using `htmlFor` and `id`.
