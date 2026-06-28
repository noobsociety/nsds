[**@noobsociety/nsds**](../../README.md)

***

[@noobsociety/nsds](../../README.md) / [index](../README.md) / HUDJoystickProps

# Interface: HUDJoystickProps

## Extends

- `Omit`\<`HTMLAttributes`\<`HTMLDivElement`\>, `"style"` \| `"onChange"`\>

## Properties

### onChange?

> `optional` **onChange?**: (`x`, `y`) => `void`

Fires continuously during drag with normalised x, y values in [-1, 1].
Emits (0, 0) when the thumb is released.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`void`

***

### size?

> `optional` **size?**: `number`

Outer diameter in px. The component renders a square of this size.

***

### style?

> `optional` **style?**: [`NSStyle`](../type-aliases/NSStyle.md)

***

### thumbSize?

> `optional` **thumbSize?**: `number`

Thumb diameter as a fraction of size (0–1).
