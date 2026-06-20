# Changelog

All notable changes to NSDS are documented here.

## 0.2.0 - 2026-06-20

### Added

- Tailwind preset export for mapping `--ns-*` design tokens into utility classes.
- HUD token file and HUD React primitives for game-layer UI.
- RPG icon React component and icon reference card.
- Lab homepage and game HUD reference surfaces for internal design work.

### Changed

- Package output now builds from JSX source into `dist/` with ESM, CommonJS, TypeScript declarations, CSS, tokens, primitives, and Tailwind preset files.
- Public package surface is React, Tailwind, CSS tokens, and primitives only.
- Canonical component runtime sources now use `.jsx` files.
- README package exports and repo layout now match the published package boundary.

### Removed

- Legacy theme package surface, dependencies, docs, tests, and source files.
- Duplicate compiled component runtime source files.
- Superseded `ui-kits/` homepage path.

## 0.1.2 - 2026-06-18

### Added

- MIT license and public package metadata.
- GitHub Actions CI for package validation, smoke imports, and publish dry runs.
- Repository contribution, security, issue, pull request, and dependency update templates.
- Package validation scripts for exports, required files, and publish hygiene.
- React smoke tests for the public component entry points.
- TypeScript smoke validation for consumer-facing package imports.
- Tailwind preset export for token-mapped utility classes.
- Prioritized README roadmap and reference standards for documentation, changelog, versioning, release, and component documentation workflows.

### Changed

- Updated README language for the public npm package and repository.
- Documented the TypeScript and testing roadmap.

## 0.1.1 - 2026-06-18

### Changed

- Published the package as `@noobsociety/nsds`.
- Updated repository metadata for the public NSDS package.

## 0.1.0 - 2026-06-18

### Added

- Initial NSDS package with tokens, CSS primitives, React components, assets, guidelines, references, and UI kits.
