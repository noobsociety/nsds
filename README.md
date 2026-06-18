# NoobSociety Design System

**NSDS** is the reusable NoobSociety Design System package: design tokens, CSS primitives, React components, MUI theme source, pixel assets, and reference UI kits for building NoobSociety interfaces.

The system is built around a simple rule: **Monokai colors are semantic foregrounds, dark surfaces are the world canvas.**

## Install

Install from npm after publish:

```bash
npm install @noobsociety/nsds
```

Use a local workspace package before publish:

```json
{
  "dependencies": {
    "@noobsociety/nsds": "file:../design-system"
  }
}
```

## Usage

Import the full CSS entry when you want tokens, base styles, and shared primitives:

```js
import '@noobsociety/nsds/styles.css';
```

Use React components with the CSS entry:

```jsx
import '@noobsociety/nsds/styles.css';
import { Button, FeatureCard, QuestCard, SectionArrow } from '@noobsociety/nsds/react';

export function Example() {
  return (
    <Button href="https://noobsociety.com">▶ Enter the world</Button>
  );
}
```

Use individual token or asset files when a project only needs part of the system:

```js
import '@noobsociety/nsds/tokens/colors.css';
import logoUrl from '@noobsociety/nsds/assets/logo.png';
```

Use the MUI theme in TypeScript-aware app bundlers:

```ts
import { NSThemeProvider, theme, NS } from '@noobsociety/nsds/mui';
```

The MUI entry currently exports source TypeScript. Add a build step before publishing to consumers that require plain JavaScript MUI runtime files.

## Package Exports

| Export | Purpose |
|---|---|
| `@noobsociety/nsds` | Root React component entry |
| `@noobsociety/nsds/react` | React components |
| `@noobsociety/nsds/mui` | MUI theme source |
| `@noobsociety/nsds/styles.css` | Full CSS entry |
| `@noobsociety/nsds/package.json` | Package metadata |
| `@noobsociety/nsds/components/primitives.css` | Component primitive classes only |
| `@noobsociety/nsds/tokens/*` | Individual token CSS files |
| `@noobsociety/nsds/assets/*` | Pixel assets and brand images |
| `@noobsociety/nsds/guidelines/*` | Specimen cards |
| `@noobsociety/nsds/references/*` | Polished `.dc.html` references |
| `@noobsociety/nsds/ui-kits/*` | Complete UI kits |

## Design Model

### Monokai Foregrounds

Monokai colors are used on top of the canvas: text, icons, borders, buttons, status pills, accents, and interaction states. Each hue has one semantic role. Do not reassign a color to a different role.

| Token | Hex | Role |
|---|---|---|
| `--ns-ink` | `#f8f8f2` | Primary text |
| `--ns-ink-faint` | `#75715e` | Muted text, captions, placeholders |
| `--ns-gold` | `#e6db74` | Primary accent, CTAs, eyebrows, active nav |
| `--ns-green` | `#a6e22e` | Success, live state, `HOLDS` |
| `--ns-orange` | `#fd971f` | In progress, active state, `BUILDING` |
| `--ns-cyan` | `#66d9e8` | Planned, info, links |
| `--ns-pink` | `#f92672` | Highlight, danger, high-energy accent |
| `--ns-purple` | `#ae81ff` | Decorative, personal, tertiary accent |

### Dark Canvas

Dark colors sit underneath the Monokai foregrounds. They define the world canvas, raised surfaces, headers, cards, and overlays.

| Token | Hex | Role |
|---|---|---|
| `--ns-bg-0` | `#1a1a16` | Deepest surface: footer, sidebar, backdrop |
| `--ns-bg-1` | `#272822` | Page base |
| `--ns-bg-2` | `#32332b` | Raised surface, icon slot, input fill |
| `--ns-glass` | `rgba(30,31,26,.88)` | Card and header glass |

The default experience is dark. Do not introduce a light-mode default unless it is intentionally designed as a separate theme.

## Content Rules

- **Voice:** Direct, honest, playful. Not corporate.
- **Casing:** Sentence case. Title case only for names and proper nouns.
- **Length:** Short sentences. One idea per sentence.
- **Emoji:** Avoid emoji. Use pixel accents such as `✦`, `▶`, `★`, `✓`, and `◌` when useful.
- **Numbers:** Use numbers only when they are specific and meaningful.
- **Perspective:** Speak directly. Avoid abstract phrases like "users" and "visitors" when "you" is clearer.

## Visual Rules

### Typography

- `Press Start 2P`: wordmark, buttons, status pills, card labels, section accents, and pixel UI.
- `Inter`: body copy, navigation, subtitles, paragraphs, and dense information.
- Pixel text must use generous line height. Keep it short.
- Body copy should stay readable and calm.

### Layout

- Base spacing follows a 4px grid.
- Default container width is `1080px`.
- Full sections use `min-height: calc(100svh - var(--ns-header-h))`.
- Responsive baseline: `375x667` portrait and `667x375` landscape.

### Cards

- Use glass surfaces with `10px` radius.
- Do not add resting drop shadows.
- Use hover elevation only: `translateY(-4px)` plus the card hover shadow.

### Buttons

- Primary `play` buttons use gold fill, dark text, a gold border, and a physical press shadow.
- `ghost` buttons stay transparent until hover.
- Buttons use `Press Start 2P`.

### Motion

- Keep interaction motion fast: `150ms ease-out`.
- Keep decorative motion subtle.
- Respect reduced motion; `ns-*` animations are disabled under `prefers-reduced-motion: reduce`.

## Component Notes

### Button

Use for primary and secondary actions.

```jsx
<Button variant="play" href="https://noobsociety.com">▶ Enter the world</Button>
<Button variant="ghost" href="https://github.com/noobsociety">★ Star on GitHub</Button>
<Button variant="play" size="sm">▶ Play</Button>
```

### FeatureCard

Use for short feature grids. Render inside a `ul`.

```jsx
<FeatureCard
  icon={<CursorIcon />}
  title="The site is a world"
  body="Pages are maps, links are interactables."
  tag="Spatial"
/>
```

### QuestCard

Use for gate or roadmap states. Render inside an `ol`.

```jsx
<QuestCard
  gate={3}
  title="Objects"
  body="In-space sections open content."
  status="active"
/>
```

Status mapping:

| Status | Label | Color |
|---|---|---|
| `done` | `HOLDS` | `--ns-green` |
| `active` | `BUILDING` | `--ns-orange` |
| `planned` | `PLANNED` | `--ns-cyan` |
| `locked` | `LATER` | `--ns-ink-faint` |

## File Index

| Path | Contents |
|---|---|
| `package.json` | Package metadata, exports, peer dependencies |
| `index.js` / `index.d.ts` | Root React component entry point |
| `styles.css` | Global CSS entry point |
| `support.js` | Runtime support for root `.dc.html` references |
| `tokens/` | Color, typography, spacing, motion, and base CSS tokens |
| `components/primitives.css` | Shared CSS primitives |
| `components/react/` | Public React component barrel export |
| `components/buttons/` | Button component, types, prompt, specimen |
| `components/cards/` | FeatureCard and QuestCard components, types, prompts, specimens |
| `components/navigation/` | SectionArrow component, types, specimen |
| `mui-theme/` | MUI theme source and examples |
| `assets/` | Logo, sprites, and world imagery |
| `guidelines/` | Visual specimen cards |
| `references/` | Polished `.dc.html` references |
| `ui-kits/` | Complete UI kits |
| `SKILL.md` | Agent skill definition |

## Repository

Source repository: `https://github.com/noobsociety/nsds`

The current package is ready for local reuse and npm publication as `@noobsociety/nsds@0.1.0`. License is intentionally unset until a license is chosen.
