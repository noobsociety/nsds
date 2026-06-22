import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8');
const tag = `v${pkg.version}`;
const emptyTree = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';

function git(args, options = {}) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function remoteTagExists() {
  try {
    git(['ls-remote', '--exit-code', '--tags', 'origin', `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
}

function localTagExists() {
  try {
    git(['rev-parse', '--verify', '--quiet', tag]);
    return true;
  } catch {
    return false;
  }
}

function releaseSection() {
  const escapedVersion = pkg.version.replaceAll('.', '\\.');
  const match = changelog.match(
    new RegExp(
      `^## \\[${escapedVersion}\\] - \\d{4}-\\d{2}-\\d{2}\\n\\n([\\s\\S]*?)(?=\\n## \\[|\\n\\[Unreleased\\]:)`,
      'm',
    ),
  );

  if (!match?.[1]?.trim()) {
    throw new Error(`CHANGELOG.md must include a non-empty ${pkg.version} release section.`);
  }

  return match[1].trim();
}

function releaseBullets(section) {
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).replace(/\.$/, ''));
}

function previousReleaseTag() {
  const tags = git(['tag', '--list', 'v[0-9]*', '--sort=-version:refname'])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((name) => name !== tag);

  return tags[0] ?? null;
}

function diffBase(previousTag) {
  if (!previousTag) return emptyTree;
  return git(['rev-parse', `${previousTag}^{commit}`]);
}

function footprint(base, target, previousTag) {
  const shortstat = git(['diff', '--shortstat', base, target]);
  const files = shortstat.match(/(\d+) files? changed/)?.[1] ?? '0';
  const insertions = shortstat.match(/(\d+) insertions?\(\+\)/)?.[1] ?? '0';
  const deletions = shortstat.match(/(\d+) deletions?\(-\)/)?.[1] ?? '0';
  const commitCount = previousTag
    ? git(['rev-list', '--count', `${base}..${target}`])
    : git(['rev-list', '--count', target]);

  return `Altogether it touched ${files} files (+${insertions}/-${deletions}) across ${commitCount} commits.`;
}

if (localTagExists() || remoteTagExists()) {
  throw new Error(`Release tag ${tag} already exists.`);
}

const target = process.env.GITHUB_SHA || git(['rev-parse', 'HEAD']);
const section = releaseSection();
const bullets = releaseBullets(section);

if (bullets.length === 0) {
  throw new Error(`CHANGELOG.md ${pkg.version} release section must include release bullets.`);
}

const previousTag = previousReleaseTag();
const base = diffBase(previousTag);
const primary = bullets[0].replace(/^Added an? /, 'added ').replace(/^Added /, 'added ');
const secondary = bullets[1]?.replace(/^Added an? /, 'added ').replace(/^Added /, 'added ');
const subject = `Release ${pkg.name}@${pkg.version}`;
const summary = secondary ? `${primary}; it also ${secondary}` : primary;
const body = `Published ${pkg.name}@${pkg.version} with ${summary}. The release kept the package version, changelog, npm publish, and tag target aligned on the final release commit. ${footprint(base, target, previousTag)}`;

git(['config', 'user.name', 'github-actions[bot]'], { stdio: 'inherit' });
git(['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com'], {
  stdio: 'inherit',
});
git(['tag', '-a', tag, target, '-m', subject, '-m', body], { stdio: 'inherit' });
git(['push', 'origin', `refs/tags/${tag}`], { stdio: 'inherit' });

console.log(`Created annotated ${tag} on ${target}.`);
