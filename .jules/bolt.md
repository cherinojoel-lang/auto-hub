## Performance Optimizations

### Local Data Simulation
- Avoid artificial delays (`setTimeout`) when loading local, static data (e.g., `vehiclesData`). Removing these can lead to significant execution time improvements (e.g., from ~315ms down to ~6ms) and directly enhances the Largest Contentful Paint (LCP) performance for pages presenting pre-loaded data.
