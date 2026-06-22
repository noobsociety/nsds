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
const node22WorkflowPin = /node-version:\s*22\b/;
const nvmrcWorkflowPin = /node-version-file:\s*['"]?\.nvmrc['"]?/;

assert(
  node22WorkflowPin.test(ci) || nvmrcWorkflowPin.test(ci),
  'CI workflow must use the Node 22 pin',
);
assert(
  node22WorkflowPin.test(release) || nvmrcWorkflowPin.test(release),
  'Release workflow must use the Node 22 pin',
);

assert(
  pkg.devDependencies?.['@types/node']?.startsWith('^22.'),
  '@types/node must be declared as a Node 22 dev dependency',
);
assert(pkg.devDependencies?.actionlint, 'actionlint must be declared as a dev dependency');
assert(
  lockPackage('')?.devDependencies?.['@types/node'] === pkg.devDependencies?.['@types/node'],
  'package-lock root must record @types/node',
);
assert(
  lockPackage('')?.devDependencies?.actionlint === pkg.devDependencies?.actionlint,
  'package-lock root must record actionlint',
);
assert(
  lockPackage('node_modules/@types/node')?.version?.startsWith('22.'),
  'package-lock must resolve @types/node to Node 22 types',
);

for (const dependency of [
  '@commitlint/cli',
  '@commitlint/config-conventional',
  '@eslint/js',
  'eslint',
  'husky',
  'markdownlint-cli',
  'prettier',
  'typescript-eslint',
]) {
  assert(pkg.devDependencies?.[dependency], `${dependency} must be declared as a dev dependency`);
  assert(
    lockPackage('')?.devDependencies?.[dependency] === pkg.devDependencies?.[dependency],
    `package-lock root must record ${dependency}`,
  );
  assert(lockPackage(`node_modules/${dependency}`), `package-lock must include ${dependency}`);
}

assert(
  pkg.scripts?.['check:commits'] === 'commitlint --from origin/main --to HEAD --verbose',
  'package must expose npm run check:commits',
);
assert(
  pkg.scripts?.['check:deps'] === 'node scripts/check-deps.mjs',
  'package must expose npm run check:deps',
);
assert(
  pkg.scripts?.['check:markdown'] ===
    'markdownlint "*.md" ".github/**/*.md" "docs/**/*.md" ".changeset/*.md"',
  'package must expose npm run check:markdown',
);
assert(
  pkg.scripts?.['check:workflows'] === 'node scripts/check-workflows.mjs',
  'package must expose npm run check:workflows',
);
assert(pkg.scripts?.check?.includes('npm run check:deps'), 'npm run check must include check:deps');
assert(
  pkg.scripts?.check?.includes('npm run check:workflows'),
  'npm run check must include check:workflows',
);
assert(
  pkg.scripts?.check?.includes('npm run check:commits'),
  'npm run check must include check:commits',
);
assert(pkg.scripts?.check?.includes('npm run lint'), 'npm run check must include lint');
assert(
  pkg.scripts?.check?.includes('npm run format:check'),
  'npm run check must include format:check',
);
assert(pkg.scripts?.prepare === 'husky', 'package must install husky hooks on npm install');

for (const packagePath of [
  'node_modules/rollup',
  'node_modules/rolldown',
  'node_modules/oxc-parser',
  'node_modules/oxc-resolver',
]) {
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
