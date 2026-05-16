🧪 Add tests for utils cn function

🎯 **What:**
Added comprehensive unit tests for the `cn` utility function in `src/lib/utils.ts`.

📊 **Coverage:**
The new tests cover the following scenarios:
* Basic class name merging.
* Handling conditional classes (e.g., `true && 'class'`).
* Resolving conflicting Tailwind classes (verifying `tailwind-merge` functionality).
* Handling arrays and objects (verifying `clsx` functionality).
* Properly ignoring falsy values (`null`, `undefined`, `0`, `false`, `""`).
* Complex combinations of all the above.

✨ **Result:**
Improved test coverage and ensures the reliable functioning of the `cn` utility for combining classes used across the project components.
