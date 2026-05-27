import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = process.cwd();
const DATA_FILE = path.join(PROJECT_ROOT, 'src/data/vehiclesData.generated.ts');
const VEHICLES_DIR = path.join(PROJECT_ROOT, 'public/vehicles');

async function finalAudit() {
  const content = fs.readFileSync(DATA_FILE, 'utf8');
  const arrayMatch = content.match(/export const vehiclesData: Vehicle\[\] = (\[[\s\S]*?\]);/);
  const vehicles = JSON.parse(arrayMatch[1]);

  console.log('=== FINAL VEHICLE GALLERY AUDIT ===\n');

  let totalPhysicalImages = 0;
  let totalGalleryEntries = 0;
  let problematicVehicles = 0;

  vehicles.forEach(v => {
    const folderName = v.folder;
    const physicalPath = path.join(VEHICLES_DIR, folderName);
    
    let physicalFiles = [];
    if (fs.existsSync(physicalPath)) {
      physicalFiles = fs.readdirSync(physicalPath).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
    }

    const referencedMissingOnDisk = v.gallery.filter(item => !physicalFiles.map(f => `/vehicles/${folderName}/${f}`).includes(item));
    const addedInAudit = v.gallery.filter(item => !physicalFiles.map(f => `/vehicles/${folderName}/${f}`).includes(item));
    const duplicates = v.gallery.filter((item, index) => v.gallery.indexOf(item) !== index);
    const foreignFolders = v.gallery.filter(item => !item.startsWith(`/vehicles/${folderName}/`));
    const externalUrls = v.gallery.filter(item => item.startsWith('http'));

    console.log(`Fahrzeug: ${v.id} (${v.title})`);
    console.log(`  Ordner: ${folderName}`);
    console.log(`  Physische Bilder: ${physicalFiles.length}`);
    console.log(`  Gallery Einträge: ${v.gallery.length}`);
    
    if (physicalFiles.length > v.gallery.length) {
      console.log(`  ℹ️ Zusätzliche lokale Bilder im Ordner: ${physicalFiles.length - v.gallery.length}`);
    }
    if (referencedMissingOnDisk.length > 0) console.log(`  ❌ REFERENZ FEHLT AUF DISK: ${referencedMissingOnDisk.join(', ')}`);
    if (addedInAudit.length > 0 && !addedInAudit.includes(v.mainImage)) console.log(`  ⚠️ UNBEKANNT IN ORDNER: ${addedInAudit.join(', ')}`);
    if (duplicates.length > 0) console.log(`  ❌ DOPPELT: ${duplicates.join(', ')}`);
    if (foreignFolders.length > 0) console.log(`  ❌ FREMDE ORDNER: ${foreignFolders.join(', ')}`);
    if (externalUrls.length > 0) console.log(`  ❌ EXTERNE URLS: ${externalUrls.join(', ')}`);
    
    totalPhysicalImages += physicalFiles.length;
    totalGalleryEntries += v.gallery.length;
    if (referencedMissingOnDisk.length > 0 || duplicates.length > 0 || foreignFolders.length > 0 || externalUrls.length > 0) {
      problematicVehicles++;
    }
  });

  console.log('\n--- GESAMTERGEBNIS ---');
  console.log(`Fahrzeuge: ${vehicles.length}`);
  console.log(`Gesamt physische Bilder: ${totalPhysicalImages}`);
  console.log(`Gesamt Gallery Einträge: ${totalGalleryEntries}`);
  console.log(`Fahrzeuge mit vollständiger Galerie: ${vehicles.length - problematicVehicles}`);
  console.log(`Fahrzeuge mit Problemen: ${problematicVehicles}`);
}

finalAudit().catch(console.error);
