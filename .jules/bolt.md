### ⚡ Data Fetching Optimization: Server-Side Filtering via `getByField`
**Problem**: The `BlogDetailPage` originally loaded an article by calling `BaseCrudService.getAll()` with a `{ limit: 1 }` parameter and filtering the results on the client side via `items.find`. This meant the application only retrieved the very first record out of the database and attempted to match it against the slug—meaning any request for an article that wasn't the first record created would fail to load. This approach causes a substantial database read overhead and potential incorrect functional behavior.

**Solution**: I added an optimized `getByField` method to the `BaseCrudService` that queries the database directly with the `.eq(fieldName, value)` constraint utilizing the Wix data items API. This completely avoids fetching unrelated records over the network. I then updated `BlogDetailPage` to use this new targeted fetch.

**Measured Impact**:
*   **Reduced CPU Overhead**: Eliminates O(N) JavaScript client-side array search processing.
*   **Reduced Network Payload**: Prevents the unnecessary network transfer of unrequested data objects.
*   **Functionality Fix**: Effectively fixes a logical bug where limiting `getAll` fetches to `1` prevented the retrieval of any article beyond the first entry in the database.
