import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = '/Users/joelcherinodiaz/Developer/Playground/auto-hub-work';
const DATA_FILE = path.join(PROJECT_ROOT, 'src/data/vehiclesData.generated.ts');
const VEHICLES_DIR = path.join(PROJECT_ROOT, 'public/vehicles');

async function updateGalleries() {
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  
  // Extract the array using regex
  const arrayMatch = content.match(/export const vehiclesData: Vehicle\[\] = (\[[\s\S]*?\]);/);
  if (!arrayMatch) throw new Error('Could not find vehiclesData array');
  
  let vehicles;
  try {
    vehicles = JSON.parse(arrayMatch[1]);
  } catch (e) {
    console.error('JSON Parse Error:', e);
    return;
  }
  
  const updatedVehicles = vehicles.map(vehicle => {
    const folderName = vehicle.folder;
    const physicalFolderPath = path.join(VEHICLES_DIR, folderName);
    
    if (!fs.existsSync(physicalFolderPath)) {
      console.warn(`Folder not found: ${physicalFolderPath}`);
      return vehicle;
    }
    
    const files = fs.readdirSync(physicalFolderPath)
      .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map(f => `/vehicles/${folderName}/${f}`);
      
    // Ensure mainImage is first, then unique files
    const gallery = [...new Set([vehicle.mainImage, ...files])];
    
    return {
      ...vehicle,
      gallery
    };
  });
  
  const newContent = content.replace(
    /export const vehiclesData: Vehicle\[\] = \[[\s\S]*?\];/,
    `export const vehiclesData: Vehicle[] = ${JSON.stringify(updatedVehicles, null, 2)};`
  );
  
  fs.writeFileSync(DATA_FILE, newContent);
  console.log('Successfully updated vehiclesData.generated.ts with full galleries.');
}

updateGalleries().catch(console.error);
