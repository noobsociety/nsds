import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const changelogPath = join(root, 'CHANGELOG.md');
const repoUrl = 'https://github.com/noobsociety/nsds';

let changelog = readFileSync(changelogPath, 'utf8');
const unreleasedPattern = /## \[Unreleased\]\n([\s\S]*?)(?=\n## \[\d)/;
const unreleasedMatch = changelog.match(unreleasedPattern);

if (!unreleasedMatch) {
  throw new Error('CHANGELOG.md must include an [Unreleased] section before release sections.');
}

const unreleasedBody = unreleasedMatch[1].trim();

if (!unreleasedBody) {
  console.log('No unreleased changelog entries to promote.');
  process.exit(0);
}

const previousMatch = changelog.slice(unreleasedMatch.index + unreleasedMatch[0].length)
  .match(/## \[(\d+\.\d+\.\d+(?:-[\w.-]+)?)\] - \d{4}-\d{2}-\d{2}/);

if (!previousMatch) {
  throw new Error('CHANGELOG.md must include a previous version section.');
}

const version = pkg.version;
const previousVersion = previousMatch[1];
const date = new Date().toISOString().slice(0, 10);
const releaseBlock = `## [${version}] - ${date}\n\n${unreleasedBody}\n`;

changelog = changelog.replace(
  unreleasedPattern,
  `## [Unreleased]\n\n${releaseBlock}`,
);

const unreleasedLink = `[Unreleased]: ${repoUrl}/compare/v${version}...HEAD`;
const versionLink = `[${version}]: ${repoUrl}/compare/v${previousVersion}...v${version}`;

if (changelog.includes('[Unreleased]:')) {
  changelog = changelog.replace(/^\[Unreleased\]: .+$/m, unreleasedLink);
} else {
  changelog = `${changelog.trimEnd()}\n\n${unreleasedLink}\n`;
}

if (!changelog.includes(`[${version}]:`)) {
  changelog = changelog.replace(
    new RegExp(`^\\[${previousVersion.replaceAll('.', '\\.')}\\]: `, 'm'),
    `${versionLink}\n[${previousVersion}]: `,
  );
}

writeFileSync(changelogPath, `${changelog.trimEnd()}\n`);
console.log(`Promoted changelog entries for ${pkg.name}@${version}.`);
