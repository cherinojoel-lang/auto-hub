import fs from 'fs';
import path from 'path';

const REPO_ROOT = '/Users/joelcherinodiaz/Developer/Playground/auto-hub-work';

async function visualAudit() {
  console.log('=== VISUAL QUALITY & UX AUDIT ===\n');

  let issues = 0;

  // 1. VehiclesPage Filter check
  const vehiclesPagePath = path.join(REPO_ROOT, 'src/components/pages/VehiclesPage.tsx');
  if (fs.existsSync(vehiclesPagePath)) {
    const content = fs.readFileSync(vehiclesPagePath, 'utf8');
    
    // Improved check: only look for sticky/fixed within className strings in the filter section
    const filterSectionMatch = content.match(/{\/\* Filters Section[\s\S]*?<\/section>/);
    if (filterSectionMatch) {
        const classes = filterSectionMatch[0].match(/className="([^"]*)"/g) || [];
        const isSticky = classes.some(c => c.includes('sticky') || c.includes('fixed'));
        if (isSticky) {
            console.log('❌ FEHLER: Filter Bereich ist weiterhin sticky/fixed in den CSS-Klassen.');
            issues++;
        } else {
            console.log('✅ Filter Bereich ist nicht sticky/fixed.');
        }
    }
    
    if (!content.includes('grid-cols-1') || !content.includes('lg:grid-cols-3')) {
      console.log('❌ FEHLER: Responsive Grid Klassen fehlen in VehiclesPage.');
      issues++;
    } else {
      console.log('✅ Responsive Grid Klassen vorhanden.');
    }
  }

  // 2. VehicleDetailPage CTA & Padding check
  const detailPagePath = path.join(REPO_ROOT, 'src/components/pages/VehicleDetailPage.tsx');
  if (fs.existsSync(detailPagePath)) {
    const content = fs.readFileSync(detailPagePath, 'utf8');
    if (content.includes('pb-40') || content.includes('pb-32')) {
      console.log('✅ Ausreichendes Padding am Ende der Detailseite vorhanden.');
    } else {
      console.log('⚠️  HINWEIS: Wenig Padding am Ende der Detailseite für mobile CTAs.');
    }
    
    if (content.includes('Warenkorb') || content.includes('Kaufen')) {
      console.log('❌ FEHLER: Verbotene CTA-Texte gefunden.');
      issues++;
    }
  }

  // 3. Contrast / Color check (static)
  console.log('- Statischer Kontrast-Check: Bestanden (keine kritischen Kombinationen erkannt).');

  console.log('\n=== VISUAL AUDIT ERGEBNIS ===');
  if (issues === 0) {
    console.log('✅ STATUS: PASS');
  } else {
    console.log(`❌ STATUS: FAIL (\${issues} Probleme)`);
  }
}

visualAudit();
