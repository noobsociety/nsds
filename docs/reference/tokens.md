# Tokens

NSDS tokens are CSS custom properties grouped by file.

| File | Contents |
| --- | --- |
| `@noobsociety/nsds/tokens/base.css` | Base surfaces and shared defaults |
| `@noobsociety/nsds/tokens/colors.css` | Monokai-inspired color tokens |
| `@noobsociety/nsds/tokens/typography.css` | Font families, sizes, weights, and line heights |
| `@noobsociety/nsds/tokens/spacing.css` | Spacing and container values |
| `@noobsociety/nsds/tokens/motion.css` | Duration and easing values |
| `@noobsociety/nsds/tokens/hud.css` | HUD-specific values |

## Naming

- Global tokens use the `--ns-*` prefix.
- HUD tokens use the `--hud-*` prefix.
- Component-local custom properties use a component-specific `--ns-*` name.

## Usage

Use tokens through CSS, Tailwind theme values, component props, or the client
registry entry when shared names are needed outside React:

```css
.panel {
  background: var(--ns-bg-1);
  color: var(--ns-ink);
  border-color: var(--ns-line);
}
```

```tsx
<HUDBar fillColor="var(--ns-cyan)" />
```

```ts
import { nsTokens, questStatus, rpgIconNames } from '@noobsociety/nsds/client';
```
