# Accessibility

NSDS components include baseline accessibility semantics where the component can
make a safe default choice.

## Buttons

`Button` renders a native `button` unless `href` is provided. Disabled links
remove `href`, set `aria-disabled`, and leave the link out of tab order.

## HUD

`HUDBar` renders with `role="meter"` and value attributes. Add an accessible name
with `aria-label` when the surrounding UI does not provide one.

```tsx
<HUDBar value={32} max={40} aria-label="Health" />
```

`HUDDivider` renders with `role="separator"` and `aria-orientation`.

## Icons

`RPGIcon` is visual by default. Pair it with visible text or provide a labelled
wrapper when the icon carries meaning.

## Testing

Component tests cover:

- disabled link semantics
- meter values
- separator orientation
- hidden decorative card icons
- stable class names for visual states
