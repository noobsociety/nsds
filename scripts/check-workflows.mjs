import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createLinter } from 'actionlint';

const root = resolve(import.meta.dirname, '..');
const workflowsDir = join(root, '.github/workflows');
const files = readdirSync(workflowsDir)
  .filter((file) => /\.(?:ya?ml)$/.test(file))
  .sort();
const lint = await createLinter();
const failures = [];

for (const file of files) {
  const path = join('.github/workflows', file);
  const contents = readFileSync(join(root, path), 'utf8');

  for (const result of lint(contents, path)) {
    failures.push(`${result.file}:${result.line}:${result.column} ${result.message} [${result.kind}]`);
  }

  if (contents.includes('actions/setup-node@')) {
    if (!/node-version:\s*22\b/.test(contents)) {
      failures.push(`${path}: setup-node must pin node-version: 22`);
    }
  }
}

if (failures.length > 0) {
  console.error('Workflow check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Workflow check passed.');
