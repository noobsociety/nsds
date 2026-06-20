# Task: Publish `@noobsociety/nsds` to npm

## Sync the extracted zip into your repo first

Before doing anything, sync the latest design system files into your local `nsds` repo. Run from the repo root after extracting the zip alongside it:

```bash
# 1. Copy all new/modified files in
cp -r nsds-extracted/. .

# 2. Remove files deleted this session
rm -f "components/hud/HUDIcon.jsx"
rm -f "components/hud/HUDIcon.d.ts"
rm -f "Grid Layout.html"
rm -rf "ui_kits/"

# 3. Confirm the new structure
ls components/icons/     # RPGIcon.jsx  RPGIcon.d.ts  rpgicons.card.html
ls _lab/                 # game/  homepage/  CODEX_NPM_PUBLISH.md  mui-theme.archive.html
ls tailwind/preset.js    # should exist

# 4. Stage and push
git add -A
git status               # review — new files green, deleted files red
git commit -m "chore: reorganise DS — RPGIcon, _lab/, token fixes, Tailwind preset, npm prep"
git push
```

---

## What this repo is

A design system for the NoobSociety pixel-art MMO website, built on three pillars:

1. **Monokai + dark mode** — the visual foundation. Monokai palette as semantic CSS custom properties on dark surfaces. No light mode as a default.
2. **TypeScript + React** — all components are typed React. No class components.
3. **Tailwind CSS** — the styling layer. NSDS ships a Tailwind preset (`tailwind.preset.js`) that maps every `--ns-*` token into Tailwind's theme so consumers get `text-ns-gold`, `bg-ns-bg-1`, `rounded-ns-md` etc. automatically.

The package ships:
- **CSS tokens** — Monokai color palette, type scale, spacing, motion, and HUD-specific tokens (`styles.css` + `tokens/`)
- **Tailwind preset** — `tailwind.preset.js` maps all `--ns-*` tokens to Tailwind theme keys
- **React components** — Button, FeatureCard, QuestCard, HUDBar, HUDDivider, HUDLabel, RPGIcon, SectionArrow (typed JSX, no MUI dependency)
- **CSS primitives** — shared utility classes (`components/primitives.css`)

---

## Public API — what goes in the npm package

Include **only** these paths:

```
styles.css
tailwind/
  preset.js
tokens/
  colors.css
  typography.css
  spacing.css
  motion.css
  hud.css
  base.css
components/
  primitives.css
  shared/styles.js
  buttons/Button.jsx
  buttons/Button.d.ts
  cards/FeatureCard.jsx
  cards/FeatureCard.d.ts
  cards/QuestCard.jsx
  cards/QuestCard.d.ts
  hud/HUDBar.jsx
  hud/HUDBar.d.ts
  hud/HUDDivider.jsx
  hud/HUDDivider.d.ts
  hud/HUDLabel.jsx
  hud/HUDLabel.d.ts
  icons/RPGIcon.jsx
  icons/RPGIcon.d.ts
  navigation/SectionArrow.jsx
  navigation/SectionArrow.d.ts
```

Do **not** include:
- `_lab/` — internal NS-team design tools (compiler skips underscore-prefix folders entirely)
- `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — compiler artefacts
- `assets/` — game sprites, not DS primitives
- `guidelines/` — DS-tab cards, not for npm consumers
- `templates/` — DC templates for the in-house editor
- `uploads/` — scratch files
- `readme.md`, `SKILL.md` — internal docs

---

## Build requirements

Source components are JSX. Transpile to plain JS before publishing using **Vite** (library mode).

**Output targets:**

| Format | Path | Use |
|---|---|---|
| ESM | `dist/index.js` | Tree-shakeable imports |
| CJS | `dist/index.cjs` | CommonJS fallback |
| Types | `dist/index.d.ts` | Re-exports all `.d.ts` types |

Copy all CSS files and `tailwind.preset.js` into `dist/` after the JS build.

**Entry barrel (`src/index.js`):**
```js
export { Button }                   from './components/buttons/Button.jsx';
export { FeatureCard }              from './components/cards/FeatureCard.jsx';
export { QuestCard }                from './components/cards/QuestCard.jsx';
export { HUDBar }                   from './components/hud/HUDBar.jsx';
export { HUDDivider }               from './components/hud/HUDDivider.jsx';
export { HUDLabel }                 from './components/hud/HUDLabel.jsx';
export { RPGIcon, HUDIcon }         from './components/icons/RPGIcon.jsx';
export { SectionArrow }             from './components/navigation/SectionArrow.jsx';
```

---

## `package.json`

```json
{
  "name": "@noobsociety/nsds",
  "version": "1.0.0",
  "description": "NoobSociety Design System — Monokai dark tokens, Tailwind preset, pixel-art React components, HUD primitives",
  "license": "MIT",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types":   "./dist/index.d.ts"
    },
    "./tailwind":   "./dist/tailwind/preset.js",
    "./styles":     "./dist/styles.css",
    "./tokens/*":   "./dist/tokens/*",
    "./primitives": "./dist/components/primitives.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "vite build && node scripts/copy-assets.mjs",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^3.0.0"
  },
  "keywords": ["design-system", "react", "tailwind", "monokai", "pixel-art", "noobsociety"],
  "repository": {
    "type": "git",
    "url": "https://github.com/noobsociety/nsds"
  }
}
```

---

## Vite config (`vite.config.js`)

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'JSXRuntime',
        },
      },
    },
    copyPublicDir: false,
  },
});
```

## Asset copy script (`scripts/copy-assets.mjs`)

```js
import { cpSync, mkdirSync } from 'fs';

// CSS tokens
mkdirSync('dist/tokens', { recursive: true });
cpSync('tokens', 'dist/tokens', { recursive: true });

// Primitives
mkdirSync('dist/components', { recursive: true });
cpSync('components/primitives.css', 'dist/components/primitives.css');

// Root CSS + Tailwind preset
cpSync('styles.css', 'dist/styles.css');
mkdirSync('dist/tailwind', { recursive: true });
cpSync('tailwind/preset.js', 'dist/tailwind/preset.js');
```

---

## TypeScript barrel (`dist/index.d.ts`)

```ts
export { Button, type ButtonProps }             from '../components/buttons/Button';
export { FeatureCard, type FeatureCardProps }   from '../components/cards/FeatureCard';
export { QuestCard, type QuestCardProps }       from '../components/cards/QuestCard';
export { HUDBar, type HUDBarProps }             from '../components/hud/HUDBar';
export { HUDDivider, type HUDDividerProps }     from '../components/hud/HUDDivider';
export { HUDLabel, type HUDLabelProps }         from '../components/hud/HUDLabel';
export { RPGIcon, HUDIcon, type RPGIconProps, type RPGIconName } from '../components/icons/RPGIcon';
export { SectionArrow }                         from '../components/navigation/SectionArrow';
```

---

## How consumers use the package

```bash
npm install @noobsociety/nsds
```

**Tailwind config:**
```ts
// tailwind.config.ts
import nsdPreset from '@noobsociety/nsds/tailwind';

export default {
  presets: [nsdPreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

**Global CSS:**
```css
@import '@noobsociety/nsds/styles';
```

**React components:**
```tsx
import { Button, RPGIcon, HUDBar } from '@noobsociety/nsds';

<Button variant="play" size="md">▶ Enter the world</Button>
<RPGIcon name="sword" size={22} />
<HUDBar value={30} max={40} fillColor="var(--hud-hp-fill)" />
```

**Tailwind classes (after preset):**
```tsx
<div className="bg-ns-bg-1 text-ns-ink font-pixel rounded-ns-md">
  <span className="text-ns-gold font-ns-semibold">Rainbow Star</span>
</div>
```

---

## Publish steps

```bash
npm run build            # transpile + copy CSS + copy tailwind preset
npm pack --dry-run       # verify dist/ — confirm no _lab/, assets/, guidelines/ included
npm publish --access public
```

If first publish under `@noobsociety`:
```bash
npm login
npm org ls noobsociety   # confirm org membership + publish rights
```

---

## Notes

- **`HUDIcon`** is a backward-compat alias for `RPGIcon`. Export both.
- **`shared/styles.js`** (`cx`, `mergeStyles`, `NS`, `questStatus`) — bundle it, do not export it publicly.
- **CSS custom properties are not scoped** — defined on `:root`. Intentional.
- **HUD tokens (`--hud-*`)** are game-layer only. The Tailwind preset does NOT map them — they are only used by the custom HUD components and the Phaser game layer, not general UI.
- **No MUI** — the stack is Phaser 3 + React + Tailwind. There is no MUI dependency anywhere. Do not add one.
