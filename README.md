# NoobSociety Design System

[![CI](https://github.com/noobsociety/nsds/actions/workflows/ci.yml/badge.svg)](https://github.com/noobsociety/nsds/actions/workflows/ci.yml)
[![Release](https://github.com/noobsociety/nsds/actions/workflows/release.yml/badge.svg)](https://github.com/noobsociety/nsds/actions/workflows/release.yml)
[![npm version](https://img.shields.io/npm/v/@noobsociety/nsds.svg)](https://www.npmjs.com/package/@noobsociety/nsds)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Reusable design tokens, client registries, CSS primitives, Tailwind preset, and pixel-art React components for NoobSociety.

NSDS is Tailwind-first and token-driven. It ships the public package surface needed by product apps: client registries, React components, CSS tokens, primitives, and a Tailwind preset.

## Contents

- [Install](#install)
- [Quick start](#quick-start)
- [Package exports](#package-exports)
- [Components](#components)
- [Documentation](#documentation)
- [Quality](#quality)
- [Repository layout](#repository-layout)
- [Development](#development)
- [Versioning and releases](#versioning-and-releases)
- [License](#license)

## Install

```bash
npm install @noobsociety/nsds
```

Peer dependencies:

```bash
npm install react react-dom
```

## Quick start

Import the CSS entry once in your app:

```tsx
import '@noobsociety/nsds/styles';
```

Use renderer-neutral client registries when code needs shared names without React:

```ts
import { nsClientRelease, rpgIconNames } from '@noobsociety/nsds/client';

console.log(nsClientRelease, rpgIconNames.includes('sword'));
```

Use React components from the package root:

```tsx
import { Button, FeatureCard, HUDBar, RPGIcon } from '@noobsociety/nsds';

export function Example() {
  return (
    <FeatureCard
      icon={<RPGIcon name="sword" />}
      title="World UI"
      body="Pixel-art components mapped to NSDS tokens."
      tag="Live"
    />
  );
}
```

Use the Tailwind preset in product apps:

```js
import nsdsPreset from '@noobsociety/nsds/tailwind';

export default {
  presets: [nsdsPreset],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

## Package exports

| Export                                        | Purpose                                                |
| --------------------------------------------- | ------------------------------------------------------ |
| `@noobsociety/nsds`                           | React components                                       |
| `@noobsociety/nsds/react`                     | Compatibility alias for React components               |
| `@noobsociety/nsds/client`                    | Renderer-neutral client registries and shared metadata |
| `@noobsociety/nsds/tailwind`                  | Tailwind preset mapped to `--ns-*` tokens              |
| `@noobsociety/nsds/styles`                    | Full CSS entry                                         |
| `@noobsociety/nsds/styles.css`                | CSS entry compatibility alias                          |
| `@noobsociety/nsds/tokens/*`                  | Individual token CSS files                             |
| `@noobsociety/nsds/primitives`                | Component primitive CSS                                |
| `@noobsociety/nsds/components/primitives.css` | Component primitive CSS compatibility alias            |

The npm package ships `dist/` plus package metadata, changelog, contribution guidance, security policy, and license.

## Components

Public React components:

- `Button`
- `FeatureCard`
- `QuestCard`
- `HUDBar`
- `HUDDivider`
- `HUDLabel`
- `RPGIcon`
- `HUDIcon`
- `SectionArrow`

Run Storybook for component documentation:

```bash
npm run storybook
```

Build static Storybook documentation:

```bash
npm run build:storybook
```

## Documentation

Public docs live in [`docs/`](./docs/README.md) and follow the Diataxis model:

- tutorials for first-time setup
- how-to guides for integration tasks
- reference pages for exports, tokens, classes, and generated API details
- explanation pages for design, accessibility, and versioning decisions

Generate the API reference from TypeScript source:

```bash
npm run docs:api
```

The static landing page lives in [`site/`](./site/index.html).

## Quality

See [QUALITY.md](./QUALITY.md) for the package gate, release evidence, visual baseline policy, and
tagging rules.

Before opening a pull request, run:

```bash
npm run check
npm run build:storybook
npm run release:dry-run
```

## Repository layout

| Path          | Purpose                                                                |
| ------------- | ---------------------------------------------------------------------- |
| `styles.css`  | Public CSS entry point                                                 |
| `client/`     | Renderer-neutral client registry entry point                           |
| `tokens/`     | CSS custom properties for color, type, spacing, motion, and HUD values |
| `components/` | TypeScript React source, primitive CSS, and Storybook stories          |
| `tailwind/`   | Tailwind preset source                                                 |
| `docs/`       | Public documentation and generated API reference                       |
| `site/`       | Static public landing page                                             |
| `tests/`      | Component and browser-rendered visual checks                           |

## Development

Use Node.js 22 or newer. The repo pins Node 22 in `.nvmrc` for parity with CI; with nvm, run
`nvm use` to match it.

```bash
nvm use
npm install
npm run check
```

Common scripts:

| Script                    | Purpose                                                                |
| ------------------------- | ---------------------------------------------------------------------- |
| `npm run build`           | Build the package into `dist/`                                         |
| `npm run check`           | Run build, package guards, type checks, tests, and import smoke checks |
| `npm run check:content`   | Catch local path leaks in committed text                               |
| `npm run check:commits`   | Validate branch commit messages with Commitlint                        |
| `npm run check:deps`      | Validate dependency pins and cross-platform lockfile coverage          |
| `npm run check:docs`      | Regenerate API docs and fail when generated docs drift                 |
| `npm run check:exports`   | Validate npm exports and declaration entry points                      |
| `npm run check:install`   | Install the packed package in a temporary consumer project             |
| `npm run check:markdown`  | Lint authored Markdown docs and templates                              |
| `npm run check:package`   | Validate package metadata, required files, and dist shape              |
| `npm run check:release`   | Validate release scripts, changelog links, and tag workflow wiring     |
| `npm run check:workflows` | Validate GitHub workflow syntax and Node 22 pins                       |
| `npm run docs:api`        | Generate markdown API reference from TypeScript source                 |
| `npm run format:check`    | Check repository formatting with Prettier                              |
| `npm run lint`            | Lint source, tests, scripts, and configs with ESLint                   |
| `npm run storybook`       | Start component documentation locally                                  |
| `npm run build:storybook` | Build static component documentation                                   |
| `npm run test:components` | Run component behavior tests                                           |
| `npm run test:visual`     | Run browser-rendered visual checks                                     |
| `npm run release:dry-run` | Preview the npm package contents                                       |
| `npm run changeset`       | Add a release note and version intent                                  |

## Versioning and releases

NSDS follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). All release notes use [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) categories.

Use Changesets for release intent:

```bash
npm run changeset
```

Maintainers create release commits with:

```bash
npm run changeset:version
```

That command applies Changesets version bumps and promotes the current `[Unreleased]` changelog entries into a dated release section.

Open and merge the version commit as a normal release pull request. The release workflow publishes from `main` when the package version is not already on npm and `NPM_TOKEN` is configured.

After a successful new publish, the workflow creates an annotated `vX.Y.Z` tag on the published
commit. Tag messages use the NoobSociety release-note style: one concise subject, one factual
paragraph, and a footprint sentence grounded in the release diff.

Manual publishing remains available for maintainers after the version commit is prepared:

```bash
npm run check
npm run release:dry-run
npm run changeset:publish
```

## License

NSDS is released under the [MIT License](./LICENSE). MIT was selected using the guidance at [Choose a License](https://choosealicense.com/licenses/mit/) because it permits broad reuse with attribution and warranty disclaimers.

Only add third-party code, assets, or documentation when the license is compatible with MIT and the source is documented in the relevant change.
