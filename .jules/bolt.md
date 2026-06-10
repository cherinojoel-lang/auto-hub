## 2024-05-24 - Static Array Filtering in Render Optimization
 **Learning:** In React components, filtering or slicing a static data source directly inside the component body recalculates the array on every render, unnecessarily consuming CPU and causing potential re-rendering of child components if the array reference changes.
 **Action:** Hoist static array calculations (like filtering, slicing) completely outside of the component function, so the calculation happens only once when the module loads, bypassing React lifecycle overhead entirely.
