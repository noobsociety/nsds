import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const strict = process.argv.includes('--strict');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8');
const releaseWorkflow = readFileSync(join(root, '.github/workflows/release.yml'), 'utf8');
const tag = `v${pkg.version}`;
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function git(args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function maybeGit(args) {
  try {
    return git(args);
  } catch {
    return null;
  }
}

const versionPattern = pkg.version.replaceAll('.', '\\.');

assert(
  new RegExp(`^## \\[${versionPattern}\\] - \\d{4}-\\d{2}-\\d{2}$`, 'm').test(changelog) ||
    changelog.includes('## [Unreleased]'),
  'CHANGELOG.md must include Unreleased or the current version section',
);
assert(
  changelog.includes(`[Unreleased]: https://github.com/noobsociety/nsds/compare/${tag}...HEAD`) ||
    changelog.includes('[Unreleased]: https://github.com/noobsociety/nsds/compare/v'),
  'CHANGELOG.md must include an Unreleased compare link',
);
assert(
  existsSync(join(root, 'scripts/tag-release.mjs')),
  'release tag helper must exist at scripts/tag-release.mjs',
);
assert(
  releaseWorkflow.includes('node scripts/tag-release.mjs'),
  'release workflow must create tags through scripts/tag-release.mjs',
);
assert(
  pkg.scripts?.['changeset:version'] ===
    'node scripts/changeset-version.mjs && node scripts/release-changelog.mjs',
  'changeset:version must use first-party version and changelog scripts',
);
assert(
  pkg.scripts?.['changeset:publish'] === 'npm publish --access public --provenance',
  'changeset:publish must publish directly through npm',
);

if (strict) {
  const localTagType = maybeGit(['for-each-ref', `refs/tags/${tag}`, '--format=%(objecttype)']);
  const tagCommit = maybeGit(['rev-parse', `${tag}^{commit}`]);
  const head = maybeGit(['rev-parse', 'HEAD']);

  assert(localTagType === 'tag', `${tag} must be an annotated tag`);
  assert(tagCommit === head, `${tag} must point at HEAD in strict release mode`);
}

if (failures.length > 0) {
  console.error('Release check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(strict ? 'Strict release check passed.' : 'Release check passed.');
