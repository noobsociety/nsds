import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const changesetDir = join(root, '.changeset');
const packagePath = join(root, 'package.json');
const lockPath = join(root, 'package-lock.json');
const packageName = '@noobsociety/nsds';
const bumpRank = { patch: 1, minor: 2, major: 3 };

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function bumpVersion(version, bump) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-.+)?$/);
  if (!match) throw new Error(`Cannot bump non-semver version: ${version}`);

  let [, major, minor, patch] = match.map(Number);

  if (bump === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (bump === 'minor') {
    minor += 1;
    patch = 0;
  } else if (bump === 'patch') {
    patch += 1;
  } else {
    throw new Error(`Unsupported bump type: ${bump}`);
  }

  return `${major}.${minor}.${patch}`;
}

function changesetBump(markdown) {
  const frontmatter = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) return null;

  const packagePattern = new RegExp(
    `^["']?${packageName.replace('/', '\\/')}["']?:\\s*(patch|minor|major)\\s*$`,
    'm',
  );
  return frontmatter[1].match(packagePattern)?.[1] ?? null;
}

const changesetFiles = existsSync(changesetDir)
  ? readdirSync(changesetDir)
      .filter((file) => file.endsWith('.md') && file !== 'README.md')
      .sort()
  : [];

let selectedBump = null;
const consumedFiles = [];

for (const file of changesetFiles) {
  const bump = changesetBump(readFileSync(join(changesetDir, file), 'utf8'));
  if (!bump) continue;

  consumedFiles.push(file);
  if (!selectedBump || bumpRank[bump] > bumpRank[selectedBump]) {
    selectedBump = bump;
  }
}

if (!selectedBump) {
  console.log(`No ${packageName} changesets to version.`);
  process.exit(0);
}

const pkg = readJson(packagePath);
const lock = readJson(lockPath);
const nextVersion = bumpVersion(pkg.version, selectedBump);

pkg.version = nextVersion;
lock.version = nextVersion;

if (lock.packages?.['']) {
  lock.packages[''].version = nextVersion;
}

writeJson(packagePath, pkg);
writeJson(lockPath, lock);

for (const file of consumedFiles) {
  rmSync(join(changesetDir, file));
}

console.log(`Versioned ${packageName} to ${nextVersion} with a ${selectedBump} bump.`);
