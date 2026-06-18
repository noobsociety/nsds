Use `QuestCard` for roadmap gates, progress checkpoints, and locked future work. Render cards inside an `ol`.

```jsx
<ol style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:11, listStyle:'none', margin:0, padding:0 }}>
  <QuestCard gate={1} title="Space"     body="Walkable area exists."            status="done"    />
  <QuestCard gate={2} title="Movement"  body="Movement feels right."            status="done"    />
  <QuestCard gate={3} title="Objects"   body="In-space sections open content."  status="active"  />
  <QuestCard gate={6} title="Identity"  body="Space and character read as one." status="planned" />
  <QuestCard gate={8} title="Combat"    body="Unlocks after single-player loop." status="locked"  />
</ol>
```

**Status mapping**
- `done` → `HOLDS`, green `#a6e22e`
- `active` → `BUILDING`, orange `#fd971f`
- `planned` → `PLANNED`, cyan `#66d9e8`
- `locked` → `LATER`, faint `#75715e`, reduced opacity

Import `styles.css` so the `ns-quest-card` and `ns-status-pill` classes are available.
