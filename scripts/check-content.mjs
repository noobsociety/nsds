import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const ignoredDirs = new Set(['.git', 'dist', 'node_modules', 'storybook-static']);
const checkedExtensions = new Set(['.md', '.mdx', '.yml', '.yaml', '.json', '.jsonc']);
const checkedNames = new Set(['package.json']);
const failures = [];

function extension(path) {
  const match = path.match(/(\.[^.]+)$/);
  return match?.[1] ?? '';
}

function walk(dir = '.') {
  return readdirSync(join(root, dir)).flatMap((entry) => {
    if (ignoredDirs.has(entry)) return [];

    const rel = dir === '.' ? entry : `${dir}/${entry}`;
    const full = join(root, rel);

    if (statSync(full).isDirectory()) return walk(rel);
    if (!checkedExtensions.has(extension(rel)) && !checkedNames.has(rel)) return [];

    return [rel];
  });
}

for (const file of walk()) {
  const text = readFileSync(join(root, file), 'utf8');

  for (const pattern of [/\/Users\/[^\s)]+/g, /~\/Projects\/[^\s)]+/g]) {
    for (const match of text.matchAll(pattern)) {
      failures.push(`${file}: local path leak: ${match[0]}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Content check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Content check passed.');
