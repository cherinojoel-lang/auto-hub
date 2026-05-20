## 2026-05-18 - Improve Array Filtering
**Learning:** Sequential calls to `Array.prototype.filter()` create intermediate arrays, slowing down processing of large lists like `vehiclesData`.
**Action:** Combined multiple filtering conditions into a single `filter()` pass with early exits. Also removed unnecessary `setTimeout` latency.
