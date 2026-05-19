## 2024-05-19 - Localized Mobile Menu Accessibility
**Learning:** Hardcoded English `aria-label`s on core interactive elements (like mobile menu toggles) are often overlooked in localized applications. Additionally, screen readers need to know the state of the menu and the relationship to the navigation element via `aria-expanded` and `aria-controls`.
**Action:** Always ensure UI string literals in `aria-` attributes match the application's primary language. Link interactive toggles to their controlled regions using `aria-controls` and manage `aria-expanded` dynamically based on state.
