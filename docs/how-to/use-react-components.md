# Use React Components

Import components from the package root or the React alias.

```tsx
import { Button, HUDBar, QuestCard, RPGIcon } from '@noobsociety/nsds';
```

The alias is available for apps that prefer explicit entry points:

```tsx
import { Button } from '@noobsociety/nsds/react';
```

## Buttons

```tsx
<Button variant="play" size="md">
  Enter world
</Button>

<Button href="/docs" variant="ghost">
  Read docs
</Button>
```

Invalid runtime values fall back to the default visual variant and size.

## Quest Cards

```tsx
<QuestCard
  gate={2}
  title="HUD"
  body="Build status, meter, and label primitives."
  status="active"
/>
```

## HUD

```tsx
<HUDBar value={32} max={40} aria-label="Health" />
```

`HUDBar` renders as a `meter` by default. `HUDDivider` renders as a separator.

## Icons

```tsx
<RPGIcon name="light" size={32} />
```

Use `RPGIcon.icons` for a typed list of supported icon names.
