import fs from 'fs';
import path from 'path';

const REPO_ROOT = '/Users/joelcherinodiaz/Developer/Playground/auto-hub-work';
const DATA_FILE = path.join(REPO_ROOT, 'src/data/vehiclesData.generated.ts');

async function finalAudit() {
  console.log('=== AUTOMOBILE QUICK FINAL DATA INTEGRITY AUDIT ===\n');

  if (!fs.existsSync(DATA_FILE)) {
    console.error('❌ FEHLER: Datei nicht gefunden: ' + DATA_FILE);
    return;
  }

  const content = fs.readFileSync(DATA_FILE, 'utf8');
  const arrayMatch = content.match(/export const vehiclesData: Vehicle\[\] = (\[[\s\S]*?\]);/);
  
  if (!arrayMatch) {
    console.error('❌ FEHLER: Daten-Array konnte nicht extrahiert werden.');
    return;
  }

  const vehicles = JSON.parse(arrayMatch[1]);

  const visibleVehicles = vehicles.filter(v => v.status === 'available');
  const soldVehicles = vehicles.filter(v => v.status === 'sold');
  
  console.log(`- Lokale Fahrzeuge (gesamt): ${vehicles.length}`);
  console.log(`- Sichtbare Fahrzeuge: ${visibleVehicles.length}`);
  console.log(`- Verkaufte Fahrzeuge: ${soldVehicles.length}`);

  let errors = 0;

  // Validation according to portal status (18 identified active listings on mobile.de)
  if (visibleVehicles.length !== 18) {
    console.log(`❌ FEHLER: Es sollten exakt 18 sichtbare Fahrzeuge sein (entsprechend mobile.de), gefunden: ${visibleVehicles.length}`);
    errors++;
  } else {
    console.log('✅ 18 sichtbare Fahrzeuge verifiziert.');
  }

  // 2. Check for forbidden terms
  const forbiddenTerms = [
    '5 Sterne', '157 Bewertungen', 'aggregateRating', 'reviewCount',
    'Google Reviews', 'WhatsApp', 'Checkout', 'Login', 'Zahlung', 'Reservierung'
  ];

  const filesToSearch = [
    'src/components/pages/HomePage.tsx',
    'src/components/pages/VehiclesPage.tsx',
    'src/components/pages/VehicleDetailPage.tsx',
    'src/lib/seo.ts'
  ];

  console.log('\n--- Suche nach verbotenen Demo-Daten ---');
  let totalForbidden = 0;
  filesToSearch.forEach(file => {
    const filePath = path.join(REPO_ROOT, file);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      forbiddenTerms.forEach(term => {
        const regex = new RegExp(term, 'gi');
        const matches = fileContent.match(regex) || [];
        if (matches.length > 0) {
          console.log(`⚠️  "${term}" gefunden in ${file}: ${matches.length} mal`);
          totalForbidden += matches.length;
        }
      });
    }
  });

  // 3. Final Result
  console.log('\n=== AUDIT ERGEBNIS ===');
  const isPass = errors === 0 && totalForbidden === 0;
  if (isPass) {
    console.log('✅ STATUS: PASS - 18 sichtbare Fahrzeuge verifiziert, keine verbotenen Daten gefunden.');
  } else {
    console.log(`❌ STATUS: FAIL - ${errors} Datenfehler und ${totalForbidden} verbotene Begriffe gefunden.`);
  }
}

finalAudit().catch(console.error);
