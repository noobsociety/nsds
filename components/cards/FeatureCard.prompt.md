Use `FeatureCard` for short feature grids and value propositions. Render cards inside a `ul`.

```jsx
<ul style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, listStyle:'none', margin:0, padding:0 }}>
  <FeatureCard icon={<CursorIcon/>} title="The site is a world" body="Pages are maps, links are interactables." tag="Spatial" />
  <FeatureCard icon={<BoltIcon/>}   title="One typed bridge"   body="A map object in Phaser fires the matching React overlay." tag="Live" iconColor="var(--ns-pink)" />
  <FeatureCard icon={<BubbleIcon/>} title="Sprite-forward"     body="Clear silhouettes, readable at a glance." tag="Personal" iconColor="var(--ns-purple)" />
  <FeatureCard icon={<BookIcon/>}   title="Built in the open"  body="CI on every push. Cloudflare Pages deploy." tag="Open" iconColor="var(--ns-cyan)" />
</ul>
```

**Notes**
- Keep titles short. Pixel headings lose clarity when they wrap too often.
- `iconColor` should use a semantic Monokai token: gold by default, or pink, purple, or cyan when the meaning fits.
- Import `styles.css` so the `ns-card`, `ns-feature-card`, and `ns-tag` classes are available.
- Keep `tag` to one short word.
- Hover: `translateY(-4px)` + gold border glow.
