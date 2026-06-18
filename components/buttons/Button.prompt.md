Use `Button` for primary and secondary actions in NoobSociety interfaces.

```jsx
<Button variant="play" href="https://noobsociety.com">▶ Enter the world</Button>
<Button variant="ghost" href="https://github.com/noobsociety">★ Star on GitHub</Button>
<Button variant="play" size="sm">▶ Play</Button>
```

**Variants**
- `play` — primary CTA. Gold fill, dark text, gold border, physical press shadow.
- `ghost` — secondary CTA. Transparent surface, gold text, soft border, gold fill on hover.

**Sizes**
- `sm` — compact header actions
- `md` — default actions
- `lg` — hero and major CTA sections

**Notes**
- Always uses Press Start 2P — never Inter.
- Pass `href` to render as `<a>`. Omit for `<button>`.
- Import `styles.css` so the `ns-button` primitive classes are available.
- Use a short pixel symbol prefix such as `▶` or `★` when it clarifies the action.
