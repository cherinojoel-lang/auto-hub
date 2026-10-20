const { execSync } = require('child_process');
try {
  const output = execSync('git push origin fix-toaster-tests -f', { encoding: 'utf-8' });
  console.log(output);
} catch (error) {
  console.error(error.message);
  console.error(error.stdout);
  console.error(error.stderr);
}
