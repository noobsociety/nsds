[**@noobsociety/nsds**](../../README.md)

***

[@noobsociety/nsds](../../README.md) / [index](../README.md) / HUDTabWindowProps

# Interface: HUDTabWindowProps

## Properties

### defaultTab?

> `optional` **defaultTab?**: `string`

ID of the initially-active tab. Defaults to the first tab.

***

### style?

> `optional` **style?**: [`NSStyle`](../type-aliases/NSStyle.md)

***

### tabAlign?

> `optional` **tabAlign?**: `"center"` \| `"left"` \| `"right"`

Horizontal alignment of tab buttons within the tab bar

***

### tabFontSize?

> `optional` **tabFontSize?**: `number`

Label font size in px

***

### tabHeight?

> `optional` **tabHeight?**: `number`

Tab bar height in px. 1 grid cell ≈ 14 px.

***

### tabMinWidth?

> `optional` **tabMinWidth?**: `number`

Minimum tab button width in px.
Defaults to 48 px — two grid cells, the narrowest comfortably-readable
tab label at HUD scale.

***

### tabs?

> `optional` **tabs?**: [`HUDTab`](HUDTab.md)[]

Tab definitions
