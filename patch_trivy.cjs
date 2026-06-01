const fs = require('fs');

const trivyPath = '.github/workflows/trivy.yml';
let trivyContent = fs.readFileSync(trivyPath, 'utf8');

// The error is `Unable to resolve action \`aquasecurity/trivy-action@0.28.0\``
// Let's use `master` branch to ensure we get a working version
trivyContent = trivyContent.replace(
  'uses: aquasecurity/trivy-action@0.28.0',
  'uses: aquasecurity/trivy-action@master'
);

fs.writeFileSync(trivyPath, trivyContent);
