// update-version.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, '..', 'package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Increment the version (assuming semver format: major.minor.patch)
const versionParts = packageJson.version.split('.');
if (versionParts.length === 3) {
  versionParts[2] = (parseInt(versionParts[2], 10) + 1).toString();
  packageJson.version = versionParts.join('.');
} else if (packageJson.version === '0.0.0') {
  packageJson.version = '0.0.1';
} else {
  packageJson.version = `${packageJson.version}.1`;
}

const now = new Date();
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0');
const year = now.getFullYear();
packageJson.buildDate = `${day}/${month}/${year}`;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`Version updated to ${packageJson.version}`);
console.log(`Build date updated to ${packageJson.buildDate}`);