# Customize Tokens

NSDS components read `--ns-*` CSS custom properties at runtime.

## Override A Token

Load NSDS first, then override tokens in app CSS:

```css
@import '@noobsociety/nsds/styles';

:root {
  --ns-gold: #f3d675;
  --ns-bg-1: #1c1b22;
}
```

## Scope Overrides

Use scoped overrides for a feature area:

```css
.inventory-screen {
  --ns-accent: var(--ns-cyan);
  --ns-line: rgba(102, 217, 232, 0.35);
}
```

## Keep Class Names Stable

Do not override generated class names. Prefer token overrides and app-level
layout wrappers.

```tsx
<section className="inventory-screen">
  <QuestCard gate={3} title="Inventory" body="Item systems." status="planned" />
</section>
```
