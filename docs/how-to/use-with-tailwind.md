# Use With Tailwind

NSDS ships a Tailwind preset that maps theme values to CSS custom properties.

## Configure

```ts
import nsdsPreset from '@noobsociety/nsds/tailwind';

export default {
  presets: [nsdsPreset],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

## Load CSS

The preset supplies Tailwind theme names. The CSS entry supplies runtime token
values.

```tsx
import '@noobsociety/nsds/styles';
```

## Use Theme Values

```tsx
export function Panel() {
  return (
    <section className="bg-ns-bg-1 text-ns-ink ring-1 ring-ns-line">
      <h2 className="font-pixel text-ns-lg text-ns-gold">Quest board</h2>
    </section>
  );
}
```

## Notes

- Keep NSDS CSS loaded before app-level overrides.
- Use Tailwind utilities for layout and composition.
- Use NSDS React components for repeated interface primitives.
