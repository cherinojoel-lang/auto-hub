import fs from 'fs';
import path from 'path';

const REPO_ROOT = '/Users/joelcherinodiaz/Developer/Playground/auto-hub-work';
const DATA_FILE = path.join(REPO_ROOT, 'src/data/vehiclesData.generated.ts');

async function syncAudit() {
  console.log('=== PORTAL IMAGE SYNC AUDIT ===\n');

  if (!fs.existsSync(DATA_FILE)) {
    console.error('❌ FEHLER: vehiclesData.generated.ts nicht gefunden.');
    return;
  }

  const content = fs.readFileSync(DATA_FILE, 'utf8');
  const arrayMatch = content.match(/export const vehiclesData: Vehicle\[\] = (\[[\s\S]*?\]);/);
  
  if (!arrayMatch) {
    console.error('❌ FEHLER: Konnte vehiclesData nicht parsen.');
    return;
  }

  const vehicles = JSON.parse(arrayMatch[1]);

  vehicles.forEach(v => {
    const dir = path.join(REPO_ROOT, 'public', 'vehicles', v.folder);
    const images = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i)) : [];
    
    console.log(`Fahrzeug: ${v.id}`);
    console.log(`- Ordner: ${v.folder}`);
    console.log(`- Status: ${v.status}`);
    console.log(`- Bilder lokal: ${images.length}`);
    console.log(`- Gallery-Einträge: ${v.gallery.length}`);
    
    const externalLinks = v.gallery.filter(img => img.startsWith('http'));
    if (externalLinks.length > 0) {
      console.log(`❌ FEHLER: Externe Links in Gallery gefunden: ${externalLinks.length}`);
    }
    
    if (v.status === 'available' && images.length === 0) {
      console.log(`❌ FEHLER: Verfügbares Fahrzeug hat keine Bilder.`);
    }
    console.log('---');
  });
}

syncAudit();
