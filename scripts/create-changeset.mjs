import { mkdirSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const bumpTypes = new Set(['patch', 'minor', 'major']);
const [rawBump, ...rawSummary] = process.argv.slice(2);

async function promptForChangeset() {
  if (rawBump && rawSummary.length > 0) {
    return { bump: rawBump, summary: rawSummary.join(' ') };
  }

  const rl = createInterface({ input, output });
  const bump = await rl.question('Bump type (patch/minor/major): ');
  const summary = await rl.question('Release note: ');
  rl.close();
  return { bump, summary };
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

const { bump, summary } = await promptForChangeset();

if (!bumpTypes.has(bump)) {
  throw new Error('Bump type must be patch, minor, or major.');
}

if (!summary.trim()) {
  throw new Error('Release note must not be empty.');
}

const dir = join(root, '.changeset');
mkdirSync(dir, { recursive: true });

const slug = slugify(summary) || `nsds-${Date.now()}`;
const path = join(dir, `${slug}.md`);
const body = `---\n"@noobsociety/nsds": ${bump}\n---\n\n${summary.trim().replace(/\.$/, '')}.\n`;

writeFileSync(path, body);
console.log(`Created ${path.replace(`${root}/`, '')}.`);
