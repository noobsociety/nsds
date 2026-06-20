# Contributing

NSDS is the NoobSociety Design System. Changes should keep the package small, reusable, direct, and Tailwind-first.

## Local setup

Use Node.js 22 or newer.

```bash
npm install
npm run check
```

Run Storybook while changing components:

```bash
npm run storybook
```

## Change guidelines

- Keep package exports stable unless the release is intentionally breaking.
- Prefer CSS tokens and shared primitives over one-off styles.
- Keep React components small and framework-light.
- Add or update Storybook stories when changing public component behavior or props.
- Add or update smoke coverage when changing import behavior, package exports, or runtime behavior.
- Keep third-party code and assets license-compatible with MIT.

## Versioning

NSDS follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- Patch versions are for docs, metadata, dependency compatibility, bug fixes, and non-breaking visual corrections.
- Minor versions are for new components, tokens, exports, or additive behavior.
- Major versions are for breaking public API changes, removed exports, incompatible CSS token changes, or required consumer migration.

The package is still pre-1.0, but release intent should still be explicit. If a `0.x` minor release contains a breaking package-boundary change, document the migration clearly in the changelog.

## Changelog

`CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Use these categories when applicable:

- `Added`
- `Changed`
- `Deprecated`
- `Removed`
- `Fixed`
- `Security`

Keep user-facing changes in the changelog. Internal maintenance can stay in the pull request when it has no package or contributor impact.

Add unreleased package notes under `## [Unreleased]`. During release, `npm run changeset:version` moves those notes into a dated version section and updates the compare links.

## Changesets

Every package-impacting pull request should include a changeset:

```bash
npm run changeset
```

Choose the SemVer bump that matches the public impact. Documentation-only changes may skip a changeset when they do not affect the published package behavior.

Maintainers prepare release commits with:

```bash
npm run changeset:version
```

This command applies the Changesets version plan and updates `CHANGELOG.md` from the `[Unreleased]` section. Open the result as a release pull request.

Publishing is handled by the release workflow after the release pull request is merged to `main`, when `NPM_TOKEN` is configured:

```bash
npm run changeset:publish
```

## Component documentation

Public React components must have Storybook coverage.

```bash
npm run storybook
npm run build:storybook
```

Stories should show the stable public props, common variants, disabled or edge states when relevant, and realistic token-backed styling. Avoid documenting private implementation details as API.

## Release checks

Before merging a package-impacting change:

```bash
npm run check
npm run build:storybook
npm run release:dry-run
```

Before publishing manually:

```bash
npm run check
npm run release:dry-run
npm run changeset:publish
```

## License guidance

NSDS uses the [MIT License](./LICENSE), selected from [Choose a License](https://choosealicense.com/licenses/mit/).

New code, images, fonts, and documentation must be original, owned by NoobSociety, or compatible with MIT redistribution. When adding third-party material, document its source and license in the pull request.
