## 2024-07-04 - ARIA Controls on Conditionally Rendered Menus
**Learning:** `aria-controls` should point to a valid ID. When mobile menus or other expanding elements are unmounted from the DOM rather than visually hidden (e.g., using React conditional rendering `&&`), dynamically conditionally applying `aria-controls` prevents pointing to non-existent DOM nodes. If an element is hidden using CSS instead (e.g., in `StickyHeader.tsx`), then statically applying `aria-controls` is safe.
**Action:** Always check if the target component is removed from the DOM before assigning static `aria-controls` values.

## 2024-07-04 - Input maxLength limits
**Learning:** The text inputs across multiple forms lack `maxLength` limits which can lead to layout breaking, unnecessarily large strings parsed, and a poor UX if users paste very long text by mistake.
**Action:** Always enforce a sensible `maxLength` for inputs like names, emails, and phone numbers.
## 2024-07-04 - Input maxLength limits
**Learning:** The text inputs across multiple forms lack `maxLength` limits which can lead to layout breaking, unnecessarily large strings parsed, and a poor UX if users paste very long text by mistake.
**Action:** Always enforce a sensible `maxLength` for inputs like names, emails, and phone numbers.
