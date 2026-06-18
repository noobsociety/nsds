import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

const failures = [];

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function exists(path) {
  return existsSync(join(root, path));
}

function walk(dir, ignored = new Set(['.git', 'node_modules'])) {
  const abs = join(root, dir);
  if (!existsSync(abs)) return [];

  return readdirSync(abs).flatMap((entry) => {
    if (ignored.has(entry)) return [];
    const rel = dir === '.' ? entry : `${dir}/${entry}`;
    const full = join(root, rel);
    return statSync(full).isDirectory() ? walk(rel, ignored) : [rel];
  });
}

const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'SECURITY.md',
  'index.js',
  'index.d.ts',
  'styles.css',
  'components/react/index.js',
  'components/react/index.d.ts',
  'components/primitives.css',
  'mui-theme/index.js',
  'mui-theme/index.d.ts',
  'mui-theme/theme.js',
  'mui-theme/ThemeProvider.js',
  'tokens/colors.css',
  'tokens/typography.css',
];

assert(pkg.name === '@noobsociety/nsds', 'package name must be @noobsociety/nsds');
assert(/^\d+\.\d+\.\d+(-[\w.-]+)?$/.test(pkg.version), 'package version must be semver-like');
assert(pkg.private !== true, 'package must not be private');
assert(pkg.license === 'MIT', 'package license must be MIT');
assert(pkg.publishConfig?.access === 'public', 'publishConfig.access must be public');
assert(pkg.repository?.url === 'git+https://github.com/noobsociety/nsds.git', 'repository URL must point to noobsociety/nsds');
assert(pkg.bugs?.url === 'https://github.com/noobsociety/nsds/issues', 'bugs URL must point to GitHub issues');
assert(pkg.homepage === 'https://github.com/noobsociety/nsds#readme', 'homepage must point to the GitHub README');

for (const file of requiredFiles) {
  assert(exists(file), `missing required file: ${file}`);
}

for (const file of ['CHANGELOG.md', 'CONTRIBUTING.md', 'LICENSE', 'SECURITY.md']) {
  assert(pkg.files?.includes(file), `package files must include ${file}`);
}

assert(!pkg.files?.includes('scripts'), 'package files should not ship internal scripts');

function checkExportTarget(target, label) {
  if (typeof target === 'string') {
    if (target.includes('*')) {
      const base = target.replace(/^\.\//, '').split('*')[0].replace(/\/$/, '');
      assert(exists(base), `export ${label} points to missing directory: ${base}`);
      return;
    }

    const path = target.replace(/^\.\//, '');
    assert(exists(path), `export ${label} points to missing file: ${path}`);
    return;
  }

  if (target && typeof target === 'object') {
    for (const [condition, value] of Object.entries(target)) {
      checkExportTarget(value, `${label}.${condition}`);
    }
  }
}

for (const [key, value] of Object.entries(pkg.exports ?? {})) {
  checkExportTarget(value, key);
}

const forbiddenFiles = new Set(['.DS_Store', '.thumbnail']);
for (const file of walk('.')) {
  const base = file.split('/').at(-1);
  if (forbiddenFiles.has(base)) {
    fail(`remove local artifact: ${file}`);
  }
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Package check passed for ${pkg.name}@${pkg.version}.`);
