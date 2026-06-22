import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));
const readme = readFileSync(join(root, 'README.md'), 'utf8');
const contributing = readFileSync(join(root, 'CONTRIBUTING.md'), 'utf8');
const ci = readFileSync(join(root, '.github/workflows/ci.yml'), 'utf8');
const release = readFileSync(join(root, '.github/workflows/release.yml'), 'utf8');
const nvmrc = readFileSync(join(root, '.nvmrc'), 'utf8').trim();

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function lockPackage(path) {
  return lock.packages?.[path];
}

function assertOptionalDepsLocked(packagePath) {
  const entry = lockPackage(packagePath);
  if (!entry?.optionalDependencies) return;

  for (const dependency of Object.keys(entry.optionalDependencies)) {
    assert(
      Boolean(lockPackage(`node_modules/${dependency}`)),
      `${dependency} must remain in package-lock.json for cross-platform npm ci`,
    );
  }
}

assert(nvmrc === '22', '.nvmrc must pin Node 22');
assert(readme.includes('nvm use'), 'README must direct contributors to nvm use');
assert(contributing.includes('nvm use'), 'CONTRIBUTING must direct contributors to nvm use');
assert(/node-version:\s*22\b/.test(ci), 'CI workflow must use Node 22');
assert(/node-version:\s*22\b/.test(release), 'Release workflow must use Node 22');

assert(pkg.devDependencies?.['@types/node']?.startsWith('^22.'), '@types/node must be declared as a Node 22 dev dependency');
assert(pkg.devDependencies?.actionlint, 'actionlint must be declared as a dev dependency');
assert(lockPackage('')?.devDependencies?.['@types/node'] === pkg.devDependencies?.['@types/node'], 'package-lock root must record @types/node');
assert(lockPackage('')?.devDependencies?.actionlint === pkg.devDependencies?.actionlint, 'package-lock root must record actionlint');
assert(lockPackage('node_modules/@types/node')?.version?.startsWith('22.'), 'package-lock must resolve @types/node to Node 22 types');

assert(pkg.scripts?.['check:deps'] === 'node scripts/check-deps.mjs', 'package must expose npm run check:deps');
assert(pkg.scripts?.['check:workflows'] === 'node scripts/check-workflows.mjs', 'package must expose npm run check:workflows');
assert(pkg.scripts?.check?.includes('npm run check:deps'), 'npm run check must include check:deps');
assert(pkg.scripts?.check?.includes('npm run check:workflows'), 'npm run check must include check:workflows');

for (const packagePath of ['node_modules/rollup', 'node_modules/rolldown', 'node_modules/oxc-parser', 'node_modules/oxc-resolver']) {
  assertOptionalDepsLocked(packagePath);
}

if (failures.length > 0) {
  console.error('Dependency check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Dependency check passed.');
