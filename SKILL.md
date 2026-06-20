---
name: noobsociety-design
description: Use this skill to generate well-branded interfaces and assets for NoobSociety — a pixel-art MMO-style portfolio world. Contains essential design guidelines, Monokai color tokens, typography rules, pixel assets, React components, and a full homepage UI kit.
user-invocable: true
---

Read the `readme.md` file within this skill first, then explore the relevant tokens, components, assets, guidelines, or UI kits for the task.

If creating visual artifacts (slides, mocks, throwaway prototypes, static HTML), use the included pixel assets and follow the design guidelines below to produce well-branded output. If working in production code, reference the token CSS files and component JSX for the real implementation.

**Core principles:**
1. Monokai colors are semantic foregrounds: text, icons, accents, buttons, borders, and status colors. Each hue has one fixed role — never reassign.
2. Dark surfaces are the world canvas: page base (#272822), raised surfaces (#32332b), glass cards (rgba(30,31,26,.88)), deepest footer (#1a1a16).
3. Two fonts only: Press Start 2P for pixel UI (wordmark, buttons, labels, status pills); Inter for body copy and navigation.
4. The default experience is always dark. No light mode as a default.
5. Keep copy direct, short, and playful without becoming corporate.
6. No emoji. Use SVG glyphs and Unicode pixel marks (✦ ▶ ✓ ◌ ★) sparingly.
7. Cards have no resting shadow. Hover lifts with translateY(-4px) + gold border glow.
8. Interaction transitions: 150ms ease-out. Decorative animations: slow and subtle.

**Key tokens (use these values directly in HTML/CSS):**
- Page bg: `#272822`
- Footer bg: `#1a1a16`
- Raised surface: `#32332b`
- Glass: `rgba(30,31,26,.88)` + `backdrop-filter:blur(8px)`
- Primary text: `#f8f8f2`
- Secondary text: `#a8a28c`
- Muted text: `#75715e`
- Gold (accent/CTA): `#e6db74`
- Green (holds/success): `#a6e22e`
- Orange (building): `#fd971f`
- Cyan (planned): `#66d9e8`
- Pink (highlight/danger): `#f92672`
- Purple (decorative): `#ae81ff`
- Border soft: `rgba(255,255,255,.12)`
- Border strong: `rgba(255,255,255,.22)`
- Button press shadow: `0 3px 0 #b5a83f`

**Pixel assets available in `assets/`:**
- `logo.png` — brand logo
- `hero.png` — player character sprite
- `bloop.png` — companion creature
- `lamp.png`, `sign.png`, `mailbox.png`, `prickle.png` — world objects
- `bg.png` — hero world background
- `plaza.png` — plaza screenshot

**React components (compiled, use via `_ds_bundle.js`):**
- `Button` — `play` (gold fill) and `ghost` (transparent) variants, 3 sizes
- `FeatureCard` — glass card with icon slot, pixel title, body copy, semantic tag
- `QuestCard` — roadmap gate with `done/active/planned/locked` status system
- `SectionArrow` — animated gold section scroll indicator

**Homepage template** — `templates/homepage/Homepage.dc.html`
Full scrollable homepage DC with live scroll-spy nav and three Tweaks: CRT scanlines, animated stars, idle character bob. Use as a starting point for any NoobSociety-branded page.

**Tailwind preset** — `tailwind/preset.js` maps every `--ns-*` token to Tailwind theme keys (`bg-ns-bg-1`, `text-ns-gold`, `font-pixel`, `rounded-ns-md`, etc.). Add to `presets: [nsdPreset]` in `tailwind.config.ts` — one line wires the full token system into Tailwind classes. All NS components accept `className` so Tailwind utilities can extend or override them. See `guidelines/tailwind.card.html` for the full class reference.

When the user invokes this skill without other guidance, ask what they want to build or design, ask clarifying questions (target surface, fidelity, variations needed), then act as an expert designer who outputs clean HTML artifacts for visual work or accurate token/component usage guidance for production code.
