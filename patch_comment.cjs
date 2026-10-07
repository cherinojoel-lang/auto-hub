const fs = require('fs');
const file = 'src/lib/domain/vehicleFeatures.ts';
let content = fs.readFileSync(file, 'utf8');

const toReplace = `const transmissionCache = new WeakMap<Vehicle, string | null>();`;
const replacement = `// Performance optimization: Cache transmission regex lookups to avoid redundant execution during layout iterations
const transmissionCache = new WeakMap<Vehicle, string | null>();`;

content = content.replace(toReplace, replacement);
fs.writeFileSync(file, content);
