# Quality

NSDS is a published package, not a deployed site. The quality baseline is the installable npm
surface: built `dist/`, package exports, declarations, generated docs, component behavior, visual
snapshots, release notes, and repository hygiene.

## Gates

Run the consolidated gate before commits, pull requests, releases, and manual publishes:

```bash
npm run check
```

The gate includes dependency and lockfile checks, workflow lint, content hygiene, release
consistency, Markdown lint, ESLint, Prettier, build output, package guards, export validation,
fresh consumer install, TypeScript checks, generated API drift checks, component tests, visual
tests, smoke imports, and commit-message lint.

## Release Evidence

Release pull requests must also record:

```bash
npm run build:storybook
npm run release:dry-run
```

`release:dry-run` is the package footprint check. The tarball should contain `dist/` plus the
intended metadata files: `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE`, and `SECURITY.md`.

## Visual Baseline

Browser-rendered visual checks live in `tests/visual/`. Update snapshots only when a token,
primitive, component, or fixture change intentionally changes the public surface.

```bash
npm run test:visual
```

## Release Tags

Versioned changelog links depend on annotated `vX.Y.Z` tags. Tags are release-time artifacts and
must point at the final published commit. The release workflow creates the tag after a successful
new npm publish.

Manual repair, when explicitly release-scoped, uses the same helper:

```bash
node scripts/tag-release.mjs
```

The tag message must follow the NoobSociety style: one concise subject, one factual release-notes
paragraph, and a footprint sentence grounded in the real log and diffstat.

## Current Baseline

Record the current baseline in the release PR or handoff:

```text
Package quality check:
- npm run check: PASS/FAIL
- npm run build:storybook: PASS/FAIL
- npm run release:dry-run: PASS/FAIL
- npm audit --audit-level=moderate: PASS/FAIL
- npm run check:release: PASS/FAIL
- Version + CHANGELOG parity: PASS/FAIL
- Release tag: pending workflow / created / not applicable
```
