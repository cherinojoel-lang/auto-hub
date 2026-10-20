const fs = require('fs');
let content = fs.readFileSync('src/middleware.ts', 'utf8');
content = content.replace(
  'const IMMUTABLE_ASSET_PATTERN',
  'const SECURITY_HEADERS_ENTRIES = Object.entries(SECURITY_HEADERS);\n\nconst IMMUTABLE_ASSET_PATTERN'
);
content = content.replace(
  'for (const [name, value] of Object.entries(SECURITY_HEADERS)) {',
  'for (const [name, value] of SECURITY_HEADERS_ENTRIES) {'
);
fs.writeFileSync('src/middleware.ts', content);
