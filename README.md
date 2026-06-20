# NoobSociety Design System

Reusable design tokens, CSS primitives, Tailwind preset, and pixel-art React components for NoobSociety.

NSDS is Tailwind-first and token-driven. It ships the public package surface needed by product apps while keeping design guidelines, lab pages, and source cards in the repository for design-system development.

## Contents

- [Install](#install)
- [Quick start](#quick-start)
- [Package exports](#package-exports)
- [Components](#components)
- [Design files](#design-files)
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

| Export | Purpose |
| --- | --- |
| `@noobsociety/nsds` | React components |
| `@noobsociety/nsds/react` | Compatibility alias for React components |
| `@noobsociety/nsds/tailwind` | Tailwind preset mapped to `--ns-*` tokens |
| `@noobsociety/nsds/styles` | Full CSS entry |
| `@noobsociety/nsds/styles.css` | CSS entry compatibility alias |
| `@noobsociety/nsds/tokens/*` | Individual token CSS files |
| `@noobsociety/nsds/primitives` | Component primitive CSS |
| `@noobsociety/nsds/components/primitives.css` | Component primitive CSS compatibility alias |

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

## Design files

| Path | Purpose |
| --- | --- |
| `styles.css` | Public CSS entry point |
| `tokens/` | CSS custom properties for color, type, spacing, motion, and HUD values |
| `components/` | React components, TypeScript declarations, primitive CSS, cards, and stories |
| `tailwind/` | Tailwind preset source |
| `guidelines/` | Design-system guidance cards |
| `_lab/` | Internal lab pages and experiments |
| `assets/` | Product sprites and imagery for lab and guideline surfaces |

## Development

Use Node.js 22 or newer.

```bash
npm install
npm run check
```

Common scripts:

| Script | Purpose |
| --- | --- |
| `npm run build` | Build the package into `dist/` |
| `npm run check` | Build, validate package metadata, type-check, and smoke-test imports |
| `npm run storybook` | Start component documentation locally |
| `npm run build:storybook` | Build static component documentation |
| `npm run release:dry-run` | Preview the npm package contents |
| `npm run changeset` | Add a release note and version intent |

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

Publishing is handled through the release workflow on `main` when `NPM_TOKEN` is configured. Manual publishing remains available for maintainers after the version commit is prepared:

```bash
npm run check
npm run release:dry-run
npm run changeset:publish
```

## License

NSDS is released under the [MIT License](./LICENSE). MIT was selected using the guidance at [Choose a License](https://choosealicense.com/licenses/mit/) because it permits broad reuse with attribution and warranty disclaimers.

Only add third-party code, assets, or documentation when the license is compatible with MIT and the source is documented in the relevant change.
