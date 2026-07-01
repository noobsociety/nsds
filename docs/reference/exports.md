# Package Exports

| Export                                        | Purpose                                                |
| --------------------------------------------- | ------------------------------------------------------ |
| `@noobsociety/nsds`                           | React components and public types                      |
| `@noobsociety/nsds/react`                     | React component alias                                  |
| `@noobsociety/nsds/client`                    | Renderer-neutral client registries and shared metadata |
| `@noobsociety/nsds/tailwind`                  | Tailwind preset                                        |
| `@noobsociety/nsds/styles`                    | Full CSS entry                                         |
| `@noobsociety/nsds/styles.css`                | CSS entry compatibility alias                          |
| `@noobsociety/nsds/tokens/*`                  | Individual token CSS files                             |
| `@noobsociety/nsds/assets/*`                  | Typed bundled Scene Builder imagery                    |
| `@noobsociety/nsds/primitives`                | Component primitive CSS                                |
| `@noobsociety/nsds/components/primitives.css` | Primitive CSS compatibility alias                      |
| `@noobsociety/nsds/package.json`              | Package metadata                                       |

## JavaScript

Both ESM import and CommonJS require are supported for the React entry points.

```ts
import { Button } from '@noobsociety/nsds';
```

```js
const { Button } = require('@noobsociety/nsds');
```

Client registries are available without importing React components:

```ts
import { nsClientRelease, rpgIconNames } from '@noobsociety/nsds/client';
```

The `client` entry exposes renderer-neutral metadata for code that needs shared
names without React: token references (`nsTokens`; `NS` is a deprecated alias),
quest status metadata (`questStatus`), the RPG icon registries (`rpgIconNames`,
`rpgIconGroups`, and per-group lists for weapons, elements, races, sizes,
attack, skills, items, equip, skins, menu, and emotes), and the registry's
release and target markers (`nsClientRelease`, `nsClientTargets`).

## CSS

CSS exports are intended for bundlers and app frameworks that understand CSS
imports.

```tsx
import '@noobsociety/nsds/styles';
```

## Assets

Scene Builder imagery is available through typed asset exports for bundlers that
resolve package asset URLs:

```ts
import sceneBackgroundUrl from '@noobsociety/nsds/assets/scene-bg.png';
```
