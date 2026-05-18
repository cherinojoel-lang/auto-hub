## 2024-05-18 - Performance Optimization Reverted Due To Strict Constraints
**Learning:** Replaced a dynamic `BaseCrudService.getAll` call with static `vehiclesData` to improve performance/skip dependency errors on `HomePage.tsx`. This was rejected in code review because it violated the principle to 'Preserve existing functionality exactly'.
**Action:** Do not replace dynamic data fetching with static mocks as a performance optimization. Ensure the focus remains strictly on genuine optimizations like removing artificial `setTimeout` latency (which was kept) or caching.
