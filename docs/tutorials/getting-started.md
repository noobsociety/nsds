# Getting Started

This tutorial installs NSDS, loads the CSS entry, and renders the first component.

## Install

```bash
npm install @noobsociety/nsds react react-dom
```

## Load Styles

Import the stylesheet once near the root of your app:

```tsx
import '@noobsociety/nsds/styles';
```

## Render A Component

```tsx
import { Button, FeatureCard, RPGIcon } from '@noobsociety/nsds';

export function App() {
  return (
    <>
      <FeatureCard
        icon={<RPGIcon name="sword" />}
        title="World UI"
        body="Token-backed components for pixel-art product surfaces."
        tag="Ready"
      />
      <Button>Enter world</Button>
    </>
  );
}
```

## Add Tailwind

Use the preset when your app uses Tailwind:

```ts
import nsdsPreset from '@noobsociety/nsds/tailwind';

export default {
  presets: [nsdsPreset],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
```

## Verify

Run your app and confirm:

- NSDS CSS is loaded once.
- React components render with `ns-*` class names.
- Tailwind utilities can read `ns` theme values from the preset.
