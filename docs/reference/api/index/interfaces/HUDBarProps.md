[**@noobsociety/nsds**](../../README.md)

***

[@noobsociety/nsds](../../README.md) / [index](../README.md) / HUDBarProps

# Interface: HUDBarProps

## Extends

- `Omit`\<`HTMLAttributes`\<`HTMLDivElement`\>, `"children"` \| `"style"`\>

## Properties

### fillColor?

> `optional` **fillColor?**: `string`

Bar fill colour. Overrides the variant's fill.

***

### height?

> `optional` **height?**: `number`

Bar height in px.

***

### label?

> `optional` **label?**: `string` \| `false`

Label text. Defaults to `"{value} / {max}"`.
Pass a string to override, or `false`/`""` to hide the label entirely.

***

### max?

> `optional` **max?**: `number`

Maximum stat value.

***

### segmented?

> `optional` **segmented?**: `boolean`

Render the fill as discrete notched segments (defaults to the variant's setting).

***

### segmentSize?

> `optional` **segmentSize?**: `number`

Width of one segment + gutter in px, when `segmented`.

***

### style?

> `optional` **style?**: [`NSStyle`](../type-aliases/NSStyle.md)

***

### trackColor?

> `optional` **trackColor?**: `string`

Bar track colour.

***

### value?

> `optional` **value?**: `number`

Current stat value.

***

### variant?

> `optional` **variant?**: [`HUDBarVariant`](../type-aliases/HUDBarVariant.md)

Built-in bar kind — sets fill colour, label colour and (for stamina) segmentation.
