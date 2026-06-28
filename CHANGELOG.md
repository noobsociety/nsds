# Changelog

All notable changes to NSDS are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Exported the standalone `rpgIconSkins` client registry and `RPGIconSkill` root type so the
  documented RPG icon registry surface matches the generated API reference.

## [0.4.1] - 2026-06-28

### Added

- Added five HUD React components — `HUDChat`, `HUDJoystick`, `HUDMinimap`, `HUDPanel`, and `HUDTabWindow` — each with Storybook stories, component tests, and named exports from `@noobsociety/nsds` and `@noobsociety/nsds/react`.
- Expanded `RPGIcon` to 68 pixel-art glyphs across 11 groups, adding the attack, skills, items, equip, skins, menu, and emote categories with matching name, group, and type registries on `@noobsociety/nsds` and `@noobsociety/nsds/client`.
- Added `HUDBar` bar variants (`hp`, `mp`, `xp`, `stamina`) with optional or hidden labels and segmented fills.
- Added the `--hud-edit-*` editor-chrome token group, plus HUD text-scale, stamina, minimap-path, grid-overlay, and 24×24 canvas/grid tokens, to `tokens/hud.css`.
- Added `components/hud-editor.css` (token-driven in-game HUD editor chrome) to the CSS entry point, and shipped `components/scene-builder.css`, `components/scene-builder.js`, and `components/_card-base.css` as design-system source.

### Changed

- Redrew `RPGIcon` artwork on a 24×24 viewBox (existing glyphs preserved) and renamed the chat emotes to NoobSociety command codes (`emote-tysm`, `emote-sos`, `emote-lol`, `emote-win`, `emote-lgo`, `emote-ugh`, `emote-myb`, `emote-wut`, `emote-grr`).
- Restructured `QuestCard` with a header (gate number and name) and per-status data attributes, and moved quest-card colours onto `--ns-quest-*` tokens.

## [0.4.0] - 2026-06-22

### Added

- Added a `@noobsociety/nsds/client` export for renderer-neutral 21.06 metadata, token references, quest status metadata, and RPG icon registries.
- Added a Node 22 local runtime pin for contributor setup parity with CI.

### Changed

- Extracted shared token, quest status, and RPG icon registry metadata out of React-only modules.
- Removed duplicate primitive stylesheet links from static browser fixtures.

### Fixed

- Added the missing `--hud-divider` alias used by HUD fixture surfaces.

## [0.3.1] - 2026-06-20

### Added

- Stored visual regression snapshots for the public component specimen and UI kit surfaces.

### Changed

- Tailwind preset source is now first-class TypeScript with generated CommonJS and declaration output.
- Package validation now requires the visual fixture, visual snapshots, and generated Tailwind preset output.

## [0.3.0] - 2026-06-20

### Added

- First-class TypeScript component source with generated declaration output.
- Component tests for class names, variants, invalid runtime values, and accessibility attributes.
- Package export linting, packed install checks, and Tailwind preset type validation.
- Diataxis-style public docs, generated API reference, and static landing page.
- Browser-rendered visual checks for the public component specimen surface.

### Changed

- Storybook stories now use typed `.tsx` examples and include a full component showcase.
- CI and release checks now install the browser needed for visual coverage.

## [0.2.1] - 2026-06-20

### Added

- Project README structure for install, usage, package exports, development, release, and license guidance.
- Changesets configuration and release scripts for version intent and publishing.
- Storybook configuration and component stories for the public React package surface.
- Release workflow for Changesets version pull requests and npm publishing.

### Changed

- Contribution guidance now documents SemVer, changelog, release, component documentation, and license expectations.
- Public documentation now describes only the package source and published package surface.

### Removed

- Design-source and prototype artifacts from the public repository tree.

## [0.2.0] - 2026-06-20

### Added

- Tailwind preset export for mapping `--ns-*` design tokens into utility classes.
- HUD token file and HUD React primitives for game-layer UI.
- RPG icon React component and icon catalog support.

### Changed

- Package output now builds from JSX source into `dist/` with ESM, CommonJS, TypeScript declarations, CSS, tokens, primitives, and Tailwind preset files.
- Public package surface is React, Tailwind, CSS tokens, and primitives only.
- Canonical component runtime sources now use `.jsx` files.
- README package exports and repo layout now match the published package boundary.

### Removed

- Legacy theme package surface, dependencies, docs, tests, and source files.
- Duplicate compiled component runtime source files.
- Superseded `ui-kits/` homepage path.

## [0.1.2] - 2026-06-18

### Added

- MIT license and public package metadata.
- GitHub Actions CI for package validation, smoke imports, and publish dry runs.
- Repository contribution, security, issue, pull request, and dependency update templates.
- Package validation scripts for exports, required files, and publish hygiene.
- React smoke tests for the public component entry points.
- TypeScript smoke validation for consumer-facing package imports.
- Tailwind preset export for token-mapped utility classes.
- Prioritized README roadmap and documentation, changelog, versioning, release, and component documentation workflows.

### Changed

- Updated README language for the public npm package and repository.
- Documented the TypeScript and testing roadmap.

## [0.1.1] - 2026-06-18

### Changed

- Published the package as `@noobsociety/nsds`.
- Updated repository metadata for the public NSDS package.

## [0.1.0] - 2026-06-18

### Added

- Initial NSDS package with tokens, CSS primitives, React components, and Tailwind support.

[Unreleased]: https://github.com/noobsociety/nsds/compare/v0.4.1...HEAD
[0.4.1]: https://github.com/noobsociety/nsds/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/noobsociety/nsds/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/noobsociety/nsds/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/noobsociety/nsds/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/noobsociety/nsds/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/noobsociety/nsds/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/noobsociety/nsds/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/noobsociety/nsds/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/noobsociety/nsds/releases/tag/v0.1.0
