1. **Optimize Manufacturer and Fuel Options:**
   - Instead of deriving these options dynamically inside `src/components/pages/VehiclesPage.tsx` using `deriveManufacturerOptions(vehiclesData)` and `deriveFuelOptions(vehiclesData)`, we can evaluate them once during module load and store them as constants. But they are already being derived outside the component:
     ```javascript
     const MANUFACTURER_OPTIONS = deriveManufacturerOptions(vehiclesData);
     const FUEL_OPTIONS = deriveFuelOptions(vehiclesData);
     ```
   - Let's check `src/components/VehicleInventorySection.tsx`.
   - `const topVehicles = React.useMemo(() => vehiclesData.filter((vehicle) => vehicle.status === 'available').slice(0, 6), []);`
   - This filters the array inside the component and memoizes it, but it doesn't depend on any props or state. It can be moved outside the component to avoid hook overhead completely.
