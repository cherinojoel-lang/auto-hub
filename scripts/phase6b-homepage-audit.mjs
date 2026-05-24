import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = process.cwd();

async function audit() {
  console.log('=== AUTOMOBILE QUICK HOMEPAGE & TRUST AUDIT ===');
  
  // 1. Check vehiclesData
  const vehiclesDataPath = path.join(PROJECT_ROOT, 'src/data/vehiclesData.generated.ts');
  const vehiclesDataContent = fs.readFileSync(vehiclesDataPath, 'utf8');
  const vehiclesDataMatches = vehiclesDataContent.match(/\{/g) || [];
  const vehicleCount = vehiclesDataMatches.length - 1; // Subtract 1 for the type definition block
  console.log(`- Fahrzeuge in vehiclesData: ${vehicleCount}`);

  // 2. Check HomePage logic
  const homePagePath = path.join(PROJECT_ROOT, 'src/components/pages/HomePage.tsx');
  const homePageContent = fs.readFileSync(homePagePath, 'utf8');
  
  const usesLocalData = homePageContent.includes('setVehicle(vehiclesData.slice(0, 6))');
  console.log(`- HomePage nutzt lokale Daten: ${usesLocalData ? 'JA' : 'NEIN'}`);

  const hasFallbackVisible = homePageContent.includes('Keine Fahrzeuge gefunden');
  console.log(`- "Keine Fahrzeuge gefunden" Fallback vorhanden: ${hasFallbackVisible ? 'JA' : 'NEIN'}`);

  // 3. Check Risky Terms
  const riskyTerms = [
    '5 Sterne',
    '157 Bewertungen',
    '42 Jahre',
    'mobile.de',
    'aggregateRating',
    'reviewCount'
  ];

  console.log('\n--- Suche nach riskanten Begriffen (darf 0 sein) ---');
  let totalRisky = 0;
  riskyTerms.forEach(term => {
    const count = (homePageContent.match(new RegExp(term, 'gi')) || []).length;
    // Also check seo.ts
    const seoPath = path.join(PROJECT_ROOT, 'src/lib/seo.ts');
    const seoContent = fs.readFileSync(seoPath, 'utf8');
    const seoCount = (seoContent.match(new RegExp(term, 'gi')) || []).length;
    
    console.log(`- ${term}: ${count} Treffer auf HomePage, ${seoCount} Treffer in seo.ts`);
    totalRisky += count + seoCount;
  });

  // 4. Image Check
  console.log('\n--- Bild-Check ---');
  const mainImagesAllLocal = !vehiclesDataContent.includes('"mainImage": "http');
  console.log(`- Alle mainImages lokal (/vehicles/): ${mainImagesAllLocal ? 'JA' : 'NEIN'}`);

  console.log('\n=== AUDIT ERGEBNIS ===');
  if (vehicleCount >= 17 && usesLocalData && totalRisky === 0 && mainImagesAllLocal) {
    console.log('✅ STATUS: PASS - Homepage wiederhergestellt und Trust-Zahlen bereinigt.');
  } else {
    console.log('❌ STATUS: FAIL - Es gibt noch Probleme.');
    if (totalRisky > 0) console.log(`  -> ${totalRisky} riskante Begriffe gefunden.`);
    if (!usesLocalData) console.log('  -> HomePage nutzt keine lokalen Daten.');
  }
}

audit().catch(console.error);
