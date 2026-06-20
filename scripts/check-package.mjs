import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const readme = readFileSync(join(root, 'README.md'), 'utf8');
const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8');
const contributing = readFileSync(join(root, 'CONTRIBUTING.md'), 'utf8');

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

function walk(dir, ignored = new Set(['.git', 'node_modules', 'storybook-static'])) {
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
  '.changeset/config.json',
  '.storybook/main.ts',
  '.storybook/preview.ts',
  'scripts/release-changelog.mjs',
  'components/buttons/Button.stories.jsx',
  'components/cards/FeatureCard.stories.jsx',
  'components/cards/QuestCard.stories.jsx',
  'components/hud/HUDBar.stories.jsx',
  'components/hud/HUDDivider.stories.jsx',
  'components/hud/HUDLabel.stories.jsx',
  'components/icons/RPGIcon.stories.jsx',
  'components/navigation/SectionArrow.stories.jsx',
  'dist/index.js',
  'dist/index.d.ts',
  'dist/index.cjs',
  'dist/tailwind/preset.js',
  'dist/styles.css',
  'dist/tokens/colors.css',
  'dist/tokens/typography.css',
  'dist/tokens/hud.css',
  'dist/components/primitives.css',
  'dist/components/hud/HUDBar.d.ts',
  'dist/components/hud/HUDDivider.d.ts',
  'dist/components/hud/HUDLabel.d.ts',
  'dist/components/icons/RPGIcon.d.ts',
];

assert(pkg.name === '@noobsociety/nsds', 'package name must be @noobsociety/nsds');
assert(/^\d+\.\d+\.\d+(-[\w.-]+)?$/.test(pkg.version), 'package version must be semver-like');
assert(pkg.private !== true, 'package must not be private');
assert(pkg.license === 'MIT', 'package license must be MIT');
assert(pkg.publishConfig?.access === 'public', 'publishConfig.access must be public');
assert(pkg.repository?.url === 'git+https://github.com/noobsociety/nsds.git', 'repository URL must point to noobsociety/nsds');
assert(pkg.bugs?.url === 'https://github.com/noobsociety/nsds/issues', 'bugs URL must point to GitHub issues');
assert(pkg.homepage === 'https://github.com/noobsociety/nsds#readme', 'homepage must point to the GitHub README');
assert(pkg.scripts?.changeset === 'changeset', 'package must expose npm run changeset');
assert(
  pkg.scripts?.['changeset:version'] === 'changeset version && node scripts/release-changelog.mjs',
  'package must expose npm run changeset:version',
);
assert(pkg.scripts?.['changeset:publish'] === 'changeset publish', 'package must expose npm run changeset:publish');
assert(
  pkg.scripts?.storybook === 'storybook dev -p 6006 --disable-telemetry',
  'package must expose npm run storybook',
);
assert(
  pkg.scripts?.['build:storybook'] === 'storybook build --disable-telemetry',
  'package must expose npm run build:storybook',
);

assert(readme.includes('## Install'), 'README must include install guidance');
assert(readme.includes('## Quick start'), 'README must include quick start guidance');
assert(readme.includes('## Package exports'), 'README must document package exports');
assert(readme.includes('## Versioning and releases'), 'README must document versioning and releases');
assert(readme.includes('## License'), 'README must include license guidance');
for (const [label, contents] of [
  ['README', readme],
  ['CHANGELOG', changelog],
]) {
  assert(
    !/(?:_lab\/|guidelines\/|references\/|source cards|lab pages|reference surfaces|design-system cards)/i.test(
      contents,
    ),
    `${label} must not document internal source artifacts`,
  );
}
assert(changelog.includes('Keep a Changelog'), 'CHANGELOG must reference Keep a Changelog');
assert(changelog.includes('Semantic Versioning'), 'CHANGELOG must reference Semantic Versioning');
assert(changelog.includes('## [Unreleased]'), 'CHANGELOG must include an Unreleased section');
assert(contributing.includes('Semantic Versioning'), 'CONTRIBUTING must document Semantic Versioning');
assert(contributing.includes('Changesets'), 'CONTRIBUTING must document Changesets');
assert(contributing.includes('Storybook'), 'CONTRIBUTING must document Storybook');
assert(contributing.includes('MIT License'), 'CONTRIBUTING must include license guidance');

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
const internalArtifactPatterns = [
  /^SKILL\.md$/,
  /^support\.js$/,
  /^_lab\//,
  /^references\//,
  /^assets\//,
  /^guidelines\/.*\.card\.html$/,
  /^components\/.*\.(?:prompt\.md|card\.html)$/,
];
const disallowedTerms = [
  ['c', 'o', 'd', 'e', 'x'].join(''),
  ['m', 'u', 'i'].join(''),
  ['material', 'ui'].join('-'),
  ['material', 'ui'].join(' '),
  ['a', 'i'].join(''),
  ['c', 'l', 'a', 'u', 'd', 'e'].join(''),
  ['g', 'p', 't'].join(''),
  ['c', 'h', 'a', 't', 'g', 'p', 't'].join(''),
  ['o', 'p', 'e', 'n', 'a', 'i'].join(''),
  ['a', 'n', 't', 'h', 'r', 'o', 'p', 'i', 'c'].join(''),
  ['c', 'o', 'p', 'i', 'l', 'o', 't'].join(''),
  ['l', 'l', 'm'].join(''),
];
const disallowedExpressions = disallowedTerms.map((term) => new RegExp(`\\b${term}\\b`, 'i'));

function hasDisallowedMarker(text) {
  return disallowedExpressions.some((expression) => expression.test(text));
}

for (const file of walk('.')) {
  const base = file.split('/').at(-1);
  if (forbiddenFiles.has(base)) {
    fail(`remove local artifact: ${file}`);
  }

  if (internalArtifactPatterns.some((pattern) => pattern.test(file))) {
    fail(`remove internal source artifact: ${file}`);
  }

  if (/\.(?:c?js|mjs|jsx|ts|tsx|json|md|ya?ml|css|html)$/.test(file)) {
    const contents = readFileSync(join(root, file), 'utf8');
    if (hasDisallowedMarker(contents) || hasDisallowedMarker(file)) {
      fail(`remove disallowed repository marker: ${file}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Package check passed for ${pkg.name}@${pkg.version}.`);
