# Codex Sync: DS Project → Local `nsds` Repo

## 0 — Sync DS project files first

A zip of the design system project has been downloaded as **"NoobSociety Design System.zip"**.
Extract it, then copy the files below into `~/Projects/nsds/` **before** making any other changes.
Do NOT overwrite the npm infrastructure files — the local repo has better versions of those.

```bash
# Extract the zip (adjust path as needed)
unzip ~/Downloads/"NoobSociety Design System.zip" -d ~/Downloads/nsds-ds

DS=~/Downloads/nsds-ds
REPO=~/Projects/nsds

# ── Tokens ────────────────────────────────────────────────────────────────
cp $DS/tokens/colors.css     $REPO/tokens/colors.css
cp $DS/tokens/hud.css        $REPO/tokens/hud.css
cp $DS/tokens/typography.css $REPO/tokens/typography.css
cp $DS/tokens/spacing.css    $REPO/tokens/spacing.css
cp $DS/tokens/motion.css     $REPO/tokens/motion.css
cp $DS/tokens/base.css       $REPO/tokens/base.css

# ── Components ────────────────────────────────────────────────────────────
cp $DS/components/shared/styles.js            $REPO/components/shared/styles.js
cp $DS/components/cards/FeatureCard.jsx       $REPO/components/cards/FeatureCard.jsx
cp $DS/components/hud/hud.card.html           $REPO/components/hud/hud.card.html
cp $DS/components/icons/RPGIcon.jsx           $REPO/components/icons/RPGIcon.jsx
cp $DS/components/icons/RPGIcon.d.ts          $REPO/components/icons/RPGIcon.d.ts
cp $DS/components/icons/rpgicons.card.html    $REPO/components/icons/rpgicons.card.html

# ── Guidelines ────────────────────────────────────────────────────────────
# Copy all guideline cards EXCEPT mui-theme (archived below)
for f in $DS/guidelines/*.html; do
  name=$(basename "$f")
  [ "$name" = "mui-theme.card.html" ] && continue
  cp "$f" "$REPO/guidelines/$name"
done

# ── Lab files ─────────────────────────────────────────────────────────────
cp $DS/_lab/game/index.html          $REPO/_lab/game/index.html
cp $DS/_lab/homepage/index.html      $REPO/_lab/homepage/index.html
cp $DS/_lab/CODEX_NPM_PUBLISH.md    $REPO/_lab/CODEX_NPM_PUBLISH.md
cp $DS/_lab/CODEX_SYNC.md           $REPO/_lab/CODEX_SYNC.md
cp $DS/_lab/mui-theme.archive.html  $REPO/_lab/mui-theme.archive.html

# ── Tailwind preset (new — create folder first) ───────────────────────────
mkdir -p $REPO/tailwind
cp $DS/tailwind/preset.js $REPO/tailwind/preset.js

# ── Root ──────────────────────────────────────────────────────────────────
cp $DS/SKILL.md    $REPO/SKILL.md
cp $DS/readme.md   $REPO/readme.md
cp $DS/styles.css  $REPO/styles.css

# ── Delete superseded files ───────────────────────────────────────────────
rm -f  $REPO/guidelines/mui-theme.card.html   # archived to _lab/
rm -rf $REPO/ui-kits/                          # superseded by _lab/

echo "Sync done. Do NOT copy: package.json, vite.config.js, src/, mui-theme/, scripts/, tsconfig.json, index.js, index.d.ts, README.md, CHANGELOG.md, CONTRIBUTING.md, LICENSE, SECURITY.md, templates/, assets/"
```

---

## Context: actual architecture

The DS has three pillars:
1. **Monokai + dark mode** — CSS custom properties in `tokens/`
2. **TypeScript + React** — typed JSX components, no MUI dependency in component files
3. **Tailwind CSS** — `tailwind/preset.js` maps all `--ns-*` tokens into Tailwind theme

The **MUI theme** (`mui-theme/`) is a **fourth, optional export** — a full `createTheme()`
that maps NS tokens to MUI v5 palette + component overrides. It is a separate
entry point (`@noobsociety/nsds/mui`), not bundled with the components.

---

## 1 — DELETE

| Path | Reason |
|---|---|
| `guidelines/mui-theme.card.html` | Archived. Rename → `_lab/mui-theme.archive.html` |
| `ui-kits/` (entire folder) | Superseded by `_lab/`. Remove it. |

```bash
mv guidelines/mui-theme.card.html _lab/mui-theme.archive.html
rm -rf ui-kits/
```

---

## 2 — ADD

These files exist in the DS project but not in the local repo.

### `tailwind/preset.js` (NEW FILE)

Create `tailwind/preset.js` with this content — maps every `--ns-*` CSS token into
Tailwind theme keys. HUD tokens (`--hud-*`) are intentionally excluded (game layer only).

```js
/**
 * NoobSociety Design System — Tailwind CSS preset
 *
 * Usage in tailwind.config.js / tailwind.config.ts:
 *   import nsdPreset from '@noobsociety/nsds/tailwind';
 *   export default { presets: [nsdPreset], content: ['./src/**\/*.{ts,tsx}'] };
 */

/** @type {import('tailwindcss').Config} */
const nsdPreset = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ns: {
          bg:     { 0: 'var(--ns-bg-0)', 1: 'var(--ns-bg-1)', 2: 'var(--ns-bg-2)', glass: 'var(--ns-glass)' },
          ink:    { DEFAULT: 'var(--ns-ink)', dim: 'var(--ns-ink-dim)', faint: 'var(--ns-ink-faint)' },
          gold:   { DEFAULT: 'var(--ns-gold)', pale: 'var(--ns-gold-pale)', deep: 'var(--ns-gold-deep)', shadow: 'var(--ns-gold-shadow)', fg: 'var(--ns-gold-btn-fg)' },
          green:  'var(--ns-green)',
          cyan:   'var(--ns-cyan)',
          orange: 'var(--ns-orange)',
          pink:   'var(--ns-pink)',
          purple: 'var(--ns-purple)',
          accent: 'var(--ns-accent)',
          line:   'var(--ns-line)',
        },
      },
      fontFamily: {
        body:  ['var(--ns-font-body)',  { fallback: ['system-ui', 'sans-serif'] }],
        pixel: ['var(--ns-font-pixel)', { fallback: ['monospace'] }],
      },
      fontSize: {
        'ns-xs':   ['var(--ns-text-xs)',   { lineHeight: 'var(--ns-leading-normal)' }],
        'ns-sm':   ['var(--ns-text-sm)',   { lineHeight: 'var(--ns-leading-normal)' }],
        'ns-base': ['var(--ns-text-base)', { lineHeight: 'var(--ns-leading-normal)' }],
        'ns-lg':   ['var(--ns-text-lg)',   { lineHeight: 'var(--ns-leading-snug)'   }],
        'ns-xl':   ['var(--ns-text-xl)',   { lineHeight: 'var(--ns-leading-snug)'   }],
        'ns-2xl':  ['var(--ns-text-2xl)',  { lineHeight: 'var(--ns-leading-tight)'  }],
        'ns-3xl':  ['var(--ns-text-3xl)',  { lineHeight: 'var(--ns-leading-tight)'  }],
        'ns-4xl':  ['var(--ns-text-4xl)',  { lineHeight: 'var(--ns-leading-tight)'  }],
      },
      fontWeight: {
        'ns-normal':   'var(--ns-weight-normal)',
        'ns-medium':   'var(--ns-weight-medium)',
        'ns-semibold': 'var(--ns-weight-semibold)',
        'ns-bold':     'var(--ns-weight-bold)',
      },
      lineHeight: {
        'ns-tight':   'var(--ns-leading-tight)',
        'ns-snug':    'var(--ns-leading-snug)',
        'ns-normal':  'var(--ns-leading-normal)',
        'ns-relaxed': 'var(--ns-leading-relaxed)',
      },
      spacing: {
        'ns-1': 'var(--ns-space-1)', 'ns-2': 'var(--ns-space-2)',
        'ns-3': 'var(--ns-space-3)', 'ns-4': 'var(--ns-space-4)',
        'ns-5': 'var(--ns-space-5)', 'ns-6': 'var(--ns-space-6)',
        'ns-8': 'var(--ns-space-8)', 'ns-10': 'var(--ns-space-10)',
        'ns-12': 'var(--ns-space-12)', 'ns-16': 'var(--ns-space-16)',
        'ns-20': 'var(--ns-space-20)',
      },
      maxWidth:      { 'ns-container': 'var(--ns-container)' },
      height:        { 'ns-header': 'var(--ns-header-h)' },
      borderRadius:  { 'ns-sm': 'var(--ns-radius-sm)', 'ns-md': 'var(--ns-radius-md)', 'ns-lg': 'var(--ns-radius-lg)', 'ns-xl': 'var(--ns-radius-xl)', 'ns-full': 'var(--ns-radius-full)' },
      boxShadow:     { 'ns-card-hover': 'var(--ns-shadow-card-hover)', 'ns-btn': 'var(--ns-shadow-btn)' },
      transitionDuration:      { 'ns-fast': 'var(--ns-dur-fast)', 'ns-base': 'var(--ns-dur-base)', 'ns-slow': 'var(--ns-dur-slow)' },
      transitionTimingFunction: { 'ns-out': 'var(--ns-ease-out)', 'ns-spring': 'var(--ns-ease-spring)' },
      ringColor:     { 'ns-focus': 'var(--ns-focus-ring)' },
    },
  },
  plugins: [],
};

module.exports = nsdPreset;
```

### `guidelines/tailwind.card.html` (NEW FILE)

Copy from the DS project — a `@dsCard group="Spacing"` card that shows the full
Tailwind class reference (colors, type, spacing, radii, shadows, transitions, and
a className extension example). File is ~7 KB.

---

## 3 — UPDATE

### `components/shared/styles.js`

**Problem:** `NS` (uppercase) is exposed as a component on the DS window namespace
because the compiler treats any PascalCase export as a component.

**Change:** rename `NS` → `nsTokens` and keep a deprecated alias:

```js
// REPLACE the NS export block with:

/** Token shortcuts for inline style props */
export const nsTokens = {
  gold:   'var(--ns-gold)',
  pink:   'var(--ns-pink)',
  purple: 'var(--ns-purple)',
  cyan:   'var(--ns-cyan)',
  green:  'var(--ns-green)',
  orange: 'var(--ns-orange)',
  later:  'var(--ns-ink-faint)',
};

/** @deprecated Use nsTokens */
export const NS = nsTokens;
```

### `components/cards/FeatureCard.jsx`

Update the import to use `nsTokens` (the renamed export):

```js
// Line 2 — change:
import { NS, cx, mergeStyles } from '../shared/styles.js';
// to:
import { nsTokens, cx, mergeStyles } from '../shared/styles.js';

// Line 9 — change:
iconColor = NS.gold,
// to:
iconColor = nsTokens.gold,
```

### `_lab/game/index.html`

Two remaining hardcoded gold values in the CSS — replace with tokens:

```css
/* FIND: */
#grid-toggle.grid-on { color: var(--hud-gold); border-color: rgba(230,219,116,0.35); }
.ab.on { background: rgba(230,219,116,0.18); border-color: var(--hud-gold); color: var(--hud-gold); }

/* REPLACE WITH: */
#grid-toggle.grid-on { color: var(--hud-gold); border-color: var(--ns-focus-ring); }
.ab.on { background: rgb(var(--ns-gold-rgb) / 0.18); border-color: var(--hud-gold); color: var(--hud-gold); }
```

### `_lab/homepage/index.html`

The lab homepage is not connected to the DS. It needs:

1. **Replace** the Google Fonts `<link>` with `<link rel="stylesheet" href="../../styles.css">` — the font import is already inside `styles.css`.

2. **Replace ALL hardcoded color/font values with CSS tokens** — this is a large but mechanical change. Every `#e6db74` → `var(--ns-gold)`, every `font-family:'Press Start 2P',system-ui,sans-serif` → `font-family:var(--ns-font-pixel)`, etc.

   Full replacement map (apply in this order):

   ```
   STYLE BLOCKS:
   font-family:'Inter',system-ui,sans-serif;color:#f8f8f2;...;background-color:#272822
     → font-family:var(--ns-font-body);color:var(--ns-ink);...;background-color:var(--ns-bg-1)
   html{scroll-behavior:smooth;scroll-padding-top:4rem}
     → html{scroll-behavior:smooth;scroll-padding-top:var(--ns-header-h)}
   ::selection{background:rgba(249,38,114,.28);color:#f8f8f2}
     → ::selection{background:var(--ns-selection-bg);color:var(--ns-ink)}
   a{color:#e6db74;text-decoration:none}
     → a{color:var(--ns-gold);text-decoration:none}

   HOVER BLOCK:
   border-color:rgba(230,219,116,.55)!important → border-color:rgb(var(--ns-gold-rgb)/.55)!important
   background:#f4f099!important → background:var(--ns-gold-pale)!important
   color:#1c1c17!important;background:#e6db74!important;border-color:#e6db74!important
     → color:var(--ns-gold-btn-fg)!important;background:var(--ns-gold)!important;border-color:var(--ns-gold)!important
   nav a[data-nav]:hover{color:#e6db74!important} → color:var(--ns-gold)!important
   footer a[data-footer]:hover{color:#f8f8f2!important} → color:var(--ns-ink)!important

   GLOBAL (HTML body):
   font-family:'Press Start 2P',system-ui,sans-serif → font-family:var(--ns-font-pixel)
   color:#f8f8f2 → color:var(--ns-ink)
   color:#e6db74 → color:var(--ns-gold)
   color:#a8a28c → color:var(--ns-ink-dim)
   color:#75715e → color:var(--ns-ink-faint)
   color:#1c1c17 → color:var(--ns-gold-btn-fg)
   color:#66d9e8 → color:var(--ns-cyan)
   color:#a6e22e → color:var(--ns-green)
   color:#ae81ff → color:var(--ns-purple)
   color:#fd971f → color:var(--ns-orange)
   color:#f92672 → color:var(--ns-pink)
   background:#e6db74 → background:var(--ns-gold)
   background:#f92672 → background:var(--ns-pink)
   background:#1a1a16 → background:var(--ns-bg-0)
   background:#32332b → background:var(--ns-bg-2)
   background:rgba(30,31,26,.88) → background:var(--ns-glass)
   background:rgba(30,31,26,.75) → background:var(--ns-glass-soft)
   background:rgba(30,31,26,.60) → background:var(--ns-glass-2)
   background:#a6e22e → background:var(--ns-green)
   background:#fd971f → background:var(--ns-orange)
   background:linear-gradient(180deg,#f4f099,#e6db74) → background:linear-gradient(180deg,var(--ns-gold-pale),var(--ns-gold))
   linear-gradient(180deg,#272822 0%,#1e1f1a 100%) → linear-gradient(180deg,var(--ns-bg-1) 0%,#1e1f1a 100%)
   border:2px solid #cabb50 → border:2px solid var(--ns-gold-deep)
   border:3px solid #e6db74 → border:3px solid var(--ns-gold)
   border:2px solid #272822 → border:2px solid var(--ns-bg-1)
   box-shadow:0 3px 0 #b5a83f → box-shadow:0 3px 0 var(--ns-gold-shadow)
   border:1px solid rgba(255,255,255,.12) → border:1px solid var(--ns-line)
   border:1px solid rgba(255,255,255,.22) → border:1px solid var(--ns-line-strong)
   border-bottom:1px solid rgba(255,255,255,.12) → border-bottom:1px solid var(--ns-line)
   border-bottom:1px solid rgba(255,255,255,.1)  → border-bottom:1px solid var(--ns-line)
   border-top:1px solid rgba(255,255,255,.12)    → border-top:1px solid var(--ns-line)
   border-left:4px solid #a6e22e → border-left:4px solid var(--ns-status-holds)
   border-left:4px solid #fd971f → border-left:4px solid var(--ns-status-building)
   border-left:4px solid #66d9e8 → border-left:4px solid var(--ns-status-planned)
   border-left:4px solid rgba(255,255,255,.18) → border-left:4px solid var(--ns-line)
   background:rgba(166,226,46,.1)  → background:var(--ns-quest-pill-done)
   background:rgba(253,151,31,.14) → background:var(--ns-quest-pill-active)
   background:rgba(102,217,232,.12)→ background:var(--ns-quest-pill-planned)
   background:rgba(255,255,255,.05)→ background:var(--ns-quest-pill-locked)
   border:1px solid rgba(230,219,116,.26) → border:1px solid rgb(var(--ns-gold-rgb)/.26)
   border:1px solid rgba(249,38,114,.26)  → border:1px solid rgb(var(--ns-pink-rgb)/.26)
   border:1px solid rgba(174,129,255,.26) → border:1px solid rgb(var(--ns-purple-rgb)/.26)
   border:1px solid rgba(102,217,232,.26) → border:1px solid rgb(var(--ns-cyan-rgb)/.26)
   background:rgba(230,219,116,.08) → background:rgb(var(--ns-gold-rgb)/.08)
   background:rgba(249,38,114,.08)  → background:rgb(var(--ns-pink-rgb)/.08)
   background:rgba(174,129,255,.08) → background:rgb(var(--ns-purple-rgb)/.08)
   background:rgba(102,217,232,.08) → background:rgb(var(--ns-cyan-rgb)/.08)
   repeating-linear-gradient(45deg,#fd971f,#fd971f 4px,#c96f00 4px,#c96f00 8px)
     → repeating-linear-gradient(45deg,var(--ns-orange),var(--ns-orange) 4px,var(--ns-orange-deep) 4px,var(--ns-orange-deep) 8px)
   fill="#e6db74" → fill="var(--ns-gold)"
   fill="#a6e22e" → fill="var(--ns-green)"
   fill="#f92672" → fill="var(--ns-pink)"
   ```

   **Surviving intentional constants (do NOT replace):**
   - `#1e1f1a` — gradient end stop (darker than bg-0, intentional)
   - `#cec8b0` — moon circle in hero art
   - `#fff` in `@keyframes ns-live` glow

### `package.json` — 6 additions required

```jsonc
{
  // 1. Update description
  "description": "NoobSociety Design System — Monokai dark tokens, Tailwind preset, MUI theme, pixel-art React components",

  // 2. Add publishConfig
  "publishConfig": { "access": "public" },

  // 3. Add bugs + homepage
  "bugs": { "url": "https://github.com/noobsociety/nsds/issues" },
  "homepage": "https://github.com/noobsociety/nsds#readme",

  // 4. Add ./tailwind and ./mui to exports map
  "exports": {
    ".": { "import": "./dist/index.js", "require": "./dist/index.cjs", "types": "./dist/index.d.ts" },
    "./mui": { "import": "./dist/mui/index.js", "require": "./dist/mui/index.cjs", "types": "./dist/mui/index.d.ts" },
    "./tailwind": "./dist/tailwind/preset.js",
    "./styles": "./dist/styles.css",
    "./tokens/*": "./dist/tokens/*",
    "./primitives": "./dist/components/primitives.css"
  },

  // 5. Add to files array
  "files": ["dist", "CHANGELOG.md", "CONTRIBUTING.md", "LICENSE", "SECURITY.md"],

  // 6. Add peer + dev deps
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "@mui/material": ">=5.0.0",      // optional — only needed for @noobsociety/nsds/mui
    "@emotion/react": ">=11.0.0",    // optional
    "@emotion/styled": ">=11.0.0"    // optional
  },
  "peerDependenciesMeta": {
    "@mui/material":    { "optional": true },
    "@emotion/react":   { "optional": true },
    "@emotion/styled":  { "optional": true }
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^3.0.0",
    "vite": "^5.0.0"
  },

  // 7. Update keywords
  "keywords": ["design-system", "react", "monokai", "tailwind", "mui", "pixel-art", "noobsociety"]
}
```

### `vite.config.js` — 3 additions

**a) Add `tailwind/preset.js` to the asset copy:**

```js
// In nsdsDistAssets() → writeBundle(), after the styles.css copy:
await mkdir(resolve(dist, 'tailwind'), { recursive: true });
await cp(resolve(__dirname, 'tailwind/preset.js'), resolve(dist, 'tailwind/preset.js'));
```

**b) Add `mui-theme/index.ts` as a second lib entry and externalise MUI:**

```js
// In defineConfig → build.lib:
entry: {
  index:       resolve(__dirname, 'src/index.js'),
  'mui/index': resolve(__dirname, 'mui-theme/index.ts'),
},
formats: ['es', 'cjs'],
// Remove fileName (it applies to single-entry only)

// In rollupOptions.external — append:
'@mui/material', '@mui/material/styles', '@emotion/react', '@emotion/styled',

// In rollupOptions.output.globals — append:
'@mui/material': 'MuiMaterial',
'@mui/material/styles': 'MuiStyles',
'@emotion/react': 'EmotionReact',
'@emotion/styled': 'EmotionStyled',
```

**c) Expand the type barrel to include MUI and SectionArrowProps:**

In the `typeBarrel` string constant, the current line:
```js
export { SectionArrow } from './components/navigation/SectionArrow';
```
should be:
```js
export { SectionArrow, type SectionArrowProps } from './components/navigation/SectionArrow';
```

Add after the last line:
```js
export { default as theme, NS as muiNS, type theme as MUITheme } from '../mui-theme/theme';
export { NSThemeProvider } from '../mui-theme/ThemeProvider';
```
(These are re-exported only in the `dist/mui/index.d.ts` barrel — keep the component barrel clean. Create a separate `muiTypeBarrel` string and write it to `dist/mui/index.d.ts`.)

### `scripts/check-package.mjs` — path fixes

The script currently checks for source-level paths that don't exist.
Update `requiredFiles` to check `dist/` output instead:

```js
// REPLACE:
'components/react/index.js',
'components/react/index.d.ts',
'mui-theme/index.js',
'mui-theme/index.d.ts',
'mui-theme/theme.js',
'mui-theme/ThemeProvider.js',

// WITH:
'dist/index.js',
'dist/index.d.ts',
'dist/index.cjs',
'dist/mui/index.js',
'dist/mui/index.d.ts',
'dist/tailwind/preset.js',
'dist/styles.css',
'dist/tokens/colors.css',
```

---

## 4 — VERIFY the MUI theme is wired correctly

The local `mui-theme/` is fully implemented and should NOT be rewritten.
Confirm:
- `mui-theme/index.ts` → exports `{ default, NS, theme }` from `./theme` and `{ NSThemeProvider }` from `./ThemeProvider` ✅
- `mui-theme/theme.ts` → 605-line `createTheme()` ✅
- `mui-theme/ThemeProvider.tsx` → wraps MUI `ThemeProvider` + `CssBaseline` ✅
- `mui-theme/index.js` + `ThemeProvider.js` → compiled JS equivalents (check they exist and match) ✅

The only action: make sure `vite.config.js` builds `mui-theme/index.ts` → `dist/mui/` as described above.

---

## 5 — Final checklist

```bash
# Run in ~/Projects/nsds/
npm install
npm run build       # should produce dist/ with index.js, index.cjs, mui/index.js, tailwind/preset.js, styles.css, tokens/*
node scripts/check-package.mjs  # should pass after fixing paths above
npm pack --dry-run  # verify files list: dist/ + CHANGELOG + CONTRIBUTING + LICENSE + SECURITY
```

Expected `dist/` structure after build:
```
dist/
  index.js          ← ESM components
  index.cjs         ← CJS components
  index.d.ts        ← TypeScript types for components
  mui/
    index.js        ← ESM MUI theme
    index.cjs       ← CJS MUI theme
    index.d.ts      ← TypeScript types for MUI exports
  tailwind/
    preset.js       ← Tailwind preset (CommonJS, not bundled through Rollup)
  styles.css        ← single CSS entry
  tokens/           ← all 6 token files
  components/
    primitives.css  ← shared utility classes
```
