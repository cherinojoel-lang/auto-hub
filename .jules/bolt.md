## $(date +%Y-%m-%d) - Array processing chains

**Learning:** When performing multiple filtering operations on large datasets (like `vehicles`), chaining multiple `.filter()` methods forces the JavaScript engine to traverse the array multiple times, creating and discarding a new array on each iteration. This changes complexity from an efficient $O(N)$ single pass to an inefficient $O(N * K)$ and puts unnecessary strain on memory due to intermediate allocations.

**Action:** Whenever multiple array filtering conditions are needed, combine them using logical AND (`&&`) within a single `.filter()` call to evaluate all conditions in one pass and benefit from early short-circuit evaluation.
