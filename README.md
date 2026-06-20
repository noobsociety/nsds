# NoobSociety Design System

Reusable design tokens, CSS primitives, Tailwind preset, and pixel-art React components for NoobSociety.

The system is built around a single rule: **Monokai colors are semantic foregrounds; dark surfaces are the world canvas.**

## Install

```bash
npm install @noobsociety/nsds
```

```tsx
import '@noobsociety/nsds/styles';
import { Button, HUDBar, RPGIcon } from '@noobsociety/nsds';
```

```ts
import nsdPreset from '@noobsociety/nsds/tailwind';
```

## Package Exports

| Export | Purpose |
|---|---|
| `@noobsociety/nsds` | React components |
| `@noobsociety/nsds/react` | Compatibility alias for React components |
| `@noobsociety/nsds/tailwind` | Tailwind preset mapped to `--ns-*` tokens |
| `@noobsociety/nsds/styles` | Full CSS entry |
| `@noobsociety/nsds/styles.css` | CSS entry compatibility alias |
| `@noobsociety/nsds/tokens/*` | Individual token CSS files |
| `@noobsociety/nsds/primitives` | Component primitive CSS |

The npm package ships `dist/` plus standard package metadata. Source cards, lab files, assets, and guidelines stay in the repository for design-system development.

## Repo Layout

| Folder / file | Audience | Purpose |
|---|---|---|
| `styles.css` | Public source | CSS entry point |
| `tokens/` | Public source | CSS custom properties: colors, type, spacing, motion, HUD |
| `components/` | Public source | React components, TypeScript declarations, primitive CSS |
| `tailwind/` | Public source | Tailwind preset |
| `guidelines/` | Design-system authors | Reference cards for the DS tab |
| `_lab/` | Internal | NS-team experiments and design tools |
| `assets/` | Internal | Product sprites and imagery used by lab/reference surfaces |

`_lab/` follows the underscore-prefix convention of generated files (`_ds_bundle.js`, `_ds_manifest.json`). The compiler skips underscore-prefixed folders, so `_lab/` files are invisible to DS consumers.

---

## Sources

This design system was built from the following resources. Readers with access are encouraged to explore them for the most current implementation details.

| Source | URL / Path |
|---|---|
| GitHub design system repo | https://github.com/noobsociety/nsds |
| Live product | https://noobsociety.com |
| Website source | https://github.com/noobsociety/noobsociety.com |
| Devblog | https://github.com/noobsociety/noobsociety.com/tree/main/docs/devblog |
| Local codebase | `nsds/` (mounted via File System Access API at time of authoring) |

---

## About NoobSociety

NoobSociety is a pixel-art MMO-style website where the site itself is the portfolio. Pages are maps. Your cursor is a character. Objects open content overlays instead of new tabs. The project is built in the open using Phaser (game world), React (UI overlays), TypeScript, and Vite, deployed on Cloudflare Pages.

The tagline is **"Society of Beginners — est. 2010"**. The tone is direct, playful, and honest. Not corporate.

**Core products:**
- **noobsociety.com** — The main web experience: a walkable isometric world for portfolios and identity. Single product; no separate mobile app or dashboard.

---

## CONTENT FUNDAMENTALS

### Voice and Tone
- **Direct.** Say what you mean. Cut filler.
- **Honest.** Never oversell. Let the work speak.
- **Playful.** Pixel culture references, dry wit, short punchy lines. Not corporate enthusiasm.

### Casing
- Sentence case everywhere. "Enter the world" — not "Enter The World".
- Title case only for proper nouns: "NoobSociety", "Phaser", "Cloudflare Pages".
- Status labels are ALL CAPS pixel text: `HOLDS`, `BUILDING`, `PLANNED`, `LATER`.

### Length
- Short sentences. One idea per sentence. "The site is a world. Pages are maps."
- Hero body copy: 1–2 sentences max.
- Button labels: 2–3 words, with a pixel symbol prefix: `▶ Enter the world`, `★ Star on GitHub`.

### Perspective
- Speak directly to the reader: "your cursor", "your work", "you walk".
- Avoid abstract third-person: never "users experience" — write "you experience".

### Emoji and Symbols
- **No emoji.** The product uses SVG pixel glyphs instead.
- Unicode pixel accents are used deliberately: `✦` (eyebrow/star), `▶` (play/CTA), `★` (GitHub star), `✓` (holds/done), `◌` (planned), `✦` (later/locked).
- Numbers only when specific and meaningful: "Gate 3", "9 gates", "32px".

### Specific Examples
- "Express identity and portfolio in a shared world." — hero subtitle
- "Not a card grid. A world." — section h2
- "Walk the world as a character. Objects open your work. No card grid." — CTA body
- "Live now. No download or sign-up." — live status line
- "Earlier gates must hold before later ones unlock." — roadmap subtitle
- "Society of Beginners · est. 2010" — footer byline

---

## VISUAL FOUNDATIONS

### Color System
Two separate systems that never mix roles:

**Monokai foregrounds** — used on top of the canvas as text, icons, borders, accents, buttons, and status colors. One hue, one semantic role. Do not reassign.

| Token | Hex | Role |
|---|---|---|
| `--ns-ink` | `#f8f8f2` | Primary text |
| `--ns-ink-dim` | `#a8a28c` | Secondary / body copy |
| `--ns-ink-faint` | `#75715e` | Captions, timestamps, Monokai comment |
| `--ns-gold` | `#e6db74` | Primary accent — CTAs, wordmark "Society", eyebrows, active nav |
| `--ns-green` | `#a6e22e` | Holds / success / live |
| `--ns-orange` | `#fd971f` | Building / in-progress |
| `--ns-cyan` | `#66d9e8` | Planned / info |
| `--ns-pink` | `#f92672` | Highlight / danger / high-energy |
| `--ns-purple` | `#ae81ff` | Decorative / personal / identity |

**Dark canvas** — surfaces underneath the foregrounds.

| Token | Hex | Role |
|---|---|---|
| `--ns-bg-0` | `#1a1a16` | Deepest: footer, sidebar, backdrop |
| `--ns-bg-1` | `#272822` | Page base |
| `--ns-bg-2` | `#32332b` | Raised surfaces, icon slots, input fill |
| `--ns-glass` | `rgba(30,31,26,.88)` | Card and header glass |

The default experience is **always dark**. No light mode.

### Typography
Two fonts. No others.

- **Press Start 2P** — wordmark, buttons, status pills, card headings, section accents, and any pixel UI. Always with generous line height (`1.45–1.5`). Keep it short — it gets unreadable when it wraps.
- **Inter** — body copy, nav links, subtitles, paragraphs, dense information. Clean, readable at any size.

**Type scale:**
- Hero h1: `clamp(2rem, 1rem + 3vw, 3.5rem)` Press Start 2P
- Section h2: `clamp(1.8rem, 1rem + 2vw, 2.4rem)` Inter 700
- Card h3: `11px` Press Start 2P
- Body lead: `1.25rem` Inter 500
- Body: `1rem` Inter 400, `color: --ns-ink-dim`
- Caption: `0.875rem` Inter, `color: --ns-ink-faint`
- Eyebrow: `13px` Inter 700, uppercase, `letter-spacing: 0.18em`, gold

### Backgrounds and Surfaces
- **Page body**: `#272822` base + subtle radial gradients (pink top-right 11% opacity, purple top-left 7% opacity) + fixed attachment for depth.
- **Hero section**: full-bleed `bg.png` world image with a left-to-right dark gradient overlay (97%→20% opacity). Scanline overlay (`repeating-linear-gradient`) for pixel-screen texture. Animated star field (radial dot pattern, twinkle animation).
- **Cards**: glass surface — `rgba(30,31,26,.88)` + `backdrop-filter: blur(8px)`. No resting shadow.
- **Header**: glass — `rgba(30,31,26,.88)` + `backdrop-filter: blur(12px)`.
- **Footer**: solid `#1a1a16` (bg-0), the deepest surface.
- **Imagery**: pixel-art sprites with `image-rendering: pixelated`. World screenshots are cooler-toned with slight desaturation. No grain, no warm toning.

### Cards
- Glass surface: `rgba(30,31,26,.88)` + `backdrop-filter: blur(8px)`
- Border: `1px solid rgba(255,255,255,.22)` (strong) or `.12` (soft)
- Radius: `10px` (lg) for feature/quest cards
- Resting shadow: **none**
- Hover: `transform: translateY(-4px)` + `box-shadow: 0 16px 34px rgba(0,0,0,.38)` + border-color shifts to `rgba(230,219,116,.55)` (gold glow)
- Hover transition: `150ms ease-out`

### Buttons
- **Play (primary)**: gold fill `#e6db74`, dark text `#1c1c17`, `border: 2px solid #cabb50`, `box-shadow: 0 3px 0 #b5a83f` (physical press shadow). On hover: `background: #f4f099`. On active: shadow disappears, `translateY(2px)`.
- **Ghost (secondary)**: transparent background, gold text, `border: 1px solid rgba(248,248,242,.45)`. On hover: gold fill, dark text.
- Both use Press Start 2P. Never Inter for buttons.
- Sizes: sm `9px / 0.625rem 0.875rem`, md `12px / 1rem 1.625rem`, lg `13px / 1.125rem 2rem`.

### Borders
- Soft border: `1px solid rgba(255,255,255,.08)`
- Default border: `1px solid rgba(255,255,255,.12)`
- Strong border: `1px solid rgba(255,255,255,.22)`
- Gold accent border: `2px solid #cabb50`

### Shadows
- Card resting: none
- Card hover: `0 1rem 2.125rem rgba(0,0,0,.38)`
- Modal: `0 1.5rem 3.5rem rgba(0,0,0,.5)`
- Button press: `0 3px 0 #b5a83f` (gold physical shadow)
- Section arrow: `0 0 0 4px rgba(230,219,116,.12), 0 12px 28px rgba(0,0,0,.36)`

### Corner Radii
- `4px` — tags, pills, icon slots, small UI
- `8px` — small buttons (sm)
- `10px` — cards, feature cards, quest cards
- `12px` — large containers (hero art frame, CTA panel)
- `9999px` — section arrow, live dot, full pills

### Spacing
4px grid, rem-based. Container max-width: `1080px`. Header height: `4rem` (64px) fixed. Section min-height: `100svh - 4rem`. Fluid container padding: `clamp(1rem, 4vw, 2rem)`.

### Motion and Animation
- **Interaction**: `150ms ease-out` for all hover/active transitions (color, border, shadow, transform).
- **Decorative**: slow and subtle. Bob: 3.6s ease-in-out. Blink: 1.5s steps(1). Live pulse: 2.4s. Star twinkle: 5.5s. Arrow nudge: 2s.
- **Spring easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` — used sparingly.
- **Reduced motion**: all `ns-*` animations are disabled via `@media (prefers-reduced-motion: reduce)`.
- No aggressive bounces or spins. Calm decorative motion only.

### Hover States
- Text/nav: color shifts to `--ns-gold` or `--ns-gold-pale`. No underline except nav active state.
- Cards: lift `translateY(-4px)` + shadow + gold border glow.
- Play button: lighter gold fill.
- Ghost button: fills with gold.
- Footer links: dimmed → primary ink.

### Transparency and Blur
- Glass cards and headers use `backdrop-filter: blur(8px–12px)`.
- Only applied over dark/neutral surfaces — never over bright imagery.
- Transparency layers reinforce depth without competing with foreground content.

### HUD Grid and Touch Targets

The in-game HUD lives in a **640×360 design canvas**, divided into a **3×3 cross layout** (matching the world grid). Each outer cell is 213×120px. With 5% padding per axis, the inner **8×8 grid cells** are:

- Each cell: **24×13.5px** (`--hud-grid-cell-w` / `--hud-grid-cell-h`)
- **Minimum element size: 2×2 cells = 48×27px** (`--hud-min-tap-w` / `--hud-min-tap-h`)

No interactive HUD element — button, hotbar slot, inventory cell, icon — may be smaller than 2×2 inner grid cells. Smaller is un-tappable on mobile and invisible at a glance. Passive elements (bars, dividers, borders) are exempt — their thin axis is intentional. At runtime the HUD scales by `--hud-scale` (~2–3×), mapping 48×27 design px to ~96×54 real px — above the 44px mobile minimum. the HUD scales by `--hud-scale` (~2–3×), mapping 48×27 design px to ~96×54 real px — above the 44px mobile minimum.

### Layout Rules
- Fixed header: `position: sticky; top: 0; z-index: 50`.
- Sections are full-viewport-height: `min-height: calc(100svh - 4rem)`.
- Container: `max-width: 1080px; margin-inline: auto`.
- Section arrow (`SectionArrow`): `position: absolute; left: 50%; bottom: 1.5rem`.
- Feature grid: `repeat(4, 1fr)` — collapses to `repeat(2, 1fr)` on mobile.
- Quest grid: `repeat(3, 1fr)` — collapses to `repeat(2, 1fr)` on mobile.
- Responsive baseline: `375×667` portrait and `667×375` landscape.

---

## ICONOGRAPHY

NoobSociety does not use an icon font or icon library. All icons are one of two types:

### RPG pixel-art icons
Original geometric SVG icons representing game taxonomy. All artwork is purpose-built — no external icon libraries or trademarks. Rendered at `16×16` viewBox with `image-rendering: pixelated`. Available via `RPGIcon` (or legacy `HUDIcon`) with a `name` prop. Full reference: `components/icons/rpgicons.card.html`.

### 1. Inline SVG glyphs
Simple, hand-crafted SVG shapes used as UI icons within components. They are small (10×10 or 12×8 viewBox) and always `fill="currentColor"` or `stroke="currentColor"` so they inherit the parent's Monokai color.

Key SVG icons:
- **Play triangle**: `viewBox="0 0 10 10"` polygon `1,0.5 9.5,5 1,9.5` — used in play buttons, BUILDING status
- **Star**: `viewBox="0 0 10 10"` polygon — used in eyebrows, GitHub CTA, LATER status
- **Chevron down**: `viewBox="0 0 12 8"` polyline `1,1.5 6,6.5 11,1.5` — used in SectionArrow
- **Cursor/lightning**: path icons for feature cards (unique per card)

These SVGs are inlined directly in JSX/HTML — not imported from files.

### 2. Pixel sprite PNGs
Pixel-art images for in-world interactables and the hero character. Rendered with `image-rendering: pixelated`. Always block-displayed, never inline. Used with `filter: drop-shadow()` for depth.

| File | Usage |
|---|---|
| `assets/logo.png` | Brand logo — header, footer, CTA panel |
| `assets/hero.png` | Main player character sprite |
| `assets/bloop.png` | Companion creature |
| `assets/lamp.png` | In-world lamp object |
| `assets/sign.png` | In-world notice sign |
| `assets/mailbox.png` | In-world mailbox object |
| `assets/prickle.png` | In-world cactus/plant |
| `assets/bg.png` | Hero section world background |
| `assets/plaza.png` | Plaza screenshot (world preview) |

### Unicode pixel accents
Used as decorative text marks — never as standalone icon replacements:
- `✦` — eyebrow marker, locked/later state
- `▶` — play/building state
- `✓` — holds/done state
- `◌` — planned/empty state
- `★` — GitHub star

### No emoji
Emoji are never used in NoobSociety interfaces.

---

## File Index

### Tokens & Styles
| Path | Contents |
|---|---|
| `styles.css` | Global CSS entry point — `@import` this one file |
| `tokens/colors.css` | Monokai foreground + dark canvas color tokens |
| `tokens/typography.css` | Font families, type scale, line heights, weights |
| `tokens/spacing.css` | 4px grid, fluid clamp tokens, radii, shadows, blur |
| `tokens/motion.css` | Duration, easing, transition shorthand, keyframes |
| `tokens/base.css` | Box-sizing reset, body defaults, focus ring, selection |
| `tokens/hud.css` | Game HUD, RPG element, and character panel tokens |
| `components/primitives.css` | Shared CSS primitive classes (`ns-button`, `ns-card`, `ns-site-nav`, etc.) |

### Components
| Path | Contents |
|---|---|
| `components/shared/styles.js` | Shared JS utilities: `cx`, `mergeStyles`, `nsTokens`, deprecated `NS`, `questStatus` |
| `components/buttons/Button.jsx` | Button — `play` and `ghost` variants, 3 sizes |
| `components/buttons/Button.d.ts` | Button TypeScript props interface + starting point tag |
| `components/buttons/Button.prompt.md` | Button usage guide for agents |
| `components/cards/FeatureCard.jsx` | FeatureCard — icon, title, body, semantic tag |
| `components/cards/FeatureCard.d.ts` | FeatureCard TypeScript props interface + starting point tag |
| `components/cards/FeatureCard.prompt.md` | FeatureCard usage guide for agents |
| `components/cards/QuestCard.jsx` | QuestCard — roadmap gate with done/active/planned/locked status |
| `components/cards/QuestCard.d.ts` | QuestCard TypeScript props interface + starting point tag |
| `components/cards/QuestCard.prompt.md` | QuestCard usage guide for agents |
| `components/hud/HUDBar.jsx` | HUDBar — stat bar with fill %, value overlay, and configurable colors |
| `components/hud/HUDBar.d.ts` | HUDBar TypeScript props interface |
| `components/hud/HUDLabel.jsx` | HUDLabel — pixel-font label with left/center/right alignment and scale |
| `components/hud/HUDLabel.d.ts` | HUDLabel TypeScript props interface |
| `components/hud/HUDDivider.jsx` | HUDDivider — vertical or horizontal 1px HUD rule |
| `components/hud/HUDDivider.d.ts` | HUDDivider TypeScript props interface |
| `components/icons/RPGIcon.jsx` | RPGIcon — 22 pixel-art icons: weapons, elements, races, sizes (exports `HUDIcon` alias for backward compat) |
| `components/icons/RPGIcon.d.ts` | RPGIcon TypeScript props interface |
| `components/navigation/SectionArrow.jsx` | SectionArrow — animated gold section scroll indicator |
| `components/navigation/SectionArrow.d.ts` | SectionArrow TypeScript props interface |
| `components/navigation/SectionArrow.prompt.md` | SectionArrow usage guide for agents |

### Guidelines (Design System tab cards)
| Path | Group | Contents |
|---|---|---|
| `guidelines/colors.card.html` | Colors | Full Monokai + dark background palette |
| `guidelines/semantic-colors.card.html` | Colors | Per-color semantic role table |
| `guidelines/type.card.html` | Type | Inter + Press Start 2P scale |
| `guidelines/pixel-accents.card.html` | Type | SVG pixel glyph reference |
| `guidelines/spacing.card.html` | Spacing | 4px grid + fluid clamp tokens |
| `guidelines/radii-shadows.card.html` | Spacing | Radius scale + shadow system |
| `guidelines/brand.card.html` | Brand | Logo and wordmark usage |
| `guidelines/sprites.card.html` | Brand | World sprite reference |
| `guidelines/backgrounds.card.html` | Brand | Surface and background treatments |
| `guidelines/motion.card.html` | Brand | Animation keyframes and timing tokens |
| `tailwind/preset.js` | — | Tailwind CSS preset — maps all `--ns-*` tokens into Tailwind theme |
| `components/buttons/buttons.card.html` | Components | Button specimen |
| `components/cards/cards.card.html` | Components | FeatureCard + QuestCard specimen |
| `components/navigation/navigation.card.html` | Components | SiteNav + SectionArrow specimen |
| `components/hud/hud.card.html` | Components | HUDBar + HUDLabel + HUDDivider specimen |
| `components/icons/rpgicons.card.html` | Components | RPGIcon — all 22 pixel-art icons by category |
| `_lab/game/index.html` | Lab | 667×375 drag-and-drop HUD canvas — 8×8 inner grid, player card (internal design tool) |
| `_lab/homepage/index.html` | Lab | Full homepage reference implementation (internal design tool) |

### Assets
| Path | Contents |
|---|---|
| `assets/logo.png` | Brand logo (pixel art) |
| `assets/hero.png` | Player character sprite |
| `assets/bloop.png` | Companion creature sprite |
| `assets/lamp.png`, `sign.png`, `mailbox.png`, `prickle.png` | World object sprites |
| `assets/bg.png` | Hero section world background |
| `assets/plaza.png` | Plaza world screenshot |

---

## HUD Components (`components/hud/`)

Pixel-art game HUD primitives for the in-game player card and character screen. All icons are original geometric designs — no external trademarks.

| Component | File | Description |
|---|---|---|
| `HUDBar` | `HUDBar.jsx` | Stat bar with fill %, value overlay, configurable colors |
| `HUDLabel` | `HUDLabel.jsx` | Pixel-font label — left / center / right alignment + scale |
| `HUDDivider` | `HUDDivider.jsx` | 1px rule — vertical (default) or horizontal, `--ns-line` color |

## RPG Icons (`components/icons/`)

Pixel-art game icons. Separate from HUD layout primitives — these represent game taxonomy (weapon type, element, race, body size). All artwork is original geometric design on a 16×16 viewBox with `image-rendering: pixelated`.

| Component | File | Description |
|---|---|---|
| `RPGIcon` | `RPGIcon.jsx` | 22 pixel-art icons across 4 categories. `HUDIcon` exported as backward-compat alias. |

### RPGIcon categories

| Category | Names |
|---|---|
| **Weapons (6)** | sword · staff · bow · katar · book · hammer |
| **Elements (8)** | neutral · earth · wind · water · fire · light · dark · void |
| **Races (5)** | human · beast · demon · angel · spirit |
| **Sizes (3)** | small · medium · large |

### Element color tokens (`tokens/hud.css`)

| Token | Hex | Element |
|---|---|---|
| `--hud-el-neutral` | `#888780` | Neutral |
| `--hud-el-earth` | `#8b6914` | Earth |
| `--hud-el-wind` | `#5dcaa5` | Wind |
| `--hud-el-water` | `#378add` | Water |
| `--hud-el-fire` | `#ba7517` | Fire |
| `--hud-el-dark` | `#888780` | Dark |
| `--hud-el-light` | `#fac775` | Light |
| `--hud-el-void` | `#7f77dd` | Void |

### Game View canvas (`_lab/game/index.html`)

667×375px drag-and-drop HUD builder. Each element is a draggable, resizable cell on an 8×8 pixel grid. Press **G** or click **GRID ON/OFF** to toggle edit mode.


The Tailwind preset (`tailwind/preset.js`) maps every `--ns-*` token to Tailwind theme keys. Add it once in `tailwind.config.ts` and use `bg-ns-bg-1`, `text-ns-gold`, `rounded-ns-md`, `font-pixel`, etc. throughout the app. See `guidelines/tailwind.card.html` for the full reference.

---

## Design Principles

1. **Monokai foregrounds only**: each Monokai color has one semantic role. Never reassign.
2. **Dark by default**: the canvas is always dark. No light-mode default.
3. **Pixel and Inter together**: Press Start 2P for identity and labels; Inter for reading.
4. **Calm motion**: decorative animations are slow and subtle. Interaction transitions are fast (150ms).
5. **Glass, not flat**: surfaces use `backdrop-filter` glass. Cards have no resting shadow.
6. **Minimal copy**: short sentences, pixel symbol prefixes, no emoji.
