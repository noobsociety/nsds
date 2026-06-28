/* NoobSociety — Scene Builder editor engine.
   Interactive logic for the HUD composer card: bg / grid / hud toggles, the
   export / import + dirty-tracking + undo/redo command history, the RPG icon
   SVG library (ICON_SVGS) and emote tips, the baked HUD element builders (vital
   bars, tab windows, minimap), and the on-canvas drag / resize / marquee-select
   / align / colour / text-edit engine, plus the palette drag-out and the
   chrome / HUD tooltips.

   Extracted verbatim from the card's inline <script> blocks (no behavioural
   change) to mirror components/scene-builder.css. Load contract: a classic
   (non-module) script that reads the DOM at end of <body>, so it must load
   AFTER the markup and AFTER the inline #baked-state script that seeds
   window.__hudBakedBaseline and the ns-* localStorage defaults. Linked directly
   by the Scene Builder card; NOT auto-imported through styles.css, matching the
   diverged-copy policy of the CSS chrome.

   NOTE: ICON_SVGS duplicates the geometry in components/icons/RPGIcon.tsx
   (vanilla strings vs JSX). Kept inline here for now; unifying the two across
   the compiled-bundle boundary is a tracked follow-up. */

/* ══════════════════════════════════════════
   TOGGLE UTILITIES — shared across bg/grid/hud
   ══════════════════════════════════════════ */
function createToggle(btnId, imgId, storageKey, toggleClass, keyChar) {
  const btn = document.getElementById(btnId);
  const target = imgId ? document.getElementById(imgId) : null;
  if (!btn) return;
  
  let state = localStorage.getItem(storageKey) !== 'false';
  
  function apply() {
    if (target) target.style.display = state ? 'block' : 'none';
    btn.classList.toggle(toggleClass, state);
    localStorage.setItem(storageKey, state);
  }
  
  btn.addEventListener('click', function(e) { 
    e.stopPropagation(); 
    state = !state; 
    apply(); 
  });
  
  if (keyChar) {
    document.addEventListener('keydown', function(e) {
      if ((e.key === keyChar || e.key === keyChar.toUpperCase()) && 
          (!document.activeElement || document.activeElement.contentEditable !== 'true')) {
        state = !state;
        apply();
      }
    });
  }
  
  apply();
}

/* ══════════════════════════════════════════
   BG TOGGLE
   ══════════════════════════════════════════ */
(function() {
  createToggle('bg-toggle', 'world-bg-img', 'ns-bg-on', 'is-on', 'b');
})();

/* ══════════════════════════════════════════
   BACKGROUND  (upload / replace / delete — project asset)
   Stored as a data URL in ns-bg-image, separate from the HUD layout.
   Displayed at native size, anchored top-left, never scaled.
   ══════════════════════════════════════════ */
(function() {
  var img       = document.getElementById('world-bg-img');
  var action    = document.getElementById('bg-action');
  var fileInput = document.getElementById('bg-file');
  var bgToggle  = document.getElementById('bg-toggle');
  if (!img || !action || !fileInput) return;
  var KEY = 'ns-bg-image';
  /* Default scene background — a real project asset, so an imported .json (which
     carries only ns- layout keys, never the bg) opens onto the game world
     instead of a black void. A user upload overrides it; deleting reverts to it. */
  var DEFAULT_BG = '../assets/scene-bg.png';

  var UPLOAD_SVG =
    '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" stroke-width="1.2"/>' +
    '<circle cx="5.5" cy="6.5" r="1" fill="currentColor"/>' +
    '<path d="M3 12 6.5 8.5 9 11l2-1.8 2 2.3" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>';
  var DELETE_SVG =
    '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<path d="M3 4.5h10M6.5 4.5V3h3v1.5M5 4.5l.6 8a1 1 0 0 0 1 .9h2.8a1 1 0 0 0 1-.9l.6-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function has() { return !!localStorage.getItem(KEY); }
  function refresh() {
    var stored = localStorage.getItem(KEY);
    img.src = stored || DEFAULT_BG;
    if (bgToggle) bgToggle.disabled = false;
    var shown = localStorage.getItem('ns-bg-on') !== 'false';
    img.style.display = shown ? 'block' : 'none';
    if (bgToggle) bgToggle.classList.toggle('is-on', shown);
    /* the one button is "upload" on the default scene, "reset" (red trash) once a custom bg is set */
    action.innerHTML = stored ? DELETE_SVG : UPLOAD_SVG;
    action.classList.toggle('is-delete', !!stored);
    action.setAttribute('data-tip', stored ? 'Reset to default background' : 'Upload background');
    action.setAttribute('aria-label', stored ? 'Reset to default background' : 'Upload background');
  }

  action.addEventListener('click', function(e) {
    e.stopPropagation();
    if (has()) {
      localStorage.setItem(KEY, '');          /* delete (storage clear is globally guarded) */
      refresh();
    } else {
      fileInput.click();                      /* upload */
    }
  });
  fileInput.addEventListener('change', function() {
    var f = fileInput.files && fileInput.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function() {
      localStorage.setItem(KEY, reader.result);
      localStorage.setItem('ns-bg-on', 'true');
      refresh();
    };
    reader.readAsDataURL(f);
    fileInput.value = '';
  });
  if (bgToggle) bgToggle.addEventListener('click', function() { setTimeout(refresh, 0); });

  refresh();
})();

/* ══════════════════════════════════════════
   WORLD GRID
   ══════════════════════════════════════════ */
(function() {
  const pat = ['l','d','l','d','d','d','l','d','l'];
  const root = document.getElementById('world');
  pat.forEach(function(t) {
    const cell = document.createElement('div');
    cell.className = 'cell-' + t;
    const inner = document.createElement('div');
    inner.className = 'inner';
    for (var i = 0; i < 64; i++) {
      const ig = document.createElement('div');
      ig.className = 'ig';
      inner.appendChild(ig);
    }
    cell.appendChild(inner);
    root.appendChild(cell);
  });
})();

/* ══════════════════════════════════════════
   GRID TOGGLE
   ══════════════════════════════════════════ */
(function() {
  const btn   = document.getElementById('grid-toggle');
  const stage = document.getElementById('stage');
  if (!btn) return;
  let on = localStorage.getItem('ns-grid-on') !== 'false';

  function apply() {
    stage.classList.toggle('grid-hidden', !on);
    btn.classList.toggle('is-on', on);
    localStorage.setItem('ns-grid-on', on);
    window.hudGridOn = on;
    window.dispatchEvent(new Event('hud-grid-change'));
  }
  
  btn.addEventListener('click', function(e) { e.stopPropagation(); on = !on; apply(); });
  document.addEventListener('keydown', function(e) {
    if ((e.key === 'g' || e.key === 'G') && 
        (!document.activeElement || document.activeElement.contentEditable !== 'true')) {
      on = !on; apply();
    }
  });
  apply();
})();

/* ══════════════════════════════════════════
   EXPORT / IMPORT LAYOUT  (portable .json file)
   ══════════════════════════════════════════ */
(function() {
  var exportBtn = document.getElementById('export-snapshot');
  var importBtn = document.getElementById('import-snapshot');
  var fileInput = document.getElementById('import-file');
  if (!exportBtn || !importBtn || !fileInput) return;

  var MARK_KEY = '__hud_saved_baseline'; // non-ns → never enters snapshots

  /* Recursively sort object keys so equivalent JSON compares equal regardless of order */
  function sortDeep(v) {
    if (Array.isArray(v)) return v.map(sortDeep);
    if (v && typeof v === 'object') {
      var out = {};
      Object.keys(v).sort().forEach(function(k) { out[k] = sortDeep(v[k]); });
      return out;
    }
    return v;
  }
  function normVal(s) {
    try { return JSON.stringify(sortDeep(JSON.parse(s))); } catch (e) { return s; }
  }

  /* All ns- state, as a plain object */
  function stateObject() {
    var o = {};
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('ns-') === 0) keys.push(k);
    }
    keys.sort().forEach(function(k) { o[k] = localStorage.getItem(k); });
    return o;
  }

  /* Canonical (order-independent) string for dirty comparison */
  function canonical() {
    var o = stateObject(), out = {};
    Object.keys(o).sort().forEach(function(k) { out[k] = normVal(o[k]); });
    return JSON.stringify(out);
  }
  function bakedBaseline() {
    try {
      var b = JSON.parse(window.__hudBakedBaseline || '{}'), o = {};
      Object.keys(b).sort().forEach(function(k) { o[k] = normVal(b[k]); });
      return JSON.stringify(o);
    } catch (e) { return ''; }
  }
  function baseline() { return localStorage.getItem(MARK_KEY) || bakedBaseline(); }
  function isDirty() { return canonical() !== baseline(); }

  function render() {
    var dirty = isDirty();
    exportBtn.classList.toggle('is-dirty', dirty);
    exportBtn.setAttribute('data-tip', dirty ? 'Export layout — unsaved  (E)' : 'Export layout  (E)');
  }

  function flash(btn) {
    btn.classList.add('just-saved');
    setTimeout(function() { btn.classList.remove('just-saved'); render(); }, 1500);
  }

  /* ════════════════════════════════════════════════════════════════
     PRODUCT-GRADE LAYOUT DOCUMENT
     The exported file is a normalized, self-describing element list —
     not a raw dump of storage keys — so it is readable, diffable and
     stable. serialize(): storage → document; toStorage(): document →
     storage keys (lossless round-trip).
     ════════════════════════════════════════════════════════════════ */
  var GRID = { cols: 24, rows: 24, tilePx: 24 };
  function pj(key, d) { try { var v = JSON.parse(localStorage.getItem(key)); return (v === null || v === undefined) ? d : v; } catch (e) { return d; } }
  function maps() {
    return {
      layout:  pj('ns-hud-layout', {}),   customs: pj('ns-hud-custom', []),
      icons:   pj('ns-hud-icon-els', []), comps:   pj('ns-hud-comp-els', []),
      emotes:  pj('ns-hud-emoji-els', []),texts:   pj('ns-hud-texts', {}),
      colors:  pj('ns-hud-colors', {}),   fgColors: pj('ns-hud-fgcolors', {}),
      aligns:  pj('ns-hud-align', {}),
      valigns: pj('ns-hud-valigns', {}),  sizes:   pj('ns-hud-sizes', {}),
      pads:    pj('ns-hud-pads', {}),
      zindex:  pj('ns-hud-zindex', {}),
      roles:   pj('ns-hud-roles', {}),    deleted: pj('ns-hud-deleted', []),
      tabwin:  pj('ns-hud-tabwin-data', {}),
      natural: pj('ns-hud-natural', {}),
      zorder:  pj('ns-hud-zorder', {})
    };
  }
  function rectFrom(p) { return p ? { col: p.c1, row: p.r1, width: p.c2 - p.c1, height: p.r2 - p.r1 } : undefined; }
  /* Intrinsic content size — only emitted when it differs from the placed span
     (i.e. the element was scaled by a resize). Restored verbatim on import so the
     --scale that resize produced is reproduced 1:1 instead of snapping back to 1. */
  function natFrom(m, id, rect) {
    var n = m.natural && m.natural[id];
    if (!n || !rect) return undefined;
    if (n.w === rect.width && n.h === rect.height) return undefined;
    return { w: n.w, h: n.h };
  }
  function styleFrom(m, id) {
    var s = {};
    if (m.colors[id])  s.color  = m.colors[id];
    if (m.fgColors && m.fgColors[id]) s.fgColor = m.fgColors[id];
    if (m.sizes[id])   s.size   = m.sizes[id];
    if (m.pads && m.pads[id]) s.pad = m.pads[id];
    if (m.zindex && typeof m.zindex[id] !== 'undefined') s.z = m.zindex[id];
    if (m.aligns[id])  s.align  = m.aligns[id];
    if (m.valigns[id]) s.vAlign = m.valigns[id];
    if (m.roles[id])   s.role   = m.roles[id];
    return Object.keys(s).length ? s : undefined;
  }
  function compact(o) { Object.keys(o).forEach(function(k){ if (o[k] === undefined) delete o[k]; }); return o; }

  function serialize() {
    var m = maps(), els = [], seen = {};
    m.customs.forEach(function(c) {
      seen[c.id] = 1;
      var t = (m.texts['cet-' + c.id] !== undefined) ? m.texts['cet-' + c.id] : c.text;
      var r = rectFrom(m.layout[c.id] || c.pos);
      els.push(compact({ id: c.id, kind: 'text', text: t || '', rect: r, nat: natFrom(m, c.id, r), style: styleFrom(m, c.id) }));
    });
    m.icons.forEach(function(c) {
      seen[c.id] = 1;
      var r = rectFrom(m.layout[c.id]);
      els.push(compact({ id: c.id, kind: 'icon', icon: c.iconName, rect: r, nat: natFrom(m, c.id, r), style: styleFrom(m, c.id) }));
    });
    m.comps.forEach(function(c) {
      seen[c.id] = 1;
      var r = rectFrom(m.layout[c.id]);
      var e = { id: c.id, kind: 'component', component: c.compName, rect: r, nat: natFrom(m, c.id, r), style: styleFrom(m, c.id) };
      if (m.tabwin[c.id]) e.tabs = m.tabwin[c.id].map(function(t){ return t.label; });
      /* Bar widgets carry an editable inner label persisted under 'bet-<id>'. Capture
         it (empty string included) so a cleared bar text survives export → import. */
      if (m.texts['bet-' + c.id] !== undefined) e.text = m.texts['bet-' + c.id];
      els.push(compact(e));
    });
    m.emotes.forEach(function(c) {
      seen[c.id] = 1;
      els.push(compact({ id: c.id, kind: 'emote', emote: c.emoji, rect: rectFrom(m.layout[c.id]), style: styleFrom(m, c.id) }));
    });
    var builtin = {};
    Object.keys(m.layout).forEach(function(id){ if (id.indexOf('el-') === 0) builtin[id] = 1; });
    m.deleted.forEach(function(id){ if (id.indexOf('el-') === 0) builtin[id] = 1; });
    /* A builtin changed only via style/size/align/etc (never moved) has no layout
       entry — collect it from every override map so its state survives export. */
    [m.colors, m.fgColors, m.sizes, m.pads, m.zindex, m.aligns, m.valigns, m.roles, m.natural, m.zorder].forEach(function(map){
      if (map) Object.keys(map).forEach(function(id){ if (id.indexOf('el-') === 0 && document.getElementById(id)) builtin[id] = 1; });
    });
    /* A builtin whose ONLY edit is its text (e.g. an HP bar cleared to empty) lives
       solely under an 'et-<suffix>' key — map it back to its 'el-<suffix>' element so
       the override (empty string included) is preserved instead of reverting on import. */
    Object.keys(m.texts || {}).forEach(function(tk){
      if (tk.indexOf('et-') === 0) { var bid = 'el-' + tk.slice(3); if (document.getElementById(bid)) builtin[bid] = 1; }
    });
    Object.keys(builtin).forEach(function(id) {
      if (seen[id]) return;
      var tk = 'et-' + id.replace(/^el-/, '');
      var e = { id: id, kind: 'builtin', rect: rectFrom(m.layout[id]), style: styleFrom(m, id) };
      if (m.texts[tk] !== undefined) e.text = m.texts[tk];
      if (m.deleted.indexOf(id) >= 0) e.removed = true;
      els.push(compact(e));
    });
    /* Stacking order (front/back) is a cross-cutting concern, so stamp it on every
       element in one pass rather than threading it through each builder above.
       Restored on import so overlapping objects keep the exact layering. */
    els.forEach(function(e){ if (m.zorder && m.zorder[e.id] != null) e.stack = m.zorder[e.id]; });
    return {
      "$schema":  "https://noobsociety.gg/schema/hud-layout/v1",
      kind:       "NoobSocietyHudLayout",
      version:    1,
      generator:  "NoobSociety Scene Builder",
      exportedAt: new Date().toISOString(),
      grid:       { cols: GRID.cols, rows: GRID.rows, tilePx: GRID.tilePx, origin: 1 },
      canvas: {
        showGrid:       localStorage.getItem('ns-grid-on') !== 'false',
        showHud:        localStorage.getItem('ns-hud-on')  !== 'false',
        showBackground: localStorage.getItem('ns-bg-on')   !== 'false'
      },
      elements: els
    };
  }

  /* document → ns- storage keys */
  function toStorage(doc) {
    var layout = {}, customs = [], icons = [], comps = [], emotes = [],
        texts = {}, colors = {}, fgColors = {}, aligns = {}, valigns = {}, sizes = {}, pads = {}, zindex = {}, roles = {}, deleted = [], tabwin = {}, natural = {}, zorder = {};
    (doc.elements || []).forEach(function(e) {
      var id = e.id; if (!id) return;
      if (e.rect) layout[id] = { c1: e.rect.col, r1: e.rect.row, c2: e.rect.col + e.rect.width, r2: e.rect.row + e.rect.height };
      if (e.nat)  natural[id] = { w: e.nat.w, h: e.nat.h };
      if (typeof e.stack !== 'undefined') zorder[id] = e.stack;
      var st = e.style || {};
      if (st.color)   colors[id]   = st.color;
      if (st.fgColor) fgColors[id] = st.fgColor;
      if (st.size)   sizes[id]   = st.size;
      if (st.pad)    pads[id]    = st.pad;
      if (typeof st.z !== 'undefined') zindex[id] = st.z;
      if (st.align)  aligns[id]  = st.align;
      if (st.vAlign) valigns[id] = st.vAlign;
      if (st.role)   roles[id]   = st.role;
      if (e.kind === 'text') {
        customs.push({ id: id, pos: layout[id] || { c1:1, r1:1, c2:2, r2:2 }, text: e.text || '' });
        texts['cet-' + id] = e.text || '';
      } else if (e.kind === 'icon') {
        icons.push({ id: id, iconName: e.icon });
      } else if (e.kind === 'component') {
        comps.push({ id: id, compName: e.component });
        if (e.tabs) tabwin[id] = e.tabs.map(function(l){ return { label: l }; });
        /* Restore the bar's inner label so buildBar reads it back from 'bet-<id>'. */
        if (e.text !== undefined) texts['bet-' + id] = e.text;
      } else if (e.kind === 'emote') {
        emotes.push({ id: id, emoji: e.emote });
      } else if (e.kind === 'builtin') {
        if (e.text !== undefined) texts['et-' + id.replace(/^el-/, '')] = e.text;
        if (e.removed) deleted.push(id);
      }
    });
    var out = {
      'ns-hud-layout':      JSON.stringify(layout),
      'ns-hud-natural':     JSON.stringify(natural),
      'ns-hud-zorder':      JSON.stringify(zorder),
      'ns-hud-custom':      JSON.stringify(customs),
      'ns-hud-icon-els':    JSON.stringify(icons),
      'ns-hud-comp-els':    JSON.stringify(comps),
      'ns-hud-emoji-els':   JSON.stringify(emotes),
      'ns-hud-texts':       JSON.stringify(texts),
      'ns-hud-colors':      JSON.stringify(colors),
      'ns-hud-fgcolors':    JSON.stringify(fgColors),
      'ns-hud-align':       JSON.stringify(aligns),
      'ns-hud-valigns':     JSON.stringify(valigns),
      'ns-hud-sizes':       JSON.stringify(sizes),
      'ns-hud-pads':        JSON.stringify(pads),
      'ns-hud-zindex':      JSON.stringify(zindex),
      'ns-hud-roles':       JSON.stringify(roles),
      'ns-hud-deleted':     JSON.stringify(deleted),
      'ns-hud-tabwin-data': JSON.stringify(tabwin)
    };
    if (doc.canvas) {
      out['ns-grid-on'] = String(doc.canvas.showGrid !== false);
      out['ns-hud-on']  = String(doc.canvas.showHud !== false);
      out['ns-bg-on']   = String(doc.canvas.showBackground !== false);
    }
    return out;
  }

  /* ── Export → download .json (clean layout document) ── */
  exportBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    var doc = serialize();
    var blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var stamp = new Date().toISOString().slice(0, 19).replace(/:/g, '');
    a.href = url;
    a.download = 'scene-builder-export-' + stamp + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
    localStorage.setItem(MARK_KEY, canonical());
    flash(exportBtn);
  });

  /* ── Import ← read .json, apply, reload ── */
  importBtn.addEventListener('click', function(e) { e.stopPropagation(); fileInput.click(); });
  fileInput.addEventListener('change', function() {
    var file = fileInput.files && fileInput.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function() {
      try {
        var doc = JSON.parse(reader.result);
        var stateKeys;
        if (doc && Array.isArray(doc.elements)) {
          stateKeys = toStorage(doc);                          // clean layout document
        } else if (doc && doc.state) {
          stateKeys = doc.state;                               // legacy raw-state dump
        } else if (doc && Object.keys(doc).some(function(k){ return k.indexOf('ns-') === 0; })) {
          stateKeys = doc;                                     // legacy bare state
        } else {
          throw new Error('Unrecognised file — no "elements" array or layout state found.');
        }
        var keys = Object.keys(stateKeys).filter(function(k) { return k.indexOf('ns-') === 0; });
        if (!keys.length) throw new Error('No HUD elements found in file.');
        keys.forEach(function(k) { localStorage.setItem(k, stateKeys[k]); });
        /* Stash the payload under a key the on-load baseline wipe does NOT clear,
           so the scene survives the reload below instead of resetting to blank. */
        var payload = {};
        keys.forEach(function(k) { payload[k] = stateKeys[k]; });
        localStorage.setItem('__hud_import_payload', JSON.stringify(payload));
        localStorage.setItem('hud_saved_snapshot', btoa(unescape(encodeURIComponent('NSHUD1:' + JSON.stringify(stateKeys)))));
        localStorage.setItem(MARK_KEY, canonical());
        flash(importBtn);
        setTimeout(function() { location.reload(); }, 300);
      } catch (err) {
        alert('Could not import this file — it is not a valid NoobSociety HUD layout.\n\n' + err.message);
      }
      fileInput.value = '';
    };
    reader.readAsText(file);
  });

  render();
  setInterval(function() {
    if (!exportBtn.classList.contains('just-saved')) render();
  }, 700);

  /* Keyboard shortcuts: E = export, I = import (ignored while editing text) */
  document.addEventListener('keydown', function(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var editing = document.activeElement && document.activeElement.contentEditable === 'true';
    if (editing) return;
    if (e.key === 'e' || e.key === 'E') { e.preventDefault(); exportBtn.click(); }
    else if (e.key === 'i' || e.key === 'I') { e.preventDefault(); importBtn.click(); }
  });
})();

/* ══════════════════════════════════════════
   HUD TOGGLE
   ══════════════════════════════════════════ */
(function() {
  const btn = document.getElementById('hud-toggle');
  const hud = document.querySelector('.hud');
  if (!btn || !hud) return;
  let on = localStorage.getItem('ns-hud-on') !== 'false';

  function apply() {
    hud.style.display = on ? 'grid' : 'none';
    btn.classList.toggle('is-on', on);
    localStorage.setItem('ns-hud-on', on);
  }

  btn.addEventListener('click', function(e) { e.stopPropagation(); on = !on; apply(); });
  document.addEventListener('keydown', function(e) {
    if ((e.key === 'h' || e.key === 'H') && 
        (!document.activeElement || document.activeElement.contentEditable !== 'true')) {
      on = !on; apply();
    }
  });
  apply();
})();


/* ══════════════════════════════════════════
   RPG ICON SVG LIBRARY
   ══════════════════════════════════════════ */
var ICON_SVGS = {
  sword:   '<line x1="14" y1="2" x2="6" y2="10" stroke="#cfd8e2" stroke-width="2" stroke-linecap="square"/><line x1="13" y1="2" x2="14" y2="3" stroke="#eef0f4" stroke-width="1" stroke-linecap="square"/><line x1="4" y1="9" x2="8" y2="13" stroke="#e6db74" stroke-width="2" stroke-linecap="square"/><line x1="6" y1="11" x2="3" y2="14" stroke="#b07040" stroke-width="2" stroke-linecap="square"/>',
  staff:   '<rect x="5" y="1" width="6" height="1" fill="#c8a8ff"/><rect x="4" y="2" width="8" height="4" fill="#ae81ff"/><rect x="5" y="6" width="6" height="1" fill="#c8a8ff"/><rect x="6" y="3" width="4" height="2" fill="#d4b8ff"/><rect x="7" y="7" width="2" height="8" fill="#8a6540"/><rect x="6" y="10" width="4" height="1" fill="#b07040"/>',
  bow:     '<rect x="3" y="1" width="3" height="2" fill="#8a6540"/><rect x="2" y="3" width="2" height="10" fill="#8a6540"/><rect x="3" y="13" width="3" height="2" fill="#8a6540"/><rect x="6" y="2" width="1" height="1" fill="#cfd8e2"/><rect x="7" y="3" width="1" height="10" fill="#cfd8e2"/><rect x="6" y="13" width="1" height="1" fill="#cfd8e2"/><rect x="7" y="7" width="7" height="2" fill="#c8a878"/><rect x="13" y="6" width="2" height="1" fill="#cfd8e2"/><rect x="14" y="7" width="2" height="2" fill="#cfd8e2"/><rect x="13" y="9" width="2" height="1" fill="#cfd8e2"/><rect x="7" y="5" width="2" height="2" fill="#ae81ff"/><rect x="7" y="9" width="2" height="2" fill="#ae81ff"/>',
  katar:   '<rect x="2" y="1" width="2" height="8" fill="#cfd8e2"/><rect x="2" y="9" width="2" height="3" fill="#a8b0bc"/><rect x="12" y="1" width="2" height="8" fill="#cfd8e2"/><rect x="12" y="9" width="2" height="3" fill="#a8b0bc"/><rect x="2" y="8" width="12" height="2" fill="#e6db74"/><rect x="6" y="10" width="4" height="5" fill="#8a6540"/><rect x="3" y="0" width="1" height="1" fill="#eef0f4"/><rect x="12" y="0" width="1" height="1" fill="#eef0f4"/>',
  book:    '<rect x="2" y="2" width="2" height="12" fill="#6a4a6a"/><rect x="4" y="2" width="10" height="12" fill="#8855aa"/><rect x="13" y="3" width="1" height="10" fill="#f4f0e8"/><rect x="7" y="4" width="2" height="1" fill="#c8a8ff"/><rect x="6" y="5" width="4" height="1" fill="#c8a8ff"/><rect x="7" y="6" width="2" height="1" fill="#c8a8ff"/><rect x="6" y="8" width="4" height="1" fill="#e6db74"/><rect x="7" y="9" width="2" height="2" fill="#e6db74"/>',
  hammer:  '<rect x="4" y="1" width="8" height="1" fill="#a8b0bc"/><rect x="3" y="2" width="10" height="5" fill="#a8b0bc"/><rect x="3" y="2" width="10" height="1" fill="#cfd8e2"/><rect x="3" y="3" width="1" height="3" fill="#cfd8e2"/><rect x="3" y="7" width="10" height="1" fill="#5a6570"/><rect x="7" y="7" width="2" height="8" fill="#8a6540"/><rect x="6" y="10" width="4" height="1" fill="#b07040"/>',
  neutral: '<rect x="2" y="6" width="12" height="4" fill="#7a7a8a"/><rect x="6" y="2" width="4" height="12" fill="#7a7a8a"/><rect x="3" y="3" width="2" height="2" fill="#7a7a8a"/><rect x="11" y="3" width="2" height="2" fill="#7a7a8a"/><rect x="3" y="11" width="2" height="2" fill="#7a7a8a"/><rect x="11" y="11" width="2" height="2" fill="#7a7a8a"/><rect x="7" y="7" width="2" height="2" fill="#b0b0c0"/><rect x="7" y="4" width="2" height="1" fill="#b0b0c0"/><rect x="7" y="11" width="2" height="1" fill="#b0b0c0"/><rect x="4" y="7" width="1" height="2" fill="#b0b0c0"/><rect x="11" y="7" width="1" height="2" fill="#b0b0c0"/>',
  earth:   '<rect x="7" y="2" width="2" height="2" fill="#c8a050"/><rect x="6" y="4" width="4" height="2" fill="#c8a050"/><rect x="5" y="6" width="6" height="2" fill="#8b6914"/><rect x="4" y="8" width="8" height="2" fill="#8b6914"/><rect x="3" y="10" width="10" height="2" fill="#6a5010"/><rect x="1" y="12" width="14" height="3" fill="#5a4008"/><rect x="7" y="2" width="2" height="1" fill="#f0ece0"/><rect x="6" y="3" width="4" height="1" fill="#f0ece0"/><rect x="5" y="8" width="1" height="1" fill="#a07820"/><rect x="10" y="9" width="1" height="1" fill="#a07820"/>',
  wind:    '<rect x="2" y="4" width="10" height="1" fill="#5dcaa5"/><rect x="3" y="5" width="2" height="1" fill="#5dcaa5"/><rect x="12" y="3" width="2" height="2" fill="#5dcaa5"/><rect x="13" y="5" width="1" height="1" fill="#5dcaa5"/><rect x="1" y="7" width="11" height="2" fill="#5dcaa5"/><rect x="12" y="6" width="2" height="4" fill="#5dcaa5"/><rect x="11" y="10" width="2" height="1" fill="#5dcaa5"/><rect x="2" y="12" width="9" height="1" fill="#5dcaa5"/><rect x="2" y="11" width="2" height="1" fill="#5dcaa5"/><rect x="11" y="12" width="2" height="2" fill="#5dcaa5"/><rect x="10" y="14" width="2" height="1" fill="#5dcaa5"/><rect x="2" y="3" width="8" height="1" fill="#90e8cc"/><rect x="2" y="8" width="9" height="1" fill="#90e8cc"/>',
  water:   '<rect x="6" y="1" width="4" height="1" fill="#378add"/><rect x="5" y="2" width="6" height="2" fill="#378add"/><rect x="4" y="4" width="8" height="6" fill="#378add"/><rect x="5" y="10" width="6" height="2" fill="#378add"/><rect x="6" y="12" width="4" height="2" fill="#378add"/><rect x="7" y="14" width="2" height="1" fill="#378add"/><rect x="6" y="4" width="3" height="4" fill="#70b8f0"/><rect x="7" y="3" width="2" height="1" fill="#70b8f0"/><rect x="5" y="7" width="2" height="1" fill="#1a5a9a"/><rect x="9" y="8" width="2" height="1" fill="#1a5a9a"/>',
  fire:    '<rect x="4" y="11" width="8" height="4" fill="#ba7517"/><rect x="3" y="8" width="10" height="3" fill="#ba7517"/><rect x="4" y="5" width="8" height="3" fill="#ba7517"/><rect x="5" y="3" width="6" height="2" fill="#ba7517"/><rect x="6" y="1" width="4" height="2" fill="#ba7517"/><rect x="5" y="9" width="6" height="5" fill="#e8882a"/><rect x="6" y="7" width="4" height="2" fill="#e8882a"/><rect x="6" y="10" width="4" height="3" fill="#e6db74"/><rect x="7" y="9" width="2" height="1" fill="#e6db74"/>',
  light:   '<rect x="5" y="5" width="6" height="6" fill="#fac775"/><rect x="6" y="4" width="4" height="1" fill="#fac775"/><rect x="6" y="11" width="4" height="1" fill="#fac775"/><rect x="4" y="6" width="1" height="4" fill="#fac775"/><rect x="11" y="6" width="1" height="4" fill="#fac775"/><rect x="7" y="1" width="2" height="3" fill="#fac775"/><rect x="7" y="12" width="2" height="3" fill="#fac775"/><rect x="1" y="7" width="3" height="2" fill="#fac775"/><rect x="12" y="7" width="3" height="2" fill="#fac775"/><rect x="3" y="3" width="2" height="2" fill="#fac775"/><rect x="11" y="3" width="2" height="2" fill="#fac775"/><rect x="3" y="11" width="2" height="2" fill="#fac775"/><rect x="11" y="11" width="2" height="2" fill="#fac775"/><rect x="6" y="6" width="4" height="4" fill="#fff8e0"/>',
  dark:    '<rect x="5" y="2" width="6" height="2" fill="#888780"/><rect x="3" y="4" width="8" height="8" fill="#888780"/><rect x="5" y="12" width="6" height="2" fill="#888780"/><rect x="4" y="3" width="1" height="10" fill="#888780"/><rect x="8" y="4" width="4" height="8" fill="#1a1a20"/><rect x="7" y="5" width="5" height="6" fill="#1a1a20"/><rect x="11" y="2" width="1" height="1" fill="#c8c8d0"/><rect x="13" y="5" width="1" height="1" fill="#c8c8d0"/><rect x="12" y="9" width="1" height="1" fill="#c8c8d0"/>',
  void:    '<rect x="5" y="1" width="6" height="2" fill="#7f77dd"/><rect x="3" y="3" width="10" height="2" fill="#7f77dd"/><rect x="2" y="5" width="12" height="6" fill="#7f77dd"/><rect x="3" y="11" width="10" height="2" fill="#7f77dd"/><rect x="5" y="13" width="6" height="2" fill="#7f77dd"/><rect x="4" y="4" width="8" height="8" fill="#1a1828"/><rect x="5" y="3" width="6" height="1" fill="#1a1828"/><rect x="5" y="12" width="6" height="1" fill="#1a1828"/><rect x="3" y="5" width="1" height="6" fill="#1a1828"/><rect x="12" y="5" width="1" height="6" fill="#1a1828"/><rect x="6" y="6" width="4" height="4" fill="#4a44aa"/><rect x="7" y="5" width="2" height="1" fill="#4a44aa"/><rect x="7" y="10" width="2" height="1" fill="#4a44aa"/><rect x="5" y="7" width="1" height="2" fill="#4a44aa"/><rect x="10" y="7" width="1" height="2" fill="#4a44aa"/><rect x="7" y="7" width="2" height="2" fill="#c8c0ff"/>',
  human:   '<rect x="5" y="1" width="6" height="5" fill="#e8c87a"/><rect x="7" y="6" width="2" height="1" fill="#d4a85a"/><rect x="3" y="7" width="10" height="5" fill="#c8873a"/><rect x="1" y="7" width="2" height="4" fill="#c8873a"/><rect x="13" y="7" width="2" height="4" fill="#c8873a"/><rect x="4" y="12" width="3" height="3" fill="#8a5c2a"/><rect x="9" y="12" width="3" height="3" fill="#8a5c2a"/>',
  beast:   '<rect x="2" y="1" width="3" height="4" fill="#c8a060"/><rect x="11" y="1" width="3" height="4" fill="#c8a060"/><rect x="3" y="2" width="1" height="2" fill="#e8886a"/><rect x="12" y="2" width="1" height="2" fill="#e8886a"/><rect x="3" y="4" width="10" height="6" fill="#c8a060"/><rect x="5" y="8" width="6" height="3" fill="#d4b070"/><rect x="7" y="8" width="2" height="1" fill="#5a3020"/><rect x="4" y="6" width="3" height="2" fill="#e8a020"/><rect x="9" y="6" width="3" height="2" fill="#e8a020"/><rect x="5" y="6" width="1" height="2" fill="#1a1008"/><rect x="10" y="6" width="1" height="2" fill="#1a1008"/><rect x="3" y="11" width="10" height="4" fill="#a87840"/><rect x="1" y="11" width="2" height="3" fill="#a87840"/><rect x="13" y="11" width="2" height="3" fill="#a87840"/>',
  demon:   '<rect x="3" y="1" width="2" height="5" fill="#cc3030"/><rect x="11" y="1" width="2" height="5" fill="#cc3030"/><rect x="2" y="1" width="2" height="2" fill="#cc3030"/><rect x="12" y="1" width="2" height="2" fill="#cc3030"/><rect x="3" y="5" width="10" height="6" fill="#7a2a2a"/><rect x="4" y="7" width="3" height="2" fill="#ff2020"/><rect x="9" y="7" width="3" height="2" fill="#ff2020"/><rect x="5" y="7" width="1" height="2" fill="#ff8080"/><rect x="10" y="7" width="1" height="2" fill="#ff8080"/><rect x="6" y="11" width="1" height="2" fill="#f0e8d0"/><rect x="9" y="11" width="1" height="2" fill="#f0e8d0"/><rect x="2" y="12" width="12" height="4" fill="#5a1a1a"/><rect x="1" y="12" width="2" height="3" fill="#5a1a1a"/><rect x="13" y="12" width="2" height="3" fill="#5a1a1a"/>',
  angel:   '<rect x="4" y="1" width="8" height="1" fill="#e6db74"/><rect x="3" y="2" width="10" height="1" fill="#e6db74"/><rect x="3" y="3" width="2" height="1" fill="#e6db74"/><rect x="11" y="3" width="2" height="1" fill="#e6db74"/><rect x="5" y="4" width="6" height="5" fill="#f4e4c0"/><rect x="6" y="6" width="2" height="1" fill="#6090e0"/><rect x="10" y="6" width="2" height="1" fill="#6090e0"/><rect x="1" y="9" width="4" height="5" fill="#f0f0f8"/><rect x="11" y="9" width="4" height="5" fill="#f0f0f8"/><rect x="1" y="9" width="2" height="3" fill="#ffffff"/><rect x="13" y="9" width="2" height="3" fill="#ffffff"/><rect x="5" y="9" width="6" height="6" fill="#d4c8f0"/><rect x="4" y="10" width="1" height="4" fill="#d4c8f0"/><rect x="11" y="10" width="1" height="4" fill="#d4c8f0"/>',
  spirit:  '<rect x="6" y="1" width="4" height="2" fill="#66d9e8"/><rect x="5" y="3" width="6" height="4" fill="#66d9e8"/><rect x="4" y="7" width="8" height="4" fill="#66d9e8"/><rect x="5" y="11" width="6" height="2" fill="#66d9e8"/><rect x="4" y="13" width="2" height="2" fill="#66d9e8"/><rect x="7" y="13" width="2" height="2" fill="#66d9e8"/><rect x="10" y="13" width="2" height="2" fill="#66d9e8"/><rect x="6" y="4" width="4" height="3" fill="#b0eff6"/><rect x="7" y="3" width="2" height="1" fill="#b0eff6"/><rect x="6" y="7" width="2" height="2" fill="#ffffff"/><rect x="9" y="7" width="2" height="2" fill="#ffffff"/><rect x="7" y="8" width="1" height="1" fill="#66d9e8"/><rect x="10" y="8" width="1" height="1" fill="#66d9e8"/>',
  small:   '<rect x="1" y="11" width="3" height="4" fill="#cfd8e2"/><rect x="6" y="7" width="4" height="8" fill="#4a4a5a"/><rect x="12" y="4" width="3" height="11" fill="#4a4a5a"/><rect x="1" y="15" width="14" height="1" fill="#5a5a6a"/><rect x="1" y="8" width="1" height="2" fill="#e6db74"/><rect x="3" y="10" width="1" height="2" fill="#e6db74"/><rect x="2" y="10" width="1" height="1" fill="#e6db74"/>',
  medium:  '<rect x="1" y="11" width="3" height="4" fill="#4a4a5a"/><rect x="6" y="7" width="4" height="8" fill="#cfd8e2"/><rect x="12" y="4" width="3" height="11" fill="#4a4a5a"/><rect x="1" y="15" width="14" height="1" fill="#5a5a6a"/><rect x="6" y="4" width="1" height="2" fill="#e6db74"/><rect x="9" y="4" width="1" height="2" fill="#e6db74"/><rect x="7" y="5" width="2" height="1" fill="#e6db74"/>',
  large:   '<rect x="1" y="11" width="3" height="4" fill="#4a4a5a"/><rect x="6" y="7" width="4" height="8" fill="#4a4a5a"/><rect x="12" y="4" width="3" height="11" fill="#cfd8e2"/><rect x="1" y="15" width="14" height="1" fill="#5a5a6a"/><rect x="13" y="1" width="1" height="2" fill="#e6db74"/><rect x="14" y="1" width="1" height="3" fill="#e6db74"/><rect x="13" y="3" width="1" height="1" fill="#e6db74"/>',
  slash:   '<rect x="10" y="1" width="2" height="2" fill="#ff6040"/><rect x="9" y="3" width="2" height="2" fill="#ff6040"/><rect x="8" y="5" width="2" height="2" fill="#ff6040"/><rect x="12" y="3" width="2" height="2" fill="#ff9070"/><rect x="11" y="5" width="2" height="2" fill="#ff9070"/><rect x="10" y="7" width="2" height="2" fill="#ff9070"/><rect x="6" y="7" width="2" height="2" fill="#ff6040"/><rect x="5" y="9" width="2" height="2" fill="#ff6040"/><rect x="4" y="11" width="2" height="2" fill="#ff6040"/><rect x="3" y="13" width="2" height="2" fill="#c83010"/>',
  thrust:  '<rect x="1" y="7" width="8" height="2" fill="#a8b0bc"/><rect x="9" y="6" width="4" height="4" fill="#cfd8e2"/><rect x="13" y="7" width="2" height="2" fill="#eef0f4"/><rect x="6" y="6" width="2" height="1" fill="#e6db74"/><rect x="6" y="9" width="2" height="1" fill="#e6db74"/>',
  smash:   '<rect x="7" y="1" width="2" height="3" fill="#fac775"/><rect x="12" y="3" width="3" height="2" fill="#fac775"/><rect x="13" y="7" width="2" height="2" fill="#fac775"/><rect x="12" y="11" width="3" height="2" fill="#fac775"/><rect x="7" y="12" width="2" height="3" fill="#fac775"/><rect x="1" y="11" width="3" height="2" fill="#fac775"/><rect x="1" y="7" width="2" height="2" fill="#fac775"/><rect x="2" y="3" width="2" height="2" fill="#fac775"/><rect x="5" y="5" width="6" height="6" fill="#ff9040"/><rect x="6" y="6" width="4" height="4" fill="#ffe080"/>',
  shoot:   '<rect x="1" y="7" width="10" height="2" fill="#c8a878"/><rect x="11" y="6" width="2" height="4" fill="#cfd8e2"/><rect x="13" y="7" width="2" height="2" fill="#eef0f4"/><rect x="1" y="6" width="2" height="1" fill="#ae81ff"/><rect x="1" y="9" width="2" height="1" fill="#ae81ff"/><rect x="3" y="5" width="1" height="1" fill="#ae81ff"/><rect x="3" y="10" width="1" height="1" fill="#ae81ff"/>',
  cast:    '<rect x="7" y="1" width="2" height="2" fill="#c8a8ff"/><rect x="7" y="13" width="2" height="2" fill="#c8a8ff"/><rect x="1" y="7" width="2" height="2" fill="#c8a8ff"/><rect x="13" y="7" width="2" height="2" fill="#c8a8ff"/><rect x="4" y="4" width="2" height="2" fill="#ae81ff"/><rect x="10" y="4" width="2" height="2" fill="#ae81ff"/><rect x="4" y="10" width="2" height="2" fill="#ae81ff"/><rect x="10" y="10" width="2" height="2" fill="#ae81ff"/><rect x="6" y="6" width="4" height="4" fill="#7f77dd"/><rect x="7" y="7" width="2" height="2" fill="#ffffff"/>',
  throw:   '<rect x="3" y="3" width="2" height="2" fill="#e6db74"/><rect x="6" y="1" width="2" height="2" fill="#e6db74"/><rect x="10" y="2" width="2" height="2" fill="#e6db74"/><rect x="13" y="5" width="2" height="2" fill="#e6db74"/><rect x="12" y="9" width="3" height="3" fill="#c8a050"/><rect x="1" y="8" width="3" height="4" fill="#8a6540"/><rect x="3" y="10" width="2" height="4" fill="#e8c87a"/>',
  charge:  '<rect x="9" y="1" width="3" height="4" fill="#e6db74"/><rect x="6" y="5" width="6" height="4" fill="#e6db74"/><rect x="4" y="9" width="6" height="6" fill="#e6db74"/><rect x="10" y="5" width="2" height="1" fill="#fac775"/><rect x="7" y="9" width="2" height="1" fill="#fac775"/><rect x="1" y="4" width="5" height="1" fill="#c8a050"/><rect x="1" y="7" width="4" height="1" fill="#c8a050"/><rect x="1" y="10" width="3" height="1" fill="#c8a050"/>',
  counter: '<rect x="4" y="1" width="8" height="10" fill="#a8b0bc"/><rect x="5" y="2" width="6" height="8" fill="#cfd8e2"/><rect x="6" y="11" width="4" height="2" fill="#a8b0bc"/><rect x="7" y="13" width="2" height="2" fill="#a8b0bc"/><rect x="7" y="4" width="2" height="4" fill="#5dcaa5"/><rect x="5" y="6" width="2" height="2" fill="#5dcaa5"/><rect x="9" y="6" width="2" height="2" fill="#5dcaa5"/>',
  passive: '<rect x="5" y="1" width="6" height="1" fill="#5a6a7a"/><rect x="4" y="2" width="8" height="8" fill="#4a5a6a"/><rect x="5" y="10" width="6" height="2" fill="#4a5a6a"/><rect x="6" y="12" width="4" height="2" fill="#4a5a6a"/><rect x="7" y="14" width="2" height="1" fill="#4a5a6a"/><rect x="6" y="4" width="4" height="4" fill="#5dcaa5"/><rect x="7" y="3" width="2" height="1" fill="#5dcaa5"/><rect x="5" y="5" width="1" height="2" fill="#5dcaa5"/><rect x="10" y="5" width="1" height="2" fill="#5dcaa5"/><rect x="7" y="8" width="2" height="1" fill="#5dcaa5"/>',
  active:  '<rect x="7" y="1" width="2" height="3" fill="#fac775"/><rect x="7" y="12" width="2" height="3" fill="#fac775"/><rect x="1" y="7" width="3" height="2" fill="#fac775"/><rect x="12" y="7" width="3" height="2" fill="#fac775"/><rect x="3" y="3" width="2" height="2" fill="#fac775"/><rect x="11" y="3" width="2" height="2" fill="#fac775"/><rect x="3" y="11" width="2" height="2" fill="#fac775"/><rect x="11" y="11" width="2" height="2" fill="#fac775"/><rect x="5" y="5" width="6" height="6" fill="#ff9040"/><rect x="6" y="6" width="4" height="4" fill="#ffdd80"/><rect x="7" y="7" width="2" height="2" fill="#ffffff"/>',
  combo:   '<rect x="2" y="6" width="3" height="4" fill="#ae81ff"/><rect x="7" y="4" width="3" height="4" fill="#ae81ff"/><rect x="12" y="6" width="3" height="4" fill="#ae81ff"/><rect x="5" y="7" width="2" height="2" fill="#7f77dd"/><rect x="10" y="7" width="2" height="2" fill="#7f77dd"/><rect x="3" y="11" width="2" height="1" fill="#c8a8ff"/><rect x="8" y="9" width="2" height="1" fill="#c8a8ff"/><rect x="13" y="11" width="2" height="1" fill="#c8a8ff"/>',
  aura:    '<rect x="6" y="1" width="4" height="1" fill="#c8a8ff"/><rect x="4" y="2" width="2" height="1" fill="#c8a8ff"/><rect x="10" y="2" width="2" height="1" fill="#c8a8ff"/><rect x="2" y="4" width="1" height="2" fill="#c8a8ff"/><rect x="13" y="4" width="1" height="2" fill="#c8a8ff"/><rect x="1" y="6" width="1" height="4" fill="#c8a8ff"/><rect x="14" y="6" width="1" height="4" fill="#c8a8ff"/><rect x="2" y="10" width="1" height="2" fill="#c8a8ff"/><rect x="13" y="10" width="1" height="2" fill="#c8a8ff"/><rect x="4" y="13" width="2" height="1" fill="#c8a8ff"/><rect x="10" y="13" width="2" height="1" fill="#c8a8ff"/><rect x="6" y="14" width="4" height="1" fill="#c8a8ff"/><rect x="6" y="4" width="4" height="1" fill="#7f77dd"/><rect x="4" y="6" width="1" height="4" fill="#7f77dd"/><rect x="11" y="6" width="1" height="4" fill="#7f77dd"/><rect x="6" y="11" width="4" height="1" fill="#7f77dd"/><rect x="6" y="6" width="4" height="4" fill="#ae81ff"/><rect x="7" y="7" width="2" height="2" fill="#c8a8ff"/>',
  buff:    '<rect x="7" y="1" width="2" height="1" fill="#5dcaa5"/><rect x="6" y="2" width="4" height="2" fill="#5dcaa5"/><rect x="5" y="4" width="6" height="2" fill="#5dcaa5"/><rect x="7" y="6" width="2" height="9" fill="#5dcaa5"/><rect x="6" y="3" width="1" height="1" fill="#90e8cc"/><rect x="9" y="3" width="1" height="1" fill="#90e8cc"/><rect x="5" y="5" width="1" height="1" fill="#90e8cc"/><rect x="10" y="5" width="1" height="1" fill="#90e8cc"/>',
  debuff:  '<rect x="7" y="5" width="2" height="9" fill="#cc3030"/><rect x="5" y="10" width="6" height="2" fill="#cc3030"/><rect x="6" y="12" width="4" height="2" fill="#cc3030"/><rect x="7" y="14" width="2" height="1" fill="#cc3030"/><rect x="5" y="11" width="1" height="1" fill="#ff8080"/><rect x="10" y="11" width="1" height="1" fill="#ff8080"/><rect x="6" y="13" width="1" height="1" fill="#ff8080"/><rect x="9" y="13" width="1" height="1" fill="#ff8080"/>',
  summon:  '<rect x="6" y="1" width="4" height="1" fill="#7f77dd"/><rect x="4" y="2" width="2" height="2" fill="#7f77dd"/><rect x="10" y="2" width="2" height="2" fill="#7f77dd"/><rect x="2" y="4" width="2" height="2" fill="#7f77dd"/><rect x="12" y="4" width="2" height="2" fill="#7f77dd"/><rect x="1" y="6" width="2" height="4" fill="#7f77dd"/><rect x="13" y="6" width="2" height="4" fill="#7f77dd"/><rect x="2" y="10" width="2" height="2" fill="#7f77dd"/><rect x="12" y="10" width="2" height="2" fill="#7f77dd"/><rect x="4" y="12" width="2" height="2" fill="#7f77dd"/><rect x="10" y="12" width="2" height="2" fill="#7f77dd"/><rect x="6" y="14" width="4" height="1" fill="#7f77dd"/><rect x="5" y="4" width="6" height="8" fill="#1a1828"/><rect x="4" y="5" width="8" height="6" fill="#1a1828"/><rect x="6" y="6" width="4" height="4" fill="#4a44aa"/><rect x="7" y="7" width="2" height="2" fill="#ae81ff"/>',
  stance:  '<rect x="7" y="1" width="2" height="2" fill="#cfd8e2"/><rect x="6" y="3" width="4" height="4" fill="#cfd8e2"/><rect x="3" y="4" width="3" height="2" fill="#cfd8e2"/><rect x="10" y="3" width="3" height="2" fill="#cfd8e2"/><rect x="12" y="2" width="2" height="2" fill="#e6db74"/><rect x="5" y="7" width="2" height="4" fill="#cfd8e2"/><rect x="9" y="7" width="2" height="4" fill="#cfd8e2"/><rect x="4" y="11" width="2" height="3" fill="#cfd8e2"/><rect x="10" y="11" width="2" height="3" fill="#cfd8e2"/><rect x="7" y="3" width="2" height="1" fill="#eef0f4"/>',
  potion:  '<rect x="7" y="1" width="2" height="2" fill="#a8b0bc"/><rect x="6" y="3" width="4" height="1" fill="#c8a050"/><rect x="5" y="4" width="6" height="10" fill="#cfd8e2"/><rect x="4" y="6" width="8" height="7" fill="#cfd8e2"/><rect x="5" y="7" width="6" height="6" fill="#ff4080"/><rect x="4" y="9" width="8" height="4" fill="#ff4080"/><rect x="5" y="5" width="2" height="3" fill="#eef0f4"/><rect x="5" y="14" width="6" height="1" fill="#a8b0bc"/><rect x="4" y="13" width="8" height="1" fill="#a8b0bc"/>',
  ether:   '<rect x="7" y="1" width="2" height="3" fill="#a8b0bc"/><rect x="6" y="3" width="4" height="1" fill="#5dcaa5"/><rect x="5" y="4" width="6" height="9" fill="#cfd8e2"/><rect x="4" y="6" width="8" height="6" fill="#cfd8e2"/><rect x="5" y="6" width="6" height="6" fill="#66d9e8"/><rect x="4" y="8" width="8" height="3" fill="#66d9e8"/><rect x="6" y="7" width="2" height="3" fill="#b0eff6"/><rect x="5" y="13" width="6" height="1" fill="#a8b0bc"/><rect x="4" y="12" width="8" height="1" fill="#a8b0bc"/>',
  scroll:  '<rect x="1" y="4" width="3" height="8" fill="#c8a050"/><rect x="2" y="3" width="2" height="10" fill="#d4b060"/><rect x="12" y="4" width="3" height="8" fill="#c8a050"/><rect x="12" y="3" width="2" height="10" fill="#d4b060"/><rect x="3" y="2" width="10" height="12" fill="#f0e8c0"/><rect x="2" y="4" width="12" height="8" fill="#f0e8c0"/><rect x="5" y="5" width="6" height="1" fill="#c8a050"/><rect x="5" y="7" width="6" height="1" fill="#c8a050"/><rect x="5" y="9" width="4" height="1" fill="#c8a050"/>',
  gem:     '<rect x="6" y="1" width="4" height="1" fill="#b0eff6"/><rect x="5" y="2" width="6" height="2" fill="#66d9e8"/><rect x="4" y="4" width="8" height="1" fill="#b0eff6"/><rect x="3" y="5" width="10" height="4" fill="#378add"/><rect x="4" y="5" width="4" height="3" fill="#66d9e8"/><rect x="4" y="9" width="8" height="2" fill="#1a5a9a"/><rect x="5" y="11" width="6" height="2" fill="#1a5a9a"/><rect x="6" y="13" width="4" height="1" fill="#1a5a9a"/><rect x="7" y="14" width="2" height="1" fill="#1a5a9a"/>',
  key:     '<rect x="5" y="1" width="6" height="1" fill="#e6db74"/><rect x="4" y="2" width="8" height="5" fill="#e6db74"/><rect x="4" y="2" width="2" height="5" fill="#c8a050"/><rect x="5" y="3" width="6" height="3" fill="#c8a050"/><rect x="6" y="4" width="4" height="1" fill="#1a1a20"/><rect x="7" y="7" width="2" height="8" fill="#e6db74"/><rect x="9" y="10" width="3" height="1" fill="#e6db74"/><rect x="9" y="12" width="2" height="1" fill="#e6db74"/>',
  shield:  '<rect x="4" y="1" width="8" height="1" fill="#a8b0bc"/><rect x="3" y="2" width="10" height="7" fill="#a8b0bc"/><rect x="3" y="2" width="10" height="1" fill="#cfd8e2"/><rect x="3" y="3" width="1" height="6" fill="#cfd8e2"/><rect x="4" y="9" width="8" height="3" fill="#a8b0bc"/><rect x="5" y="12" width="6" height="2" fill="#a8b0bc"/><rect x="6" y="14" width="4" height="1" fill="#a8b0bc"/><rect x="7" y="4" width="2" height="5" fill="#378add"/><rect x="5" y="6" width="6" height="2" fill="#378add"/>',
  armor:   '<rect x="1" y="2" width="4" height="5" fill="#a8b0bc"/><rect x="11" y="2" width="4" height="5" fill="#a8b0bc"/><rect x="3" y="4" width="10" height="10" fill="#a8b0bc"/><rect x="4" y="3" width="8" height="11" fill="#a8b0bc"/><rect x="4" y="4" width="4" height="8" fill="#cfd8e2"/><rect x="7" y="3" width="2" height="11" fill="#5a6570"/><rect x="4" y="14" width="8" height="1" fill="#7a8290"/><rect x="6" y="1" width="4" height="3" fill="#8a9290"/>',
  relic:   '<rect x="5" y="1" width="6" height="1" fill="#c8a050"/><rect x="3" y="2" width="2" height="2" fill="#c8a050"/><rect x="11" y="2" width="2" height="2" fill="#c8a050"/><rect x="4" y="4" width="8" height="10" fill="#e6db74"/><rect x="3" y="6" width="10" height="6" fill="#e6db74"/><rect x="6" y="6" width="4" height="6" fill="#ae81ff"/><rect x="5" y="7" width="6" height="4" fill="#ae81ff"/><rect x="7" y="7" width="2" height="4" fill="#c8a8ff"/><rect x="4" y="4" width="2" height="2" fill="#c8a050"/><rect x="10" y="4" width="2" height="2" fill="#c8a050"/><rect x="4" y="12" width="2" height="2" fill="#c8a050"/><rect x="10" y="12" width="2" height="2" fill="#c8a050"/>',
  helm:    '<rect x="5" y="1" width="6" height="1" fill="#a8b0bc"/><rect x="4" y="2" width="8" height="2" fill="#a8b0bc"/><rect x="3" y="4" width="10" height="4" fill="#a8b0bc"/><rect x="3" y="4" width="10" height="1" fill="#cfd8e2"/><rect x="3" y="5" width="1" height="3" fill="#cfd8e2"/><rect x="4" y="6" width="8" height="2" fill="#1a2a38"/><rect x="2" y="8" width="12" height="4" fill="#a8b0bc"/><rect x="2" y="8" width="12" height="1" fill="#7a8290"/><rect x="5" y="10" width="6" height="1" fill="#7a8290"/>',
  cloak:   '<rect x="6" y="1" width="4" height="2" fill="#7a6aaa"/><rect x="5" y="3" width="6" height="2" fill="#7a6aaa"/><rect x="3" y="5" width="10" height="8" fill="#5a4a8a"/><rect x="2" y="7" width="12" height="5" fill="#5a4a8a"/><rect x="3" y="5" width="2" height="8" fill="#7a6aaa"/><rect x="11" y="5" width="2" height="8" fill="#7a6aaa"/><rect x="4" y="13" width="2" height="2" fill="#5a4a8a"/><rect x="10" y="13" width="2" height="2" fill="#5a4a8a"/><rect x="7" y="2" width="2" height="1" fill="#c8a8ff"/>',
  greaves: '<rect x="3" y="1" width="4" height="7" fill="#a8b0bc"/><rect x="9" y="1" width="4" height="7" fill="#a8b0bc"/><rect x="3" y="1" width="4" height="1" fill="#cfd8e2"/><rect x="9" y="1" width="4" height="1" fill="#cfd8e2"/><rect x="3" y="3" width="1" height="4" fill="#cfd8e2"/><rect x="9" y="3" width="1" height="4" fill="#cfd8e2"/><rect x="2" y="8" width="5" height="4" fill="#a8b0bc"/><rect x="9" y="8" width="5" height="4" fill="#a8b0bc"/><rect x="1" y="12" width="7" height="3" fill="#a8b0bc"/><rect x="8" y="12" width="7" height="3" fill="#a8b0bc"/><rect x="1" y="12" width="7" height="1" fill="#cfd8e2"/><rect x="8" y="12" width="7" height="1" fill="#cfd8e2"/>',
  ring:    '<rect x="6" y="2" width="4" height="1" fill="#e6db74"/><rect x="4" y="3" width="2" height="2" fill="#e6db74"/><rect x="10" y="3" width="2" height="2" fill="#e6db74"/><rect x="3" y="5" width="2" height="4" fill="#e6db74"/><rect x="11" y="5" width="2" height="4" fill="#e6db74"/><rect x="4" y="9" width="2" height="2" fill="#e6db74"/><rect x="10" y="9" width="2" height="2" fill="#e6db74"/><rect x="6" y="11" width="4" height="1" fill="#e6db74"/><rect x="6" y="4" width="4" height="5" fill="#ae81ff"/><rect x="7" y="5" width="2" height="3" fill="#c8a8ff"/>',
  hat:     '<rect x="1" y="9" width="14" height="2" fill="#8a6540"/><rect x="2" y="8" width="12" height="1" fill="#8a6540"/><rect x="4" y="4" width="8" height="5" fill="#8a6540"/><rect x="5" y="3" width="6" height="1" fill="#8a6540"/><rect x="6" y="2" width="4" height="1" fill="#8a6540"/><rect x="1" y="9" width="14" height="1" fill="#c8a050"/><rect x="4" y="8" width="8" height="1" fill="#c8a050"/><rect x="6" y="5" width="4" height="2" fill="#c8a878"/>',
  emblem:  '<rect x="4" y="1" width="8" height="1" fill="#e6db74"/><rect x="3" y="2" width="10" height="7" fill="#e6db74"/><rect x="4" y="9" width="8" height="3" fill="#e6db74"/><rect x="5" y="12" width="6" height="2" fill="#e6db74"/><rect x="7" y="14" width="2" height="1" fill="#e6db74"/><rect x="5" y="3" width="6" height="6" fill="#ae81ff"/><rect x="4" y="4" width="8" height="4" fill="#ae81ff"/><rect x="7" y="4" width="2" height="5" fill="#c8a8ff"/><rect x="5" y="6" width="6" height="2" fill="#c8a8ff"/>',
  cape:    '<rect x="6" y="1" width="4" height="1" fill="#cc3030"/><rect x="5" y="2" width="6" height="2" fill="#cc3030"/><rect x="4" y="4" width="8" height="5" fill="#cc3030"/><rect x="3" y="6" width="10" height="4" fill="#cc3030"/><rect x="3" y="10" width="4" height="5" fill="#cc3030"/><rect x="9" y="10" width="4" height="5" fill="#cc3030"/><rect x="5" y="5" width="2" height="8" fill="#e84040"/><rect x="4" y="4" width="1" height="6" fill="#e84040"/>',
  boots:   '<rect x="4" y="1" width="3" height="9" fill="#8a6540"/><rect x="9" y="1" width="3" height="9" fill="#8a6540"/><rect x="4" y="1" width="3" height="1" fill="#c8a878"/><rect x="9" y="1" width="3" height="1" fill="#c8a878"/><rect x="3" y="10" width="4" height="4" fill="#8a6540"/><rect x="9" y="10" width="4" height="4" fill="#8a6540"/><rect x="2" y="13" width="6" height="2" fill="#8a6540"/><rect x="9" y="13" width="6" height="2" fill="#8a6540"/><rect x="2" y="13" width="6" height="1" fill="#c8a050"/><rect x="9" y="13" width="6" height="1" fill="#c8a050"/>',
  badge:   '<rect x="7" y="1" width="2" height="2" fill="#e6db74"/><rect x="7" y="13" width="2" height="2" fill="#e6db74"/><rect x="1" y="7" width="2" height="2" fill="#e6db74"/><rect x="13" y="7" width="2" height="2" fill="#e6db74"/><rect x="4" y="3" width="2" height="2" fill="#e6db74"/><rect x="10" y="3" width="2" height="2" fill="#e6db74"/><rect x="4" y="11" width="2" height="2" fill="#e6db74"/><rect x="10" y="11" width="2" height="2" fill="#e6db74"/><rect x="5" y="5" width="6" height="6" fill="#c8a050"/><rect x="6" y="6" width="4" height="4" fill="#5dcaa5"/><rect x="7" y="7" width="2" height="2" fill="#90e8cc"/>',
  'attack-sword':  '<line x1="14" y1="2" x2="6" y2="10" stroke="#c0c8d0" stroke-width="2" stroke-linecap="square"/><line x1="13" y1="2" x2="14" y2="3" stroke="#e8ecf0" stroke-width="1" stroke-linecap="square"/><line x1="4" y1="9" x2="8" y2="13" stroke="#8a9098" stroke-width="2" stroke-linecap="square"/><line x1="6" y1="11" x2="3" y2="14" stroke="#5a6268" stroke-width="2" stroke-linecap="square"/>',
  'attack-staff':  '<rect x="5" y="1" width="6" height="1" fill="#9aa2aa"/><rect x="4" y="2" width="8" height="4" fill="#8a9098"/><rect x="5" y="6" width="6" height="1" fill="#9aa2aa"/><rect x="6" y="3" width="4" height="2" fill="#b0b8c0"/><rect x="7" y="7" width="2" height="8" fill="#6a7278"/><rect x="6" y="10" width="4" height="1" fill="#7a8290"/>',
  'attack-bow':    '<rect x="3" y="1" width="3" height="2" fill="#6a7278"/><rect x="2" y="3" width="2" height="10" fill="#6a7278"/><rect x="3" y="13" width="3" height="2" fill="#6a7278"/><rect x="6" y="2" width="1" height="1" fill="#c0c8d0"/><rect x="7" y="3" width="1" height="10" fill="#c0c8d0"/><rect x="6" y="13" width="1" height="1" fill="#c0c8d0"/><rect x="7" y="7" width="7" height="2" fill="#9aa2aa"/><rect x="13" y="6" width="2" height="1" fill="#c0c8d0"/><rect x="14" y="7" width="2" height="2" fill="#c0c8d0"/><rect x="13" y="9" width="2" height="1" fill="#c0c8d0"/><rect x="7" y="5" width="2" height="2" fill="#8a9098"/><rect x="7" y="9" width="2" height="2" fill="#8a9098"/>',
  'attack-katar':  '<rect x="2" y="1" width="2" height="8" fill="#c0c8d0"/><rect x="2" y="9" width="2" height="3" fill="#9aa2aa"/><rect x="12" y="1" width="2" height="8" fill="#c0c8d0"/><rect x="12" y="9" width="2" height="3" fill="#9aa2aa"/><rect x="2" y="8" width="12" height="2" fill="#8a9098"/><rect x="6" y="10" width="4" height="5" fill="#6a7278"/><rect x="3" y="0" width="1" height="1" fill="#e8ecf0"/><rect x="12" y="0" width="1" height="1" fill="#e8ecf0"/>',
  'attack-book':   '<rect x="2" y="2" width="2" height="12" fill="#5a6268"/><rect x="4" y="2" width="10" height="12" fill="#7a8290"/><rect x="13" y="3" width="1" height="10" fill="#e8ecf0"/><rect x="7" y="4" width="2" height="1" fill="#9aa2aa"/><rect x="6" y="5" width="4" height="1" fill="#9aa2aa"/><rect x="7" y="6" width="2" height="1" fill="#9aa2aa"/><rect x="6" y="8" width="4" height="1" fill="#a0a8b0"/><rect x="7" y="9" width="2" height="2" fill="#a0a8b0"/>',

  inventory: '<rect x="5" y="1" width="6" height="2" fill="#8a6540"/><rect x="4" y="3" width="8" height="11" fill="#8a6540"/><rect x="3" y="5" width="10" height="8" fill="#8a6540"/><rect x="4" y="3" width="8" height="1" fill="#c8a878"/><rect x="4" y="4" width="1" height="8" fill="#c8a878"/><rect x="6" y="8" width="4" height="3" fill="#c8a050"/><rect x="7" y="9" width="2" height="1" fill="#e6db74"/>',
  settings:  '<rect x="7" y="1" width="2" height="2" fill="#a8b0bc"/><rect x="7" y="13" width="2" height="2" fill="#a8b0bc"/><rect x="1" y="7" width="2" height="2" fill="#a8b0bc"/><rect x="13" y="7" width="2" height="2" fill="#a8b0bc"/><rect x="3" y="3" width="2" height="2" fill="#a8b0bc"/><rect x="11" y="3" width="2" height="2" fill="#a8b0bc"/><rect x="3" y="11" width="2" height="2" fill="#a8b0bc"/><rect x="11" y="11" width="2" height="2" fill="#a8b0bc"/><rect x="4" y="4" width="8" height="8" fill="#a8b0bc"/><rect x="3" y="5" width="10" height="6" fill="#a8b0bc"/><rect x="5" y="3" width="6" height="10" fill="#a8b0bc"/><rect x="6" y="6" width="4" height="4" fill="#1a1a20"/><rect x="7" y="7" width="2" height="2" fill="#2a2a30"/>',
  shop:      '<rect x="6" y="1" width="4" height="2" fill="#8a6540"/><rect x="5" y="3" width="6" height="1" fill="#8a6540"/><rect x="4" y="4" width="8" height="9" fill="#e6db74"/><rect x="3" y="6" width="10" height="6" fill="#e6db74"/><rect x="4" y="4" width="8" height="1" fill="#fac775"/><rect x="4" y="5" width="1" height="8" fill="#fac775"/><rect x="6" y="7" width="4" height="4" fill="#c8a050"/><rect x="7" y="8" width="2" height="2" fill="#fac775"/><rect x="4" y="13" width="8" height="1" fill="#c8a050"/>',
  quest:     '<rect x="5" y="1" width="6" height="1" fill="#c8a050"/><rect x="4" y="2" width="8" height="12" fill="#f0e8c0"/><rect x="3" y="3" width="10" height="9" fill="#f0e8c0"/><rect x="5" y="13" width="6" height="1" fill="#c8a050"/><rect x="7" y="4" width="2" height="6" fill="#cc3030"/><rect x="7" y="11" width="2" height="2" fill="#cc3030"/>',
  map:       '<rect x="2" y="2" width="4" height="12" fill="#f0e8c0"/><rect x="6" y="2" width="4" height="12" fill="#e8e0b8"/><rect x="10" y="2" width="4" height="12" fill="#f0e8c0"/><rect x="2" y="2" width="12" height="1" fill="#c8a050"/><rect x="2" y="13" width="12" height="1" fill="#c8a050"/><rect x="3" y="5" width="3" height="1" fill="#5dcaa5"/><rect x="6" y="6" width="1" height="2" fill="#5dcaa5"/><rect x="7" y="8" width="4" height="1" fill="#5dcaa5"/><rect x="10" y="9" width="1" height="2" fill="#5dcaa5"/><rect x="11" y="10" width="2" height="2" fill="#ff6060"/>',
  party:     '<rect x="3" y="1" width="3" height="3" fill="#a8b0bc"/><rect x="2" y="4" width="5" height="4" fill="#a8b0bc"/><rect x="2" y="8" width="2" height="4" fill="#a8b0bc"/><rect x="5" y="8" width="2" height="4" fill="#a8b0bc"/><rect x="10" y="1" width="3" height="3" fill="#cfd8e2"/><rect x="9" y="4" width="5" height="4" fill="#cfd8e2"/><rect x="9" y="8" width="2" height="4" fill="#cfd8e2"/><rect x="12" y="8" width="2" height="4" fill="#cfd8e2"/>',
  save:      '<rect x="2" y="1" width="12" height="13" fill="#3a4a5a"/><rect x="3" y="1" width="8" height="5" fill="#a8b0bc"/><rect x="2" y="1" width="12" height="1" fill="#5a6a7a"/><rect x="2" y="2" width="1" height="12" fill="#5a6a7a"/><rect x="4" y="9" width="8" height="4" fill="#4a5a6a"/><rect x="5" y="10" width="6" height="2" fill="#3a4a5a"/><rect x="9" y="2" width="2" height="3" fill="#7a8290"/>',
  menu:      '<rect x="2" y="4" width="12" height="2" fill="#cfd8e2"/><rect x="2" y="7" width="12" height="2" fill="#cfd8e2"/><rect x="2" y="10" width="12" height="2" fill="#cfd8e2"/><rect x="2" y="4" width="12" height="1" fill="#eef0f4"/><rect x="2" y="7" width="12" height="1" fill="#eef0f4"/><rect x="2" y="10" width="12" height="1" fill="#eef0f4"/>',
  'attack-hammer': '<rect x="4" y="1" width="8" height="1" fill="#9aa2aa"/><rect x="3" y="2" width="10" height="5" fill="#9aa2aa"/><rect x="3" y="2" width="10" height="1" fill="#c0c8d0"/><rect x="3" y="3" width="1" height="3" fill="#c0c8d0"/><rect x="3" y="7" width="10" height="1" fill="#5a6268"/><rect x="7" y="7" width="2" height="8" fill="#6a7278"/><rect x="6" y="10" width="4" height="1" fill="#7a8290"/>',
};
var ICON_GROUPS = {
  weapons:  ['sword', 'bow', 'staff', 'katar', 'book', 'hammer'],
  attack:   ['attack-sword', 'attack-bow', 'attack-staff', 'attack-katar', 'attack-book', 'attack-hammer'],
  techs:    ['passive', 'active', 'combo', 'stance', 'buff', 'debuff'],
  elements: ['neutral', 'fire', 'earth', 'wind', 'water', 'light', 'dark', 'void'],
  races:    ['human', 'beast', 'demon', 'angel', 'spirit'],
  sizes:    ['small', 'medium', 'large'],
  items:    ['potion', 'ether', 'scroll', 'gem', 'relic', 'key'],
  equip:    ['helm', 'armor', 'cloak', 'shield', 'ring', 'greaves'],
  skins:    ['hat', 'emblem', 'cape', 'badge', 'boots'],
  menu:     ['menu', 'inventory', 'party', 'quest', 'map', 'shop', 'settings', 'save'],
};

/* ── Emotes ─────────────────────────────────────────────────────────
   Original pixel emotes — one warm round face + a signature expression
   each, with our own chat-command codes (no third-party command sets).
   Each face is drawn to read clearly for its meaning.
   ─────────────────────────────────────────────────────────────────── */
var EMOTE_FACE =
  '<rect x="5" y="1" width="6" height="1" fill="#f6d860"/>' +
  '<rect x="3" y="2" width="10" height="1" fill="#f6d860"/>' +
  '<rect x="2" y="3" width="12" height="8" fill="#f6d860"/>' +
  '<rect x="3" y="11" width="10" height="1" fill="#e3c24f"/>' +
  '<rect x="4" y="12" width="8" height="1" fill="#e3c24f"/>' +
  '<rect x="5" y="13" width="6" height="1" fill="#c9aa3e"/>';
var INK = '#3a2e1a';
var EMOTES = {
  /* warm — grateful closed-eye smile + blush */
  '/tysm': EMOTE_FACE +
    '<rect x="4" y="6" width="1" height="1" fill="'+INK+'"/><rect x="5" y="5" width="2" height="1" fill="'+INK+'"/><rect x="7" y="6" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="8" y="6" width="1" height="1" fill="'+INK+'"/><rect x="9" y="5" width="2" height="1" fill="'+INK+'"/><rect x="11" y="6" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="6" y="9" width="4" height="1" fill="'+INK+'"/><rect x="5" y="8" width="1" height="1" fill="'+INK+'"/><rect x="10" y="8" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="3" y="8" width="1" height="1" fill="#f0a070"/><rect x="12" y="8" width="1" height="1" fill="#f0a070"/>',
  /* distress — worried brows, calling mouth, panic sweat */
  '/sos': EMOTE_FACE +
    '<rect x="6" y="3" width="1" height="1" fill="'+INK+'"/><rect x="5" y="4" width="1" height="1" fill="'+INK+'"/><rect x="4" y="5" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="9" y="3" width="1" height="1" fill="'+INK+'"/><rect x="10" y="4" width="1" height="1" fill="'+INK+'"/><rect x="11" y="5" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="5" y="6" width="1" height="2" fill="'+INK+'"/><rect x="10" y="6" width="1" height="2" fill="'+INK+'"/>' +
    '<rect x="6" y="10" width="4" height="2" fill="'+INK+'"/><rect x="7" y="11" width="2" height="1" fill="#c0432f"/>' +
    '<rect x="12" y="2" width="1" height="1" fill="#5aa9e6"/><rect x="11" y="3" width="3" height="2" fill="#5aa9e6"/><rect x="12" y="5" width="1" height="1" fill="#5aa9e6"/><rect x="12" y="3" width="1" height="1" fill="#add6f5"/>',
  /* joy — eyes scrunched shut, big open laugh, happy tears */
  '/lol': EMOTE_FACE +
    '<rect x="4" y="6" width="1" height="1" fill="'+INK+'"/><rect x="5" y="5" width="2" height="1" fill="'+INK+'"/><rect x="7" y="6" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="8" y="6" width="1" height="1" fill="'+INK+'"/><rect x="9" y="5" width="2" height="1" fill="'+INK+'"/><rect x="11" y="6" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="5" y="9" width="6" height="3" fill="'+INK+'"/><rect x="6" y="9" width="4" height="1" fill="#ffffff"/><rect x="6" y="11" width="4" height="1" fill="#c0432f"/>' +
    '<rect x="3" y="7" width="1" height="2" fill="#5aa9e6"/><rect x="12" y="7" width="1" height="2" fill="#5aa9e6"/>',
  /* triumph — confident wink, toothy grin, sparkle */
  '/win': EMOTE_FACE +
    '<rect x="5" y="6" width="2" height="2" fill="'+INK+'"/>' +
    '<rect x="9" y="6" width="3" height="1" fill="'+INK+'"/>' +
    '<rect x="5" y="9" width="6" height="2" fill="'+INK+'"/><rect x="6" y="9" width="4" height="1" fill="#ffffff"/><rect x="4" y="8" width="1" height="1" fill="'+INK+'"/><rect x="11" y="8" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="12" y="2" width="1" height="3" fill="#f6d860"/><rect x="11" y="3" width="3" height="1" fill="#f6d860"/><rect x="12" y="3" width="1" height="1" fill="#fff8e0"/>',
  /* hype — star-struck eyes, big grin, hype mark */
  '/lgo': EMOTE_FACE +
    '<rect x="5" y="4" width="1" height="3" fill="'+INK+'"/><rect x="4" y="5" width="3" height="1" fill="'+INK+'"/>' +
    '<rect x="10" y="4" width="1" height="3" fill="'+INK+'"/><rect x="9" y="5" width="3" height="1" fill="'+INK+'"/>' +
    '<rect x="5" y="9" width="6" height="3" fill="'+INK+'"/><rect x="6" y="9" width="4" height="1" fill="#ffffff"/><rect x="6" y="11" width="4" height="1" fill="#c0432f"/>' +
    '<rect x="4" y="8" width="1" height="1" fill="'+INK+'"/><rect x="11" y="8" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="13" y="1" width="1" height="3" fill="#f6d860"/><rect x="13" y="5" width="1" height="1" fill="#f6d860"/>',
  /* dismay — flat unamused eyes, frown, sweat */
  '/ugh': EMOTE_FACE +
    '<rect x="4" y="6" width="3" height="1" fill="'+INK+'"/><rect x="9" y="6" width="3" height="1" fill="'+INK+'"/>' +
    '<rect x="6" y="11" width="4" height="1" fill="'+INK+'"/><rect x="5" y="10" width="1" height="1" fill="'+INK+'"/><rect x="10" y="10" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="12" y="2" width="1" height="1" fill="#5aa9e6"/><rect x="11" y="3" width="3" height="2" fill="#5aa9e6"/><rect x="12" y="5" width="1" height="1" fill="#5aa9e6"/><rect x="12" y="3" width="1" height="1" fill="#add6f5"/>',
  /* sheepish — apologetic brows, nervous wavy mouth, sweat */
  '/myb': EMOTE_FACE +
    '<rect x="4" y="5" width="2" height="1" fill="'+INK+'"/><rect x="10" y="5" width="2" height="1" fill="'+INK+'"/>' +
    '<rect x="5" y="6" width="1" height="1" fill="'+INK+'"/><rect x="10" y="6" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="6" y="10" width="1" height="1" fill="'+INK+'"/><rect x="7" y="11" width="1" height="1" fill="'+INK+'"/><rect x="8" y="10" width="1" height="1" fill="'+INK+'"/><rect x="9" y="11" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="4" y="2" width="1" height="1" fill="#5aa9e6"/><rect x="3" y="3" width="3" height="1" fill="#5aa9e6"/><rect x="4" y="4" width="1" height="1" fill="#5aa9e6"/><rect x="4" y="3" width="1" height="1" fill="#add6f5"/>',
  /* shock — wide eyes, dropped jaw, floating question mark */
  '/wut': EMOTE_FACE +
    '<rect x="4" y="3" width="2" height="1" fill="'+INK+'"/><rect x="9" y="3" width="2" height="1" fill="'+INK+'"/>' +
    '<rect x="4" y="5" width="3" height="3" fill="#ffffff"/><rect x="9" y="5" width="3" height="3" fill="#ffffff"/>' +
    '<rect x="5" y="6" width="1" height="1" fill="'+INK+'"/><rect x="10" y="6" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="6" y="9" width="4" height="3" fill="'+INK+'"/><rect x="7" y="10" width="2" height="1" fill="#f6d860"/>' +
    '<rect x="11" y="1" width="2" height="1" fill="'+INK+'"/><rect x="13" y="2" width="1" height="1" fill="'+INK+'"/><rect x="12" y="3" width="1" height="1" fill="'+INK+'"/><rect x="12" y="5" width="1" height="1" fill="'+INK+'"/>',
  /* rage — angry brows, grit, anger mark */
  '/grr': EMOTE_FACE +
    '<rect x="4" y="5" width="1" height="1" fill="'+INK+'"/><rect x="5" y="6" width="2" height="1" fill="'+INK+'"/>' +
    '<rect x="9" y="6" width="2" height="1" fill="'+INK+'"/><rect x="11" y="5" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="5" y="7" width="2" height="1" fill="'+INK+'"/><rect x="9" y="7" width="2" height="1" fill="'+INK+'"/>' +
    '<rect x="6" y="10" width="4" height="1" fill="'+INK+'"/><rect x="5" y="11" width="1" height="1" fill="'+INK+'"/><rect x="10" y="11" width="1" height="1" fill="'+INK+'"/>' +
    '<rect x="12" y="1" width="1" height="3" fill="#e23b3b"/><rect x="11" y="2" width="3" height="1" fill="#e23b3b"/>' +
    '<rect x="3" y="8" width="1" height="1" fill="#e87a5a"/><rect x="12" y="8" width="1" height="1" fill="#e87a5a"/>',
};
Object.keys(EMOTES).forEach(function(k){ ICON_SVGS[k] = EMOTES[k]; });
ICON_GROUPS.emotes = ['/tysm', '/sos', '/lol', '/win', '/lgo', '/ugh', '/myb', '/wut', '/grr'];
var EMOTE_TIPS = {
  '/tysm': '/tysm \u2014 Thank you so much!', '/sos': '/sos \u2014 Save our souls (help)', '/lol': '/lol \u2014 Laugh out loud',
  '/win': '/win \u2014 Winner!', '/lgo': '/lgo \u2014 Let\u2019s go!', '/ugh': '/ugh \u2014 Disappointed',
  '/myb': '/myb \u2014 My bad', '/wut': '/wut \u2014 What!?', '/grr': '/grr \u2014 Mad'
};
var GROUP_TIPS = {
  ui: 'HUD widgets — bars, panels, minimap…', weapons: 'Weapon icons', attack: 'Weapon attack icons',
  techs: 'Skill & ability icons', elements: 'Elemental affinity icons', races: 'Character race icons',
  sizes: 'Creature size icons', items: 'Consumables & valuables', equip: 'Equipment slots',
  skins: 'Cosmetic apparel', menu: 'Menu & system icons', emotes: 'Chat emotes'
};
/* Plural display labels for tab names that aren't already plural */
var GROUP_LABELS = { attack: 'ATTACKS', equip: 'GEAR', skins: 'COSMETICS', menu: 'MENUS' };

/* ── Icon auto-centering ─────────────────────────────────────────────
   Every glyph is hand-drawn pixel art inside a 16×16 box but not always
   centred (e.g. the SIZES bars sit on a bottom baseline). Compute each
   glyph's content bbox from its source and translate it to the centre of
   the box, so icons read consistently both axes. Done once, from source. */
function iconBBox(svg) {
  var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  function num(tag, attr) { var m = new RegExp('\\b' + attr + '="(-?[\\d.]+)"').exec(tag); return m ? parseFloat(m[1]) : NaN; }
  (svg.match(/<rect\b[^>]*>/g) || []).forEach(function(t) {
    var x = num(t,'x'), y = num(t,'y'), w = num(t,'width'), h = num(t,'height');
    if (!isNaN(x) && !isNaN(y)) { minX=Math.min(minX,x); minY=Math.min(minY,y); maxX=Math.max(maxX,x+(w||0)); maxY=Math.max(maxY,y+(h||0)); }
  });
  (svg.match(/<line\b[^>]*>/g) || []).forEach(function(t) {
    ['1','2'].forEach(function(n){ var x=num(t,'x'+n), y=num(t,'y'+n); if(!isNaN(x)&&!isNaN(y)){ minX=Math.min(minX,x); minY=Math.min(minY,y); maxX=Math.max(maxX,x); maxY=Math.max(maxY,y); } });
  });
  (svg.match(/<circle\b[^>]*>/g) || []).forEach(function(t) {
    var cx=num(t,'cx'), cy=num(t,'cy'), r=num(t,'r')||0; if(!isNaN(cx)&&!isNaN(cy)){ minX=Math.min(minX,cx-r); minY=Math.min(minY,cy-r); maxX=Math.max(maxX,cx+r); maxY=Math.max(maxY,cy+r); }
  });
  if (minX === Infinity) return null;
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}
var ICON_BBOX = {};
Object.keys(ICON_SVGS).forEach(function(k){ ICON_BBOX[k] = iconBBox(ICON_SVGS[k]); });
/* Returns the glyph markup wrapped in a centring transform (or raw if already centred). */
function tok24(inner){ return '<g transform="scale(1.5)">' + inner + '</g>'; }
/* Full glyph markup for an icon/emote. Regular icons upscale 1.5× to fill the
   cell; emotes are already full 16×16 faces, so they render at native size
   centred in the 24-box (no upscale) — otherwise they bleed past the cell. */
function glyphMarkup(name){
  return '<g transform="scale(1.5)">' + iconInner(name) + '</g>';
}
function iconInner(name) {
  var svg = ICON_SVGS[name]; if (!svg) return '';
  var bb = ICON_BBOX[name]; if (!bb) return svg;
  var dx = 8 - (bb.x + bb.w / 2), dy = 8 - (bb.y + bb.h / 2);
  if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.25) return svg;
  return '<g transform="translate(' + dx.toFixed(2) + ',' + dy.toFixed(2) + ')">' + svg + '</g>';
}

var EMOJI_LIST   = ['🙂'];;
var EMOJI_GROUPS = { emojis: EMOJI_LIST };

/* Weapons (and their attack variants) read best held diagonally — blade toward
   the top-right. The sword art is already a top-right diagonal (0°). The scale
   keeps the rotated square from clipping its box. Returns a CSS transform or ''. */
var WEAPON_TILT = {
  staff: 45, katar: 45, hammer: 45, book: 45, bow: -45, sword: 0,
  'attack-staff': 45, 'attack-katar': 45, 'attack-hammer': 45,
  'attack-book': 45, 'attack-bow': -45, 'attack-sword': 0,
};
function iconTransform(name) {
  var d = WEAPON_TILT[name];
  return d ? ('rotate(' + d + 'deg) scale(0.82)') : '';
}
function applyIconTilt(svgEl, name) {
  var t = iconTransform(name);
  if (t) { svgEl.style.transform = t; svgEl.style.transformOrigin = 'center'; svgEl.style.overflow = 'visible'; }
}

/* ══════════════════════════════════════════
   HUD COMPONENT LIBRARY
   ══════════════════════════════════════════ */
var COMP_SVGS = {
  bar:   '<rect x="1" y="6" width="14" height="4" fill="rgba(255,255,255,0.08)"/><rect x="1" y="6" width="8" height="4" fill="#4caf73"/><rect x="1" y="6" width="8" height="1" fill="#5dcf83"/>',
  barstam: '<rect x="1" y="6" width="14" height="4" fill="rgba(255,255,255,0.08)"/><rect x="1" y="6" width="11" height="4" fill="#5dcaa5"/><rect x="4" y="6" width="1" height="4" fill="rgba(0,0,0,0.5)"/><rect x="7" y="6" width="1" height="4" fill="rgba(0,0,0,0.5)"/><rect x="10" y="6" width="1" height="4" fill="rgba(0,0,0,0.5)"/>',
  chat: '<rect x="2" y="2" width="12" height="9" fill="#0c1018"/><rect x="2" y="2" width="12" height="1" fill="#3a3a5a"/><rect x="4" y="11" width="3" height="2" fill="#0c1018"/><rect x="3" y="4" width="5" height="1" fill="#5dcaa5"/><rect x="3" y="6" width="8" height="1" fill="#8888ee"/><rect x="3" y="8" width="6" height="1" fill="rgba(255,255,255,0.5)"/>',
  label: '<rect x="2" y="7" width="5" height="1" fill="rgba(255,255,255,0.5)"/><rect x="8" y="7" width="4" height="1" fill="rgba(255,255,255,0.3)"/>',
  hdiv: '<rect x="1" y="7" width="14" height="2" fill="#7a7a8a"/><rect x="1" y="7" width="14" height="1" fill="#b0b0c0"/><rect x="1" y="6" width="2" height="4" fill="#5a5a6a"/><rect x="13" y="6" width="2" height="4" fill="#5a5a6a"/>',
  vdiv: '<rect x="7" y="1" width="2" height="14" fill="#7a7a8a"/><rect x="7" y="1" width="1" height="14" fill="#b0b0c0"/><rect x="6" y="1" width="4" height="2" fill="#5a5a6a"/><rect x="6" y="13" width="4" height="2" fill="#5a5a6a"/>',
  joy:  '<rect x="5" y="1" width="6" height="2" fill="#5a5a7a"/><rect x="9" y="3" width="4" height="4" fill="#5a5a7a"/><rect x="1" y="3" width="4" height="4" fill="#5a5a7a"/><rect x="3" y="5" width="10" height="6" fill="#1a1a2a"/><rect x="5" y="3" width="6" height="10" fill="#1a1a2a"/><rect x="5" y="9" width="2" height="4" fill="#5a5a7a"/><rect x="9" y="9" width="2" height="4" fill="#5a5a7a"/><rect x="6" y="6" width="4" height="4" fill="#3a3a5a"/><rect x="7" y="7" width="2" height="2" fill="#9090b0"/>',
  tabwin: '<rect x="1" y="4" width="14" height="11" fill="#0c1018"/><rect x="1" y="4" width="14" height="1" fill="#3a3a5a"/><rect x="1" y="1" width="4" height="4" fill="#2a2a44"/><rect x="5" y="1" width="4" height="4" fill="#181826"/><rect x="9" y="1" width="6" height="4" fill="#181826"/><rect x="2" y="6" width="10" height="1" fill="#3a3a5a"/><rect x="2" y="8" width="7" height="1" fill="#3a3a5a"/><rect x="2" y="10" width="9" height="1" fill="#3a3a5a"/><rect x="2" y="12" width="5" height="1" fill="#3a3a5a"/>',
  bgd: '<rect x="1" y="1" width="14" height="14" fill="#0c1016" fill-opacity="0.75"/><rect x="1" y="1" width="14" height="14" fill="none" stroke="white" stroke-opacity="0.14" stroke-width="0.75"/>',
  bgc: '<rect x="1" y="1" width="14" height="14" fill="none" stroke="white" stroke-opacity="0.24" stroke-width="0.75" stroke-dasharray="2 1"/>',
  minimap: '<rect width="16" height="16" fill="#2a3818"/><polygon points="8,2 14,6 8,10 2,6" fill="#3a4a18" stroke="#c8a830" stroke-width="0.7"/><line x1="5" y1="4" x2="11" y2="8" stroke="#c8a830" stroke-width="0.3" opacity="0.5"/><line x1="8" y1="2" x2="8" y2="10" stroke="#c8a830" stroke-width="0.3" opacity="0.5"/><line x1="2" y1="6" x2="14" y2="6" stroke="#c8a830" stroke-width="0.3" opacity="0.5"/><rect x="3.5" y="4.5" width="2" height="2" fill="#ffffff"/><rect x="9" y="7" width="2" height="2" fill="#e6c840"/><rect x="11" y="5.5" width="1.5" height="1.5" fill="#e6c840"/><rect x="10" y="8.5" width="1.5" height="1.5" fill="#cc5533"/>',
  avatar: '<image href="../assets/hero-avatar.svg" x="0" y="0" width="16" height="16" preserveAspectRatio="xMidYMid slice"/>',
};
var COMP_LABELS      = { hdiv:'H-DIVIDER', vdiv:'V-DIVIDER', joy:'JOYSTICK', tabwin:'TABS', chat:'CHAT', bar:'BAR', barstam:'SEGMENTED', label:'LABEL', bgd:'PANEL', bgc:'OUTLINE', minimap:'MINIMAP', avatar:'AVATAR' };
var COMP_GROUPS      = { ui: ['avatar', 'bar', 'barstam', 'label', 'tabwin', 'chat', 'joy', 'minimap', 'hdiv', 'vdiv', 'bgd', 'bgc'] };
/* Retired duplicates that were only a colour apart — map old saved scenes onto the survivors */
var COMP_ALIASES     = { barmp:'bar', barxp:'bar', bgl:'bgd' };
var COMP_DEFAULT_POS = {
  avatar: {c1:1,r1:1,c2:4,r2:4},
  bar:    {c1:1,r1:1,c2:9,r2:2},
  barstam:{c1:1,r1:1,c2:9,r2:2},
  chat:   {c1:1,r1:1,c2:9,r2:6},
  label:  {c1:1,r1:1,c2:7,r2:2},
  hdiv:   {c1:1,r1:1,c2:9,r2:2},
  vdiv:   {c1:1,r1:1,c2:2,r2:9},
  joy:    {c1:1,r1:1,c2:5,r2:9},
  tabwin: {c1:1,r1:9,c2:9,r2:17},
  bgd:    {c1:1,r1:1,c2:9,r2:9},
  bgc:     {c1:1,r1:1,c2:9,r2:9},
  minimap: {c1:1,r1:1,c2:12,r2:10},
};
var BAR_KINDS = {
  hp:   { fill: 'var(--hud-hp-fill,#4caf73)',      pct: 65, label: '26 / 40',     seg: false },
  stam: { fill: 'var(--hud-stamina-fill,#5dcaa5)', pct: 80, label: 'STAMINA',     seg: true  }
};
function buildBar(el, kind) {
  var k = BAR_KINDS[kind] || BAR_KINDS.hp;
  el.style.cssText += 'background:rgba(255,255,255,0.08);overflow:hidden;position:relative;';
  el.setAttribute('data-bar-kind', kind);
  var fill = document.createElement('div');
  fill.className = 'bar-fill';
  /* a previously-chosen colour (via the colour control) overrides the kind default */
  var savedColor; try { savedColor = JSON.parse(localStorage.getItem('ns-hud-colors') || '{}')[el.id]; } catch(e) {}
  fill.style.cssText = 'position:absolute;inset:0;width:' + k.pct + '%;background:' + (savedColor || k.fill) + ';';
  el.appendChild(fill);
  if (k.seg) {
    var seg = document.createElement('div');
    seg.style.cssText = 'position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(90deg,transparent 0,transparent 7px,rgba(0,0,0,0.5) 7px,rgba(0,0,0,0.5) 8px);';
    el.appendChild(seg);
  }
  var lbl = document.createElement('span');
  lbl.className = 'et';
  lbl.id = 'bet-' + el.id;
  lbl.setAttribute('contenteditable', 'false');
  lbl.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;padding-left:3px;font-size:4px;color:var(--ns-ink);white-space:nowrap;z-index:1;';
  var savedTxt; try { savedTxt = JSON.parse(localStorage.getItem('ns-hud-texts') || '{}')[lbl.id]; } catch(e) {}
  lbl.textContent = (savedTxt !== undefined) ? savedTxt : k.label;
  /* editable + removable label — persists independently of element type */
  lbl.addEventListener('blur', function() {
    lbl.setAttribute('contenteditable', 'false');
    try { var t = JSON.parse(localStorage.getItem('ns-hud-texts') || '{}'); t[lbl.id] = lbl.textContent; localStorage.setItem('ns-hud-texts', JSON.stringify(t)); } catch(e) {}
  });
  lbl.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); lbl.blur(); } });
  el.appendChild(lbl);
}
var COMP_BUILD = {
  avatar: function(el) {
    el.style.cssText += 'overflow:hidden;background:var(--hud-avatar-bg,#2a2233);border:1.5px solid var(--ns-line-strong,rgba(255,255,255,0.5));';
    var img = document.createElement('img');
    img.src = '../assets/hero-avatar.svg';
    img.alt = 'Rainbow Star';
    img.style.cssText = 'width:100%;height:100%;display:block;object-fit:cover;object-position:center 20%;image-rendering:pixelated;pointer-events:none;';
    el.appendChild(img);
  },
  bar:     function(el) { buildBar(el, 'hp'); },
  barstam: function(el) { buildBar(el, 'stam'); },
  chat: function(el) {
    el.style.cssText += 'overflow:hidden;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;';
    /* No baked-in background: each row is shadowed and reads on its own. The bg is
       user-selectable via the B (object colour) control — including "None" — and any
       choice is restored from storage on reload. */
    el.setAttribute('data-tintable-bg', '');
    var savedBg; try { savedBg = JSON.parse(localStorage.getItem('ns-hud-colors') || '{}')[el.id]; } catch(e) {}
    if (savedBg != null && savedBg !== '') el.style.background = savedBg;
    /* One line per chat scenario; whole line takes the channel colour, sized &
       left-aligned like ordinary grid text, vertically centred in each cell.
       Some lines carry an inline emote so the widget shows them in context. */
    var lines = [
      { txt:'(To Aria): nice combo!',    color:'#e6db74', emote:'/win'  }, /* private — sent     */
      { txt:'(From Zeph): ty! push mid', color:'#e6db74', emote:'/tysm' }, /* private — received */
      { txt:'[P] Kira: incoming top',    color:'#fac775', emote:'/sos'  }, /* party              */
      { txt:'[G] Bram: raid at 8?',      color:'#5dcaa5', emote:'/lgo'  }, /* guild              */
      { txt:'Lio: gg wp',                color:'rgba(255,255,255,0.92)'  }, /* public             */
    ];
    lines.forEach(function(m){
      var row = document.createElement('div');
      row.style.cssText = 'flex:1 1 0;min-height:var(--hud-row);display:flex;align-items:center;gap:2px;padding:0 3px;font-size:5px;line-height:1;white-space:nowrap;overflow:hidden;color:' + m.color + ';text-shadow:0 0 2px rgba(0,0,0,0.85);';
      var txt = document.createElement('span');
      txt.textContent = m.txt;
      txt.style.cssText = 'flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;';
      row.appendChild(txt);
      if (m.emote) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.style.cssText = 'width:8px;height:8px;flex-shrink:0;image-rendering:pixelated;display:block;';
        svg.innerHTML = glyphMarkup(m.emote);
        row.appendChild(svg);
      }
      el.appendChild(row);
    });
  },
  label: function(el) {
    el.style.cssText += 'display:flex;align-items:center;padding-left:3px;overflow:hidden;';
    var span = document.createElement('span');
    span.className = 'et';
    span.style.cssText = 'font-size:5px;color:var(--ns-ink);white-space:nowrap;overflow:hidden;';
    span.textContent = 'Label';
    span.setAttribute('contenteditable','false');
    el.appendChild(span);
  },
  hdiv: function(el) {
    el.style.cssText += 'display:flex;align-items:center;padding:0 3px;';
    var d = document.createElement('div');
    d.style.cssText = 'flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.28) 15%,rgba(255,255,255,0.28) 85%,transparent);';
    el.appendChild(d);
  },
  vdiv: function(el) {
    el.style.cssText += 'display:flex;justify-content:center;align-items:stretch;padding:3px 0;';
    var d = document.createElement('div');
    d.style.cssText = 'width:1px;height:100%;background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.28) 15%,rgba(255,255,255,0.28) 85%,transparent);align-self:stretch;';
    el.appendChild(d);
  },
  joy: function(el) {
    el.style.cssText += 'display:flex;align-items:center;justify-content:center;';
    var base = document.createElement('div');
    base.style.cssText = 'position:relative;height:80%;aspect-ratio:1/1;border-radius:50%;border:1.5px solid rgba(255,255,255,0.18);background:rgba(0,0,0,0.38);flex-shrink:0;';
    var inn = document.createElement('div');
    inn.style.cssText = 'position:absolute;inset:0;';
    var gh = document.createElement('div');
    gh.style.cssText = 'position:absolute;top:50%;left:0;right:0;height:1px;background:var(--hud-grid-overlay);transform:translateY(-50%);';
    var gv = document.createElement('div');
    gv.style.cssText = 'position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--hud-grid-overlay);transform:translateX(-50%);';
    var thumb = document.createElement('div');
    thumb.style.cssText = 'position:absolute;width:32%;height:32%;border-radius:50%;background:rgba(190,190,210,0.72);border:1px solid rgba(255,255,255,0.35);top:50%;left:50%;transform:translate(-50%,-50%);cursor:grab;';
    inn.appendChild(gh); inn.appendChild(gv); inn.appendChild(thumb);
    base.appendChild(inn); el.appendChild(base);
    var jd = null;
    thumb.addEventListener('mousedown', function(e) {
      if (window.hudGridOn) return;
      e.stopPropagation(); e.preventDefault();
      var br = base.getBoundingClientRect();
      jd = {cx:br.left+br.width/2, cy:br.top+br.height/2, r:br.width*0.26};
      thumb.style.background = 'rgba(220,220,240,0.92)';
    });
    document.addEventListener('mousemove', function(e) {
      if (!jd) return;
      var dx=e.clientX-jd.cx, dy=e.clientY-jd.cy, d=Math.sqrt(dx*dx+dy*dy);
      if (d>jd.r){dx=dx/d*jd.r;dy=dy/d*jd.r;}
      thumb.style.left=(50+dx/jd.r*26)+'%';
      thumb.style.top =(50+dy/jd.r*26)+'%';
      thumb.style.transform='translate(-50%,-50%)';
    });
    document.addEventListener('mouseup', function() {
      if (!jd) return; jd=null;
      thumb.style.left='50%'; thumb.style.top='50%';
      thumb.style.background='rgba(190,190,210,0.72)';
    });
  },
  tabwin: function(el) {
    el.style.cssText += 'display:flex;flex-direction:column;overflow:hidden;align-items:stretch;justify-content:flex-start;';
    var elId = el.id;
    function loadTabs() {
      try { var a=JSON.parse(localStorage.getItem('ns-hud-tabwin-data')||'{}'); return (a[elId]&&a[elId].length)?a[elId]:null; } catch(e){return null;}
    }
    function saveTabs() {
      try { var a=JSON.parse(localStorage.getItem('ns-hud-tabwin-data')||'{}'); a[elId]=tabs.map(function(t){return{label:t.label};}); localStorage.setItem('ns-hud-tabwin-data',JSON.stringify(a)); } catch(e){}
    }
    var tabs = loadTabs() || [{label:'Chat'},{label:'Logs'}];
    var activeIdx = 0;
    var tabEls = [];
    var tabBar = document.createElement('div');
    tabBar.setAttribute('data-tab-bar', '');
    tabBar.style.cssText = 'display:flex;flex-shrink:0;height:var(--hud-row);border-bottom:1px solid rgba(0,0,0,0.4);';
    var pane = document.createElement('div');
    pane.style.cssText = 'flex:1;overflow:hidden;position:relative;background:rgba(10,18,22,0.6);';
    function setActive(i) {
      activeIdx = i;
      tabEls.forEach(function(t,j){
        var on=j===i;
        t.style.background=on?'rgba(210,208,198,0.9)':'rgba(0,0,0,0.28)';
        t.style.color=on?'#1c1c17':'rgba(200,200,200,0.4)';
      });
    }
    function removeTab(i) {
      if (tabs.length <= 1) return;            /* always keep at least one tab */
      tabs.splice(i, 1);
      if (i < activeIdx) activeIdx--;
      if (activeIdx >= tabs.length) activeIdx = tabs.length - 1;
      saveTabs();
      rebuild();
    }
    function makeTab(i) {
      var tab = document.createElement('button');
      tab.style.cssText = 'position:relative;width:var(--hud-cell-w);min-width:48px;flex-shrink:0;height:100%;padding:0 2px;border:none;border-right:1px solid rgba(0,0,0,0.35);font-family:var(--hud-font);font-size:4px;cursor:pointer;letter-spacing:0.04em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
      var lbl = document.createElement('span');
      lbl.textContent = tabs[i].label;
      lbl.style.cssText = 'outline:none;pointer-events:none;';
      tab.appendChild(lbl);
      tab.addEventListener('click',    function(e){ e.stopPropagation(); setActive(i); });
      tab.addEventListener('mousedown',function(e){ e.stopPropagation(); });
      tab.addEventListener('dblclick', function(e){
        e.stopPropagation();
        lbl.contentEditable='true'; lbl.style.pointerEvents='auto'; lbl.focus();
        try{var r=document.createRange();r.selectNodeContents(lbl);var s=window.getSelection();s.removeAllRanges();s.addRange(r);}catch(z){}
        lbl.addEventListener('blur',function commit(){
          lbl.contentEditable='false'; lbl.style.pointerEvents='none';
          var t=lbl.textContent.trim()||tabs[i].label;
          lbl.textContent=t; tabs[i].label=t; saveTabs();
          lbl.removeEventListener('blur',commit);
        });
        lbl.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key==='Escape'){e.preventDefault();lbl.blur();}});
      });
      var del = document.createElement('span');
      del.textContent = '\u00d7'; del.setAttribute('data-tip', 'Delete tab');
      del.style.cssText = 'position:absolute;top:0;right:0;bottom:0;width:9px;display:none;align-items:center;justify-content:center;font-size:7px;line-height:1;color:rgba(255,255,255,0.55);background:linear-gradient(to right,transparent,rgba(0,0,0,0.6) 45%);cursor:pointer;pointer-events:auto;';
      tab.appendChild(del);
      tab.addEventListener('mouseenter', function(){ if (tabs.length > 1) del.style.display = 'flex'; });
      tab.addEventListener('mouseleave', function(){ del.style.display = 'none'; });
      del.addEventListener('mouseenter', function(){ del.style.color = 'rgba(255,90,90,0.95)'; });
      del.addEventListener('mouseleave', function(){ del.style.color = 'rgba(255,255,255,0.55)'; });
      del.addEventListener('mousedown', function(e){ e.stopPropagation(); });
      del.addEventListener('click',     function(e){ e.stopPropagation(); removeTab(i); });
      return tab;
    }
    function rebuild() {
      tabBar.innerHTML=''; tabEls=[];
      tabs.forEach(function(_,i){var t=makeTab(i);tabEls.push(t);tabBar.appendChild(t);});
      var spacer=document.createElement('div');
      spacer.style.cssText='flex:1;';
      tabBar.appendChild(spacer);
      var closeBtn=document.createElement('button');
      closeBtn.textContent='\u00d7'; closeBtn.setAttribute('data-tip','Close window');
      closeBtn.style.cssText='width:14px;flex-shrink:0;height:100%;padding:0;border:none;border-left:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(255,255,255,0.28);font-size:10px;line-height:1;cursor:pointer;';
      closeBtn.addEventListener('mouseenter',function(){closeBtn.style.color='rgba(255,80,80,0.9)';closeBtn.style.background='rgba(255,30,30,0.14)';});
      var add=document.createElement('button');
      add.textContent='+'; add.setAttribute('data-tip','Add tab');
      add.style.cssText='width:14px;flex-shrink:0;height:100%;padding:0;border:none;border-left:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(255,255,255,0.22);font-size:8px;cursor:pointer;';
      add.addEventListener('click',    function(e){e.stopPropagation();var idx=tabs.length;tabs.push({label:'TAB '+(idx+1)});saveTabs();rebuild();setActive(idx);});
      add.addEventListener('mousedown', function(e){e.stopPropagation();});
      tabBar.appendChild(add);
      closeBtn.addEventListener('mouseleave',function(){closeBtn.style.color='rgba(255,255,255,0.28)';closeBtn.style.background='transparent';});
      closeBtn.addEventListener('click',     function(e){e.stopPropagation();var d=el.querySelector('.del-btn');if(d)d.click();});
      closeBtn.addEventListener('mousedown', function(e){e.stopPropagation();});
      tabBar.appendChild(closeBtn);
      setActive(activeIdx);
    }
    rebuild();
    el.appendChild(tabBar);
    el.appendChild(pane);
  },
  bgd: function(el) {
    el.style.cssText += 'background:rgba(12,16,22,0.65);border:1px solid rgba(255,255,255,0.10);';
    el.setAttribute('data-backdrop','true');
  },
  bgc: function(el) {
    el.style.cssText += 'background:transparent;border:1px dashed rgba(255,255,255,0.22);';
    el.setAttribute('data-backdrop','true');
  },
  minimap: function(el) {
    el.style.cssText += 'overflow:hidden;background:#1e2a10;position:relative;';
    var elId     = el.id;
    var stateKey = 'ns-mm-min-'    + elId;
    var maxKey   = 'ns-mm-maxpos-' + elId;
    var minKey   = 'ns-mm-minpos-' + elId;
    var minimized = localStorage.getItem(stateKey) === 'true';

    /* ── Canvas (fills element at any size) ── */
    var cv = document.createElement('canvas');
    var W = 240, H = 160;
    cv.width = W; cv.height = H;
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated;';
    el.appendChild(cv);

    /* ── Toggle button — bottom-left ── */
    var toggleBtn = document.createElement('button');
    toggleBtn.style.cssText = [
      'position:absolute;bottom:0;left:0;z-index:50;',
      'background:rgba(10,16,6,0.82);',
      'border:1px solid rgba(210,178,48,0.5);',
      'color:rgba(210,178,48,0.9);',
      'font-family:\'Courier New\',monospace;font-size:6px;font-weight:bold;',
      'width:10px;height:10px;',
      'display:flex;align-items:center;justify-content:center;',
      'cursor:pointer;pointer-events:auto;padding:0;line-height:1;',
      'transition:background 0.1s,border-color 0.1s,transform 0.22s cubic-bezier(0.4,0,0.2,1);',
      'transform-origin:center center;',
    ].join('');
    toggleBtn.textContent = '↙';
    el.appendChild(toggleBtn);

    toggleBtn.addEventListener('mouseenter', function() {
      toggleBtn.style.background = 'rgba(210,178,48,0.22)';
      toggleBtn.style.borderColor = 'rgba(210,178,48,0.9)';
    });
    toggleBtn.addEventListener('mouseleave', function() {
      toggleBtn.style.background = 'rgba(10,16,6,0.82)';
      toggleBtn.style.borderColor = 'rgba(210,178,48,0.5)';
    });
    toggleBtn.addEventListener('mousedown', function(e) { e.stopPropagation(); e.preventDefault(); });

    /* Read current grid position from inline style */
    function getGridPos() {
      var gc = (el.style.gridColumn || '').split('/').map(function(s){ return parseInt(s.trim()); });
      var gr = (el.style.gridRow    || '').split('/').map(function(s){ return parseInt(s.trim()); });
      if (gc.length < 2 || isNaN(gc[0]) || isNaN(gc[1])) return null;
      return { c1: gc[0], c2: gc[1], r1: gr[0], r2: gr[1] };
    }

    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var curPos = getGridPos();
      if (!curPos) { minimized = !minimized; localStorage.setItem(stateKey, minimized ? 'true' : 'false'); applyState(); return; }

      if (!minimized) {
        /* Maximize → Minimize: snapshot current size as max, restore saved min */
        localStorage.setItem(maxKey, JSON.stringify(curPos));
        var minPos = JSON.parse(localStorage.getItem(minKey) || 'null');
        if (!minPos) {
          /* Default min: 2 cols × 2 rows, anchored to same bottom-left corner */
          minPos = { c1: curPos.c1, r1: Math.max(1, curPos.r2 - 2), c2: curPos.c1 + 2, r2: curPos.r2 };
        }
        minimized = true;
        localStorage.setItem(stateKey, 'true');
        if (el._mmResize) el._mmResize(minPos);
      } else {
        /* Minimize → Maximize: snapshot current size as min, restore saved max */
        localStorage.setItem(minKey, JSON.stringify(curPos));
        var maxPos = JSON.parse(localStorage.getItem(maxKey) || 'null');
        if (!maxPos) {
          /* Default max: 12 cols × 10 rows, anchored to same bottom-left corner */
          maxPos = { c1: curPos.c1, r1: Math.max(1, curPos.r2 - 10), c2: Math.min(25, curPos.c1 + 12), r2: curPos.r2 };
        }
        minimized = false;
        localStorage.setItem(stateKey, 'false');
        if (el._mmResize) el._mmResize(maxPos);
      }
      applyState();
    });

    function applyState() {
      /* ↙ when expanded (collapse), ↗ when collapsed (expand) */
      toggleBtn.textContent = minimized ? '↙' : '↗';
    }

    /* ── Animation ── */
    var ctx = cv.getContext('2d');
    var G = 12, TW = 9, TH = 4.5;
    var ox = W * 0.5, oy = H * 0.22;
    function isoXY(x, y) { return { x: ox + (x - y) * TW, y: oy + (x + y) * TH }; }
    var dots = [
      { t: 'p', x: 3,   y: 4.5 },
      { t: 'a', x: 6,   y: 7   }, { t: 'a', x: 7,   y: 8   }, { t: 'a', x: 8.5, y: 6.5 },
      { t: 'a', x: 9,   y: 9   }, { t: 'a', x: 10,  y: 7.5 }, { t: 'a', x: 9.5, y: 8.5 },
      { t: 'e', x: 8,   y: 10  }, { t: 'e', x: 9.5, y: 11  }, { t: 'e', x: 7,   y: 11.5 },
    ];
    var frame = 0, raf2;
    function mmTick() {
      frame++;
      var t = frame * 0.04;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#1e2a10'; ctx.fillRect(0, 0, W, H);
      var c0=isoXY(0,0), c1=isoXY(G,0), c2=isoXY(G,G), c3=isoXY(0,G);
      ctx.beginPath(); ctx.moveTo(c0.x,c0.y); ctx.lineTo(c1.x,c1.y); ctx.lineTo(c2.x,c2.y); ctx.lineTo(c3.x,c3.y); ctx.closePath();
      ctx.fillStyle = 'rgba(48,68,20,0.7)'; ctx.fill();
      ctx.strokeStyle = 'rgba(200,170,44,0.3)'; ctx.lineWidth = 0.5;
      for (var i = 0; i <= G; i++) {
        var a, b;
        a = isoXY(i,0); b = isoXY(i,G); ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        a = isoXY(0,i); b = isoXY(G,i); ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(c0.x,c0.y); ctx.lineTo(c1.x,c1.y); ctx.lineTo(c2.x,c2.y); ctx.lineTo(c3.x,c3.y); ctx.closePath();
      ctx.strokeStyle = 'rgba(210,178,48,0.88)'; ctx.lineWidth = 1.2; ctx.stroke();
      var pl = dots[0], ps = isoXY(pl.x, pl.y);
      ctx.save(); ctx.beginPath(); ctx.moveTo(ps.x, ps.y);
      var fd = -0.45, fs = 0.5, fl = 65;
      ctx.lineTo(ps.x + Math.cos(fd-fs)*fl, ps.y + Math.sin(fd-fs)*fl);
      ctx.lineTo(ps.x + Math.cos(fd+fs)*fl, ps.y + Math.sin(fd+fs)*fl);
      ctx.closePath(); ctx.fillStyle = 'rgba(255,255,255,0.09)'; ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 0.75; ctx.stroke(); ctx.restore();
      dots.forEach(function(d) {
        var s = isoXY(d.x, d.y), px = Math.round(s.x), py = Math.round(s.y);
        if (d.t === 'e') {
          var pulse = Math.sin(t * 2.8 + d.x) * 0.5 + 0.5;
          var sz = Math.ceil(2.5 + pulse);
          ctx.fillStyle = 'rgba(200,72,38,' + (0.65 + pulse * 0.35) + ')';
          ctx.fillRect(px - Math.floor(sz/2), py - Math.floor(sz/2), sz, sz);
        } else if (d.t === 'a') {
          ctx.fillStyle = '#e6c840'; ctx.fillRect(px - 1, py - 1, 3, 3);
        } else {
          ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 2, py - 2, 4, 4);
        }
      });
      raf2 = requestAnimationFrame(mmTick);
    }

    applyState();
    mmTick();
    el._stopAnim = function() { if (raf2) { cancelAnimationFrame(raf2); raf2 = null; } };
  },
};

/* ══════════════════════════════════════════
   HUD MANAGER — single unified controller
   ══════════════════════════════════════════ */
(function() {
  const COLS = 24, ROWS = 24;
  const card  = document.querySelector('.hud');
  const ghost = document.getElementById('ghost');
  const delFloater = document.getElementById('del-floater');
  const alignBar = document.getElementById('align-bar');
  const alignBtns = alignBar.querySelectorAll('.ab[data-a]');

  /* ── Storage keys ── */
  const S_LAYOUT  = 'ns-hud-layout';
  const S_DELETED = 'ns-hud-deleted';
  const S_TEXTS   = 'ns-hud-texts';
  const S_ALIGN   = 'ns-hud-align';
  const S_CUSTOM  = 'ns-hud-custom';
  const S_NATURAL = 'ns-hud-natural';   /* intrinsic content cell-size per id → drives --scale; persisted so resize-scaling survives reload & import */

  function load(key, def) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') || def; } catch(e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  /* ── Default layout ── */
  const DEF_LAYOUT = {
    'el-avatar':   { c1:1, r1:1, c2:4, r2:5 },
    'el-sword':    { c1:4, r1:4, c2:5, r2:5 },
    'el-lv':       { c1:1, r1:4, c2:4, r2:5 },
    'el-name':     { c1:4, r1:1, c2:8, r2:2 },
    'el-hp-label': { c1:4, r1:2, c2:5, r2:3 },
    'el-mp-label': { c1:4, r1:3, c2:5, r2:4 },
    'el-hp':       { c1:5, r1:2, c2:8, r2:3 },
    'el-mp':       { c1:5, r1:3, c2:8, r2:4 },
    'el-human':    { c1:5, r1:4, c2:6, r2:5 },
    'el-neutral':  { c1:6, r1:4, c2:7, r2:5 },
    'el-medium':   { c1:3, r1:4, c2:4, r2:5 },
    'el-bxp':      { c1:1, r1:5, c2:8, r2:6 },
    'el-txp':      { c1:1, r1:6, c2:8, r2:7 },
    'el-wxp':      { c1:1, r1:7, c2:8, r2:8 },
    'el-guild':    { c1:1, r1:8, c2:3, r2:9 },
    'el-divider':  { c1:5, r1:1, c2:6, r2:9 },
    'el-ref':      { c1:6, r1:8, c2:8, r2:9 },
  };
  const DEF_NAT = {
    'el-avatar':   { w:3, h:4 }, 'el-sword':    { w:2, h:2 },
    'el-lv':       { w:1, h:1 }, 'el-name':     { w:5, h:1 },
    'el-hp-label': { w:1, h:1 }, 'el-mp-label': { w:1, h:1 },
    'el-hp':       { w:5, h:1 }, 'el-mp':       { w:5, h:1 },
    'el-human':    { w:2, h:2 }, 'el-neutral':  { w:2, h:2 },
    'el-medium':   { w:2, h:2 }, 'el-bxp':      { w:8, h:1 },
    'el-txp':      { w:8, h:1 }, 'el-wxp':      { w:8, h:1 },
    'el-guild':    { w:2, h:1 },
    'el-divider':  { w:1, h:8 },
    'el-ref':       { w:3, h:1 },
  };

  const layout  = Object.assign({}, DEF_LAYOUT, load(S_LAYOUT, {}));
  const natural = Object.assign({}, DEF_NAT, load(S_NATURAL, {}));
  const deleted = load(S_DELETED, []);
  const texts   = load(S_TEXTS,   {});
  const aligns  = load(S_ALIGN,   {});

  /* ── Stacking order (z-index) ─────────────────────────────────────────
     Persisted per element so the last object placed stays on top — even
     across reloads, where elements are otherwise restored grouped by type
     (icons, then comps…) which scrambles the visual order. Backdrops are
     excluded so panels stay behind as intended. */
  var zorder = load('ns-hud-zorder', {});
  var zTop = 1; Object.keys(zorder).forEach(function(k){ var v = +zorder[k]; if (v >= zTop) zTop = v + 1; });
  function applyStoredZorder(id, el) { if (!el || el.hasAttribute('data-backdrop')) return; if (zorder[id] != null) el.style.zIndex = zorder[id]; }
  function bumpZ(id, el) { if (!el || el.hasAttribute('data-backdrop')) return; zorder[id] = zTop++; el.style.zIndex = zorder[id]; save('ns-hud-zorder', zorder); }

  /* Migrate legacy sequential span IDs (et-0..et-5) → stable element-based IDs */
  const LEGACY = { 'et-0':'et-lv', 'et-1':'et-name', 'et-2':'et-hp-label', 'et-3':'et-mp-label', 'et-4':'et-hp', 'et-5':'et-mp' };
  var migrated = false;
  Object.keys(LEGACY).forEach(function(old) {
    if (texts[old] !== undefined && texts[LEGACY[old]] === undefined) {
      texts[LEGACY[old]] = texts[old]; delete texts[old]; migrated = true;
    }
  });
  if (migrated) save(S_TEXTS, texts);
  var   customs = load(S_CUSTOM,  []).filter(function(c){ return c.text && c.text.trim(); });

  /* ── Place element on grid ── */
  function place(id, pos) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.gridColumn = pos.c1 + ' / ' + pos.c2;
    el.style.gridRow    = pos.r1 + ' / ' + pos.r2;
    const nat = natural[id];
    if (nat) {
      const sx = (pos.c2 - pos.c1) / nat.w;
      const sy = (pos.r2 - pos.r1) / nat.h;
      el.style.setProperty('--scale', Math.sqrt(sx * sy).toFixed(4));
    }
    layout[id] = pos;
  }

  /* ── toCell ── */
  function toCell(cx, cy) {
    const r = card.getBoundingClientRect();
    return {
      col: Math.max(1, Math.min(COLS, Math.floor((cx - r.left) / (r.width  / COLS)) + 1)),
      row: Math.max(1, Math.min(ROWS, Math.floor((cy - r.top)  / (r.height / ROWS)) + 1)),
    };
  }

  /* ══════════════════════
     DRAG / RESIZE STATE
     ══════════════════════ */
  var drag = null;

  function startMove(e, el) {
    e.preventDefault();
    /* selection happens here (mousedown) so click/drag never fight */
    var additive = e.shiftKey || e.ctrlKey || e.metaKey;
    if (additive) { toggleSel(el.id); }
    else if (!isSel(el.id)) { selectOnly(el.id); }
    if (!isSel(el.id)) return;  /* additive click deselected it — nothing to drag */
    syncAlignForSelection();
    const pos = Object.assign({}, layout[el.id]);
    const mc  = toCell(e.clientX, e.clientY);
    var members = selSet.slice();
    var starts = {};
    var minC=Infinity, minR=Infinity, maxC=-Infinity, maxR=-Infinity;
    members.forEach(function(mid){ var p=layout[mid]; if(!p)return; starts[mid]=Object.assign({},p); minC=Math.min(minC,p.c1); minR=Math.min(minR,p.r1); maxC=Math.max(maxC,p.c2); maxR=Math.max(maxR,p.r2); });
    drag = { mode:'move', el, pos, members:members, starts:starts, bbox:{minC:minC,minR:minR,maxC:maxC,maxR:maxR}, offC: mc.col - pos.c1, offR: mc.row - pos.r1, next: null, delta:{dc:0,dr:0} };
    members.forEach(function(mid){ var me=document.getElementById(mid); if(me)me.classList.add('dragging'); });
    card.classList.add('drag-mode');
    ghost.classList.add('active');
    ghost.style.gridColumn = pos.c1 + '/' + pos.c2;
    ghost.style.gridRow    = pos.r1 + '/' + pos.r2;
    alignBar.classList.remove('show');   /* hide while dragging; re-shown on mouseup */
    hideDelFloater();
  }

  function startResize(e, el, dir) {
    e.preventDefault(); e.stopPropagation();
    const pos = Object.assign({}, layout[el.id]);
    drag = { mode:'resize', dir: dir||'se', el, pos, next: null };
    hideDelFloater();
    el.classList.add('dragging');
    card.classList.add('drag-mode');
    ghost.classList.add('active');
    ghost.style.gridColumn = pos.c1 + '/' + pos.c2;
    ghost.style.gridRow    = pos.r1 + '/' + pos.r2;
  }

  document.addEventListener('mousemove', function(e) {
    if (!drag) return;
    const mc = toCell(e.clientX, e.clientY);
    if (drag.mode === 'move') {
      const w = drag.pos.c2 - drag.pos.c1, h = drag.pos.r2 - drag.pos.r1;
      var dc = (mc.col - drag.offC) - drag.pos.c1, dr = (mc.row - drag.offR) - drag.pos.r1;
      /* clamp the delta so the whole group's bounding box stays on the grid */
      dc = Math.max(1 - drag.bbox.minC, Math.min(COLS + 1 - drag.bbox.maxC, dc));
      dr = Math.max(1 - drag.bbox.minR, Math.min(ROWS + 1 - drag.bbox.maxR, dr));
      drag.delta = { dc:dc, dr:dr };
      const nc1 = drag.pos.c1 + dc, nr1 = drag.pos.r1 + dr;
      drag.next = { c1:nc1, r1:nr1, c2:nc1+w, r2:nr1+h };
    } else {
      var d = drag.dir, p = drag.pos;
      var nc1=p.c1, nr1=p.r1, nc2=p.c2, nr2=p.r2;
      if (d.includes('e')) nc2 = Math.max(p.c1+1, Math.min(COLS+1, mc.col+1));
      if (d.includes('s')) nr2 = Math.max(p.r1+1, Math.min(ROWS+1, mc.row+1));
      if (d.includes('w')) nc1 = Math.max(1, Math.min(p.c2-1, mc.col));
      if (d.includes('n')) nr1 = Math.max(1, Math.min(p.r2-1, mc.row));
      drag.next = { c1:nc1, r1:nr1, c2:nc2, r2:nr2 };
    }
    ghost.style.gridColumn = drag.next.c1 + '/' + drag.next.c2;
    ghost.style.gridRow    = drag.next.r1 + '/' + drag.next.r2;
  });

  document.addEventListener('mouseup', function() {
    if (!drag) return;
    if (drag.next) {
      if (drag.mode === 'move' && drag.members && drag.members.length > 1) {
        var dc = drag.delta.dc, dr = drag.delta.dr;
        drag.members.forEach(function(mid){ var s = drag.starts[mid]; if (s) place(mid, { c1:s.c1+dc, r1:s.r1+dr, c2:s.c2+dc, r2:s.r2+dr }); });
      } else {
        place(drag.el.id, drag.next);
      }
      save(S_LAYOUT, layout);
      var _changes = [];
      if (drag.mode === 'move' && drag.members && drag.members.length > 1) {
        drag.members.forEach(function(mid){ var s = drag.starts[mid]; var a = layout[mid];
          if (s && a && (s.c1!==a.c1||s.r1!==a.r1||s.c2!==a.c2||s.r2!==a.r2))
            _changes.push({ id: mid, before:{c1:s.c1,r1:s.r1,c2:s.c2,r2:s.r2}, after:{c1:a.c1,r1:a.r1,c2:a.c2,r2:a.r2} }); });
      } else if (drag.el) {
        var s0 = drag.pos, a0 = layout[drag.el.id];
        if (s0 && a0 && (s0.c1!==a0.c1||s0.r1!==a0.r1||s0.c2!==a0.c2||s0.r2!==a0.r2))
          _changes.push({ id: drag.el.id, before:{c1:s0.c1,r1:s0.r1,c2:s0.c2,r2:s0.r2}, after:{c1:a0.c1,r1:a0.r1,c2:a0.c2,r2:a0.r2} });
      }
      pushTransform(_changes);
    }
    if (drag.members) drag.members.forEach(function(mid){ var me=document.getElementById(mid); if(me)me.classList.remove('dragging'); });
    else drag.el.classList.remove('dragging');
    card.classList.remove('drag-mode');
    ghost.classList.remove('active');
    drag = null;
    syncAlignForSelection();
  });

  /* ══════════════════════
     SELECT / DELETE STATE
     ══════════════════════ */
  var selId = null;        /* primary selection (drives the align toolbar) */
  var selSet = [];          /* every selected id — multi-select / group */

  function isSel(id) { return selSet.indexOf(id) >= 0; }
  function addSel(id) {
    var el = document.getElementById(id); if (!el) return;
    if (!isSel(id)) { selSet.push(id); el.classList.add('selected'); }
    selId = id;
  }
  function toggleSel(id) {
    if (isSel(id)) {
      var el = document.getElementById(id); if (el) el.classList.remove('selected');
      selSet = selSet.filter(function(x){ return x !== id; });
      selId = selSet.length ? selSet[selSet.length - 1] : null;
    } else { addSel(id); }
  }
  function selectOnly(id) { deselect(); addSel(id); refreshOptionsBar(); }
  function syncAlignForSelection() { refreshOptionsBar(); }

  function deselect() {
    selSet.forEach(function(x){ var e = document.getElementById(x); if (e) e.classList.remove('selected'); });
    selSet = []; selId = null;
    positionDelFloater();
  }

  /* ── Undo / redo history (command stack) ──────────────────────
     Each command holds closures over the exact DOM nodes, so undoing a delete
     re-inserts the original element with every listener and component (Tab
     Window, minimap…) state intact — no rebuild, no desync. */
  var undoStack = [], redoStack = [], applyingHistory = false;
  function updateHistoryButtons() {
    var u = document.getElementById('undo-btn'), r = document.getElementById('redo-btn');
    if (u) u.disabled = !undoStack.length;
    if (r) r.disabled = !redoStack.length;
  }
  function pushCmd(cmd) {
    if (applyingHistory) return;
    undoStack.push(cmd);
    if (undoStack.length > 120) undoStack.shift();
    redoStack.length = 0;
    updateHistoryButtons();
  }
  function undo() {
    var c = undoStack.pop(); if (!c) return;
    applyingHistory = true; try { c.undo(); } finally { applyingHistory = false; }
    redoStack.push(c); updateHistoryButtons();
  }
  function redo() {
    var c = redoStack.pop(); if (!c) return;
    applyingHistory = true; try { c.redo(); } finally { applyingHistory = false; }
    undoStack.push(c); updateHistoryButtons();
  }
  function refreshAfterHistory() { refreshOptionsBar(); positionDelFloater(); updateHistoryButtons(); }

  /* Capture the steps to delete one element + restore it. The detached node is
     held in the closure, so restore re-inserts the very same element. */
  function captureDelete(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    var kind = el.hasAttribute('data-custom')   ? 'custom'
             : el.hasAttribute('data-icon-el')  ? 'icon'
             : el.hasAttribute('data-comp-el')  ? 'comp'
             : el.hasAttribute('data-emoji-el') ? 'emoji'
             : 'builtin';
    var prevLayout  = layout[id]  ? Object.assign({}, layout[id])  : null;
    var prevNatural = natural[id] ? Object.assign({}, natural[id]) : null;
    var savedItem =
        kind === 'custom' ? customs.filter(function(c){ return c.id === id; })[0]
      : kind === 'icon'   ? savedIcons.filter(function(c){ return c.id === id; })[0]
      : kind === 'comp'   ? savedComps.filter(function(c){ return c.id === id; })[0]
      : kind === 'emoji'  ? savedEmojis.filter(function(c){ return c.id === id; })[0]
      : null;
    function applyDelete() {
      if (el._stopAnim) el._stopAnim();
      el.classList.remove('selected'); el.classList.remove('dragging');
      el.remove();
      delete layout[id];
      delete natural[id];
      save(S_LAYOUT, layout);
      save(S_NATURAL, natural);
      if (kind === 'icon')        { savedIcons  = savedIcons.filter(function(c){ return c.id !== id; });  save(S_ICONS,  savedIcons); }
      else if (kind === 'comp')   { savedComps  = savedComps.filter(function(c){ return c.id !== id; });  save(S_COMPS,  savedComps); }
      else if (kind === 'emoji')  { savedEmojis = savedEmojis.filter(function(c){ return c.id !== id; }); save(S_EMOJIS, savedEmojis); }
      else if (kind === 'builtin'){ if (!deleted.includes(id)) deleted.push(id); save(S_DELETED, deleted); }
      else                        { customs = customs.filter(function(c){ return c.id !== id; }); save(S_CUSTOM, customs); }
      selSet = selSet.filter(function(x){ return x !== id; });
      if (selId === id) selId = selSet.length ? selSet[selSet.length - 1] : null;
    }
    function restore() {
      if (prevLayout)  layout[id]  = Object.assign({}, prevLayout);
      if (prevNatural) natural[id] = Object.assign({}, prevNatural);
      card.insertBefore(el, document.getElementById('ghost'));
      if (kind === 'builtin')      { var i = deleted.indexOf(id); if (i >= 0) deleted.splice(i, 1); save(S_DELETED, deleted); }
      else if (kind === 'custom')  { if (savedItem && customs.indexOf(savedItem) < 0) customs.push(savedItem); save(S_CUSTOM, customs); }
      else if (kind === 'icon')    { if (savedItem && savedIcons.indexOf(savedItem) < 0) savedIcons.push(savedItem); save(S_ICONS, savedIcons); }
      else if (kind === 'comp')    { if (savedItem && savedComps.indexOf(savedItem) < 0) savedComps.push(savedItem); save(S_COMPS, savedComps); }
      else if (kind === 'emoji')   { if (savedItem && savedEmojis.indexOf(savedItem) < 0) savedEmojis.push(savedItem); save(S_EMOJIS, savedEmojis); }
      if (prevLayout) place(id, layout[id]);
      save(S_LAYOUT, layout);
      save(S_NATURAL, natural);
    }
    return { do: applyDelete, undo: restore };
  }

  /* Delete a set of elements as ONE undoable step. */
  function performDelete(ids) {
    var cmds = ids.map(captureDelete).filter(Boolean);
    if (!cmds.length) return;
    cmds.forEach(function(c){ c.do(); });
    hideAlign();
    pushCmd({
      undo: function(){ cmds.slice().reverse().forEach(function(c){ c.undo(); }); refreshAfterHistory(); },
      redo: function(){ cmds.forEach(function(c){ c.do(); }); refreshAfterHistory(); }
    });
    refreshAfterHistory();
  }
  function doDelete(id) { performDelete([id]); }
  function deleteSelected() { performDelete(selSet.slice()); }

  /* Record a freshly-added element (or group) as one undoable step. Undo
     removes the node (kept alive in the closure); redo re-inserts it. */
  function recordAdd(ids) {
    if (applyingHistory) return;
    var caps = ids.map(captureDelete).filter(Boolean);
    if (!caps.length) return;
    pushCmd({
      undo: function(){ caps.slice().reverse().forEach(function(c){ c.do(); }); refreshAfterHistory(); },
      redo: function(){ caps.forEach(function(c){ c.undo(); }); refreshAfterHistory(); }
    });
  }

  /* Record a move / resize as one undoable step. */
  function pushTransform(changes) {
    if (applyingHistory || !changes.length) return;
    pushCmd({
      undo: function(){ changes.forEach(function(c){ place(c.id, c.before); }); save(S_LAYOUT, layout); refreshAfterHistory(); },
      redo: function(){ changes.forEach(function(c){ place(c.id, c.after);  }); save(S_LAYOUT, layout); refreshAfterHistory(); }
    });
  }

  function hideDelFloater() { if (delFloater) delFloater.style.display = 'none'; }

  /* Floating delete button — sits on the cell next to the selection so it never
     covers the object or its resize handles; flips to the opposite side at the
     grid edge, and tucks just inside for a full-width selection. */
  function positionDelFloater() {
    var f = delFloater;
    if (!f) return;
    if (!selSet.length || drag) { f.style.display = 'none'; return; }
    var minC = Infinity, minR = Infinity, maxC = -Infinity;
    selSet.forEach(function(id){ var p = layout[id]; if (!p) return;
      if (p.c1 < minC) minC = p.c1; if (p.r1 < minR) minR = p.r1; if (p.c2 > maxC) maxC = p.c2; });
    if (!isFinite(minC)) { f.style.display = 'none'; return; }
    var cs = getComputedStyle(card);
    var cw = parseFloat(cs.getPropertyValue('--hud-col')) || 20;
    var ch = parseFloat(cs.getPropertyValue('--hud-row')) || 15;
    var SZ = 10;
    /* maxC / minC are grid LINES; the right neighbour cell starts at line maxC. */
    var leftLine = (maxC <= COLS) ? maxC : (minC - 1 >= 1 ? minC - 1 : maxC - 1);
    f.style.left = ((leftLine - 1) * cw + (cw - SZ) / 2) + 'px';
    f.style.top  = ((minR - 1) * ch + (ch - SZ) / 2) + 'px';
    f.style.display = 'flex';
  }

  /* Wire the history buttons + the floating delete button. */
  (function wireHistoryUI() {
    var u = document.getElementById('undo-btn'), r = document.getElementById('redo-btn');
    if (u) u.addEventListener('click', function(e){ e.stopPropagation(); undo(); });
    if (r) r.addEventListener('click', function(e){ e.stopPropagation(); redo(); });
    var f = delFloater;
    if (f) {
      f.addEventListener('mousedown', function(e){ e.stopPropagation(); e.preventDefault(); });
      f.addEventListener('click',     function(e){ e.stopPropagation(); if (selSet.length) performDelete(selSet.slice()); });
    }
    updateHistoryButtons();
  })();

  document.addEventListener('keydown', function(e) {
    var meta    = e.ctrlKey || e.metaKey;
    var editing = document.activeElement && document.activeElement.isContentEditable;
    if (meta && !editing && (e.key === 'z' || e.key === 'Z')) { e.preventDefault(); if (e.shiftKey) redo(); else undo(); return; }
    if (meta && !editing && (e.key === 'y' || e.key === 'Y')) { e.preventDefault(); redo(); return; }
    /* Copy / paste the current selection (ignored while editing text) */
    if (meta && !editing && (e.key === 'c' || e.key === 'C')) { if (selSet.length) { e.preventDefault(); copySelection(); } return; }
    if (meta && !editing && (e.key === 'v' || e.key === 'V')) { if (clipboard.length) { e.preventDefault(); pasteClipboard(); } return; }
    if ((e.key === 'Delete' || e.key === 'Backspace') && selSet.length) {
      if (document.activeElement && document.activeElement.contentEditable === 'true') return;
      e.preventDefault();
      deleteSelected();
    }
    /* Enter / Escape end the pending interaction with the focused object —
       same as clicking away. While editing any contentEditable (custom text,
       labels, tab names, bar text) it commits via that element's blur handler;
       otherwise it clears the current selection + options bar. */
    if (e.key === 'Enter' || e.key === 'Escape') {
      var ae = document.activeElement;
      if (ae && ae.isContentEditable) {
        e.preventDefault();
        ae.blur();
        return;
      }
      if (e.key === 'Escape' || selSet.length) { e.preventDefault(); deselect(); hideAlign(); }
    }
  });

  /* ══════════════════════
     ALIGN TOOLBAR
     ══════════════════════ */
  /* ── support predicates: which objects accept which option ── */
  function elById(id){ return document.getElementById(id); }
  function canTextAlign(el){ return !!(el && (el.querySelector('.et') || el.querySelector('[data-tab-bar]') || el.classList.contains('ns-text') || el.hasAttribute('data-custom'))); }
  function canSize(el){ return !!(el && el.querySelector('.et')); }
  function canColor(el){ return !!(el && (el.querySelector('.et') || el.querySelector('.bar-fill') || el.hasAttribute('data-backdrop'))); }
  function canColorFg(el){ return !!(el && el.querySelector('.et')); }
  function canColorBg(el){ return !!(el && (el.querySelector('.bar-fill') || el.hasAttribute('data-backdrop') || el.hasAttribute('data-tintable-bg'))); }
  function selWhere(pred){ return selSet.filter(function(id){ return pred(elById(id)); }); }
  function aggVal(ids, map, def){ var v; for (var i = 0; i < ids.length; i++){ var c = map[ids[i]] || def; if (i === 0) v = c; else if (c !== v) return undefined; } return v; }

  const ALIGN_MAP = { left:'flex-start', center:'center', right:'flex-end' };

  function applyAlign(id, a) {
    const el = document.getElementById(id);
    if (!el) return;
    aligns[id] = a;
    const jc = ALIGN_MAP[a];
    const pl = (a === 'center') ? '0' : '3px';
    const pr = (a === 'right')  ? '3px' : '0';
    var tabBar = el.querySelector('[data-tab-bar]');
    if (tabBar) {
      tabBar.style.justifyContent = jc;
    } else if (id === 'el-hp' || id === 'el-mp') {
      const bt = el.querySelector('.bar-text');
      if (bt) { bt.style.justifyContent = jc; bt.style.paddingLeft = pl; bt.style.paddingRight = pr; }
    } else if (el.hasAttribute('data-bar-kind')) {
      var bspan = el.querySelector('.et');
      if (bspan) { bspan.style.justifyContent = jc; bspan.style.paddingLeft = pl; bspan.style.paddingRight = pr; }
    } else {
      el.style.justifyContent = jc;
      el.style.paddingLeft = pl;
      el.style.paddingRight = pr;
    }
    save(S_ALIGN, aligns);
  }

  /* ── Vertical align ── */
  const S_VALIGN  = 'ns-hud-valigns';
  const vAlignBtns = alignBar.querySelectorAll('.ab[data-va]');
  var   valigns   = load(S_VALIGN, {});
  const VA_MAP    = { top: 'flex-start', middle: 'center', bottom: 'flex-end' };

  function applyVAlign(id, va) {
    const el = document.getElementById(id);
    if (!el) return;
    var vt = el.hasAttribute('data-bar-kind') ? (el.querySelector('.et') || el) : el;
    vt.style.alignItems = VA_MAP[va] || 'center';
    valigns[id] = va;
    save(S_VALIGN, valigns);
    vAlignBtns.forEach(function(b){ b.classList.toggle('on', b.dataset.va === va); });
  }

  vAlignBtns.forEach(function(btn) {
    btn.addEventListener('mousedown', function(e) {
      e.preventDefault(); e.stopPropagation();
      var ids = selWhere(canTextAlign); if (!ids.length) return;
      ids.forEach(function(id){ applyVAlign(id, btn.dataset.va); });
      refreshOptionsBar();
    });
    btn.addEventListener('click', function(e){ e.stopPropagation(); });
  });

  /* Restore persisted valigns */
  Object.keys(valigns).forEach(function(id) {
    var el = document.getElementById(id);
    if (el && valigns[id] && VA_MAP[valigns[id]]) el.style.alignItems = VA_MAP[valigns[id]];
  });

  function positionOptionsBar() {
    var minC = Infinity, minR = Infinity, maxR = -Infinity;
    selSet.forEach(function(id){ var p = layout[id]; if (!p) return;
      if (p.c1 < minC) minC = p.c1; if (p.r1 < minR) minR = p.r1; if (p.r2 > maxR) maxR = p.r2; });
    if (!isFinite(minC)) return;
    var cs = getComputedStyle(card);
    var cr = card.getBoundingClientRect();
    var cw = parseFloat(cs.getPropertyValue('--hud-col')) || (cr.width / COLS);
    var ch = parseFloat(cs.getPropertyValue('--hud-row')) || (cr.height / ROWS);
    var cols = 5, rows = 6;
    /* Snap the panel to whole grid cells so every option lands exactly on a cell.
       Sit it directly above the selection; flip below if it would clip the top. */
    var c1 = Math.max(1, Math.min(COLS + 1 - cols, minC));
    var r1 = minR - rows;
    if (r1 < 1) r1 = maxR;
    r1 = Math.max(1, Math.min(ROWS + 1 - rows, r1));
    alignBar.style.left = ((c1 - 1) * cw) + 'px';
    alignBar.style.top  = ((r1 - 1) * ch) + 'px';
  }

  /* Show the options bar for the current selection. Each option group appears
     only if at least one selected object supports it, and reflects the shared
     value (no active button when the selection is mixed). Clicking an option
     applies it to every selected object that supports it. */
  function refreshOptionsBar() {
    closeSwatches();
    positionDelFloater();
    if (!selSet.length) { alignBar.classList.remove('show'); return; }
    var alignIds = selWhere(canTextAlign);
    var sizeIds  = selWhere(canSize);
    var fgIds    = selWhere(canColorFg);
    var bgIds    = selWhere(canColorBg);
    var padIds   = selWhere(canPad);
    var zIds     = selWhere(canZ);
    if (!alignIds.length && !sizeIds.length && !fgIds.length && !bgIds.length && !padIds.length && !zIds.length) { alignBar.classList.remove('show'); return; }
    /* Every option keeps its fixed slot; unsupported ones are disabled (greyed),
       never hidden, so the panel never reflows under the selection. */
    alignBtns.forEach(function(b){ b.classList.toggle('is-disabled', !alignIds.length); });
    vAlignBtns.forEach(function(b){ b.classList.toggle('is-disabled', !alignIds.length); });
    sizeBtns.forEach(function(b){ b.classList.toggle('is-disabled', !sizeIds.length); });
    padBtns.forEach(function(b){ b.classList.toggle('is-disabled', !padIds.length); });
    zBtns.forEach(function(b){ b.classList.toggle('is-disabled', !zIds.length); });
    abFgBtn.classList.toggle('is-disabled', !fgIds.length);
    abBgBtn.classList.toggle('is-disabled', !bgIds.length);
    var a = aggVal(alignIds, aligns, 'left');
    alignBtns.forEach(function(b){ b.classList.toggle('on', !!alignIds.length && b.dataset.a === a); });
    var va = aggVal(alignIds, valigns, 'middle');
    vAlignBtns.forEach(function(b){ b.classList.toggle('on', !!alignIds.length && b.dataset.va === va); });
    var sz = aggVal(sizeIds, sizes, 'sm');
    sizeBtns.forEach(function(b){ b.classList.toggle('on', !!sizeIds.length && b.dataset.sz === sz); });
    var pd = aggVal(padIds, pads, '0');
    padBtns.forEach(function(b){ b.classList.toggle('on', !!padIds.length && b.dataset.pad === pd); });
    var fgCol = aggVal(fgIds, fgColors, '');
    abFgBtn.style.background = fgCol || 'var(--ns-ink-dim)';
    var bgCol = aggVal(bgIds, colors, '');
    abBgBtn.style.background = bgCol || 'var(--ns-ink-dim)';
    alignBar.classList.add('show');
    positionOptionsBar();
  }

  function hideAlign() {
    alignBar.classList.remove('show');
    if (typeof closeSwatches === 'function') closeSwatches();
  }

  /* Align buttons — use mousedown to fire before any click-based deselect */
  alignBtns.forEach(function(btn) {
    btn.addEventListener('mousedown', function(e) {
      e.preventDefault(); e.stopPropagation();
      var ids = selWhere(canTextAlign); if (!ids.length) return;
      var a = btn.dataset.a;
      ids.forEach(function(id){ applyAlign(id, a); });
      refreshOptionsBar();
    });
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  /* ── Role (label / value) buttons ─────────────────── */
  /* ── Text size buttons ────────────────────────────── */
  const S_SIZES  = 'ns-hud-sizes';
  const sizeBtns = alignBar.querySelectorAll('.size-btn');
  var   sizes    = load(S_SIZES, {});
  var   SIZE_MAP = { xs:'4px', sm:'5px', md:'7px', lg:'9px', xl:'11px' };

  function applySize(id, sz) {
    const el = document.getElementById(id);
    if (!el) return;
    const span = el.querySelector('.et');
    if (span) span.style.fontSize = SIZE_MAP[sz] || '';
    sizes[id] = sz;
    save(S_SIZES, sizes);
    sizeBtns.forEach(function(b){ b.classList.toggle('on', b.dataset.sz === sz); });
    autoFitText(el, true);
  }

  /* B — background / object colour (bar fill, panel bg, outline border) */
  function applyBg(id, color) {
    var el = document.getElementById(id); if (!el) return;
    var fill = el.querySelector('.bar-fill');
    if (fill) {
      fill.style.background = color;                       /* bars: recolour the fill */
    } else if (el.hasAttribute('data-backdrop')) {
      var bg = el.style.background || '';
      if (!bg || bg === 'transparent') el.style.borderColor = color;  /* outline: recolour the border */
      else el.style.background = color;                    /* panel: recolour the background */
    } else if (el.hasAttribute('data-tintable-bg')) {
      el.style.background = color;                         /* chat & similar: recolour own bg ('transparent' clears it) */
    }
    colors[id] = color;
  }
  /* F — foreground / text colour (the editable label span) */
  function applyFg(id, color) {
    var el = document.getElementById(id); if (!el) return;
    var span = el.querySelector('.et'); if (span) span.style.color = color;
    fgColors[id] = color;
  }

  sizeBtns.forEach(function(btn) {
    btn.addEventListener('mousedown', function(e) {
      e.preventDefault(); e.stopPropagation();
      var ids = selWhere(canSize); if (!ids.length) return;
      ids.forEach(function(id){ applySize(id, btn.dataset.sz); });
      refreshOptionsBar();
    });
    btn.addEventListener('click', function(e){ e.stopPropagation(); });
  });

  /* ── Inset ──────────────────────────────────────── */
  /* Shrinks the object within its grid area by an EQUAL pixel margin on all
     four sides, keeping it centered. Implemented as a non-uniform scale so it
     insets even absolutely-positioned innards (bar fills, panel layers) that
     CSS padding can't touch — and it never grows the box. The margin is a
     fraction of one grid cell, capped so thin objects can't invert. Because
     the grid scales both axes together, the equal-margin look survives resize. */
  const S_PADS  = 'ns-hud-pads';
  const padBtns = alignBar.querySelectorAll('.pad-btn');
  var   pads    = load(S_PADS, {});
  var   PAD_K   = { '0':0, '5':0.08, '10':0.15, '20':0.25, '25':0.32 };

  function canPad(el){ return !!el; }

  /* Set the centered-inset transform on one element (no persistence / UI). */
  function setInset(el, p) {
    el.style.transform = '';                       /* measure at natural size */
    var k = PAD_K[p] || 0;
    if (!k) return;
    var rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var cell = parseFloat(getComputedStyle(card).getPropertyValue('--hud-row')) || 15;
    var m = Math.min(k * cell, 0.4 * Math.min(rect.width, rect.height));  /* equal px / side, capped */
    if (m <= 0 || !isFinite(m)) return;
    var sx = (rect.width  - 2 * m) / rect.width;
    var sy = (rect.height - 2 * m) / rect.height;
    el.style.transformOrigin = 'center center';
    el.style.transform = 'scale(' + sx.toFixed(4) + ',' + sy.toFixed(4) + ')';
  }

  function applyPad(id, p) {
    const el = document.getElementById(id);
    if (!el) return;
    setInset(el, p);
    pads[id] = p;
    save(S_PADS, pads);
    padBtns.forEach(function(b){ b.classList.toggle('on', b.dataset.pad === p); });
  }

  padBtns.forEach(function(btn) {
    btn.addEventListener('mousedown', function(e) {
      e.preventDefault(); e.stopPropagation();
      var ids = selWhere(canPad); if (!ids.length) return;
      ids.forEach(function(id){ applyPad(id, btn.dataset.pad); });
      refreshOptionsBar();
    });
    btn.addEventListener('click', function(e){ e.stopPropagation(); });
  });

  /* ── Z-order (stacking) ───────────────────────────── */
  /* Per-object z-index so the user picks what sits on top. front/back jump past
     every other object; forward/backward step one level. */
  const S_ZIDX = 'ns-hud-zindex';
  const zBtns  = alignBar.querySelectorAll('.z-btn');
  var   zIndexes = load(S_ZIDX, {});

  function canZ(el){ return !!el; }
  function zOf(el){ var v = parseInt(el.style.zIndex, 10); return isNaN(v) ? 0 : v; }
  function curZ(id){ var el = document.getElementById(id); return el ? zOf(el) : 0; }
  function zExtent() {
    var max = 0, min = 0, any = false;
    document.querySelectorAll('.hud-card > [data-grid]').forEach(function(e){
      if (e.id === 'ghost') return;
      var z = zOf(e);
      if (!any) { max = min = z; any = true; }
      else { if (z > max) max = z; if (z < min) min = z; }
    });
    return { max: max, min: min };
  }
  function applyZ(id, z) {
    var el = document.getElementById(id); if (!el) return;
    el.style.zIndex = z;
    zIndexes[id] = z;
    save(S_ZIDX, zIndexes);
  }

  zBtns.forEach(function(btn) {
    btn.addEventListener('mousedown', function(e) {
      e.preventDefault(); e.stopPropagation();
      var ids = selWhere(canZ); if (!ids.length) return;
      var op = btn.dataset.z;
      ids.forEach(function(id) {
        if (op === 'front')     applyZ(id, zExtent().max + 1);
        else if (op === 'back') applyZ(id, zExtent().min - 1);
        else if (op === 'fwd')  applyZ(id, curZ(id) + 1);
        else if (op === 'bwd')  applyZ(id, curZ(id) - 1);
      });
      refreshOptionsBar();
    });
    btn.addEventListener('click', function(e){ e.stopPropagation(); });
  });



  /* ── Text color swatches ─────────────────────── */
  const S_COLORS      = 'ns-hud-colors';
  const S_FGCOLORS    = 'ns-hud-fgcolors';
  var   colors        = load(S_COLORS, {});      /* background / object colour */
  var   fgColors      = load(S_FGCOLORS, {});    /* foreground / text colour   */
  const abFgBtn       = document.getElementById('ab-fg-btn');
  const abBgBtn       = document.getElementById('ab-bg-btn');
  const colorSwatches = document.getElementById('color-swatches');
  var   swatchesOpen  = false;
  var   swatchMode    = 'fg';
  var PALETTE = [
    '#eef0f4','#e6db74','#fac775','#ff6060',
    '#ff4080','#5dcaa5','#66d9e8','#378add',
    '#7f77dd','#ae81ff','#c8a050','#8a9098',
  ];
  PALETTE.forEach(function(c) {
    var dot = document.createElement('div');
    dot.className = 'cs-dot'; dot.dataset.c = c;
    dot.style.background = c;
    colorSwatches.appendChild(dot);
  });
  /* "None" swatch — clears an object's background. Only meaningful for the B
     (object colour) control, so openSwatches() shows it in bg mode, hides it in fg. */
  var noneDot = document.createElement('div');
  noneDot.className = 'cs-dot cs-dot--none';
  noneDot.dataset.c = 'transparent';
  noneDot.setAttribute('data-tip', 'None');
  noneDot.style.background = 'linear-gradient(135deg,#3a3f49 0 44%,#ff5a5a 44% 56%,#3a3f49 56% 100%)';
  colorSwatches.appendChild(noneDot);
  function openSwatches(mode) {
    swatchMode = mode || swatchMode;
    var pred  = swatchMode === 'bg' ? canColorBg : canColorFg;
    var store = swatchMode === 'bg' ? colors : fgColors;
    var ids = selWhere(pred); if (!ids.length) return;
    var noneEl = colorSwatches.querySelector('.cs-dot--none');
    if (noneEl) noneEl.style.display = (swatchMode === 'bg') ? '' : 'none';
    var br = alignBar.getBoundingClientRect();
    var cr = card.getBoundingClientRect();
    var sw = 62, sh = 50;
    var left = parseFloat(alignBar.style.left) || 0;
    var top  = (br.top - cr.top - sh - 2 < 0)
               ? (br.bottom - cr.top + 2)
               : (br.top - cr.top - sh - 2);
    colorSwatches.style.left = Math.max(0, Math.min(left, cr.width - sw)) + 'px';
    colorSwatches.style.top  = top + 'px';
    var cur = aggVal(ids, store, '') || '';
    colorSwatches.querySelectorAll('.cs-dot').forEach(function(d){
      d.classList.toggle('on', d.dataset.c === cur);
    });
    colorSwatches.classList.add('show'); swatchesOpen = true;
  }
  function closeSwatches() { colorSwatches.classList.remove('show'); swatchesOpen = false; }
  function wireColorBtn(btn, mode) {
    btn.addEventListener('mousedown', function(e){ e.preventDefault(); e.stopPropagation(); });
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      (swatchesOpen && swatchMode === mode) ? closeSwatches() : openSwatches(mode);
    });
  }
  wireColorBtn(abFgBtn, 'fg');
  wireColorBtn(abBgBtn, 'bg');
  colorSwatches.addEventListener('mousedown', function(e){ e.stopPropagation(); });
  colorSwatches.addEventListener('click', function(e) {
    e.stopPropagation();
    var dot = e.target.closest('.cs-dot');
    if (!dot) return;
    var color = dot.dataset.c;
    var ids = selWhere(swatchMode === 'bg' ? canColorBg : canColorFg);
    if (!ids.length) return;
    if (swatchMode === 'bg') {
      ids.forEach(function(id){ applyBg(id, color); });
      save(S_COLORS, colors);
      abBgBtn.style.background = color;
    } else {
      ids.forEach(function(id){ applyFg(id, color); });
      save(S_FGCOLORS, fgColors);
      abFgBtn.style.background = color;
    }
    colorSwatches.querySelectorAll('.cs-dot').forEach(function(d){ d.classList.toggle('on', d.dataset.c === color); });
    closeSwatches();
  });


  /* ══════════════════════
     TEXT EDITING
     ══════════════════════ */
  /* Grow a text element's column span so its (nowrap) content is never clipped.
     Measures the span's layout width vs. the element's per-cell layout width and
     extends c2 to the right, clamped to the grid edge. Only ever grows, so it
     never fights a manual resize. */
  function autoFitText(el, allowShrink) {
    if (!el || !el.id) return;
    var pos = layout[el.id];
    var span = el.querySelector('.et');
    if (!pos || !span) return;
    /* Bars are fixed-width gauges: the label is an absolute overlay that fills
       the bar, so scrollWidth === width and the fit below would grow the cell by
       one column on every call (runaway). Only inline-flow text auto-grows. */
    if (el.querySelector('.bar-fill') || span.classList.contains('bar-text')) return;
    var curCols = (pos.c2 - pos.c1) || 1;
    var cellW = el.offsetWidth / curCols;            /* layout px per cell */
    if (!cellW || !isFinite(cellW)) return;
    var needPx  = span.scrollWidth + 6;              /* content + padding/buffer */
    var needCols = Math.max(1, Math.ceil(needPx / cellW));
    var newC2 = Math.min(COLS + 1, pos.c1 + needCols);
    if (allowShrink ? (newC2 !== pos.c2) : (newC2 > pos.c2)) {
      place(el.id, { c1: pos.c1, r1: pos.r1, c2: newC2, r2: pos.r2 });
      if (natural[el.id]) natural[el.id].w = newC2 - pos.c1;
      save(S_LAYOUT, layout);
      save(S_NATURAL, natural);
    }
  }

  function startEdit(span) {
    span.contentEditable = 'true';
    span.style.pointerEvents = 'auto';
    span.focus();
    if (!span.__autofit) {
      span.__autofit = true;
      span.addEventListener('input', function() {
        autoFitText(span.closest('[data-grid]'));
      });
    }
    /* Guarantee a clean exit on blur for EVERY edited span — including dynamically
       created component spans (HUD Label, etc.) that never got an init-time blur
       handler. Enter/Escape (handled centrally) blur the span, which lands here. */
    if (!span.__editexit) {
      span.__editexit = true;
      span.addEventListener('blur', function() {
        span.contentEditable = 'false';
        span.style.pointerEvents = 'none';
        commitEdit(span);
      });
    }
    try {
      const r = document.createRange();
      r.selectNodeContents(span);
      const s = window.getSelection();
      s.removeAllRanges(); s.addRange(r);
    } catch(e) {}
  }

  function commitEdit(span) {
    span.contentEditable = 'false';
    span.style.pointerEvents = 'none';
    const out = {};
    document.querySelectorAll('.et').forEach(function(s) {
      if (s.id) out[s.id] = s.textContent;
    });
    save(S_TEXTS, out);
  }

  /* Refinement bar — 10 equal segments */
  (function() {
    const bar   = document.getElementById('refine-bar');
    if (!bar) return;
    const VALUE = 1;
    const MAX   = 10;
    for (var i = 0; i < MAX; i++) {
      const seg = document.createElement('div');
      seg.className = 'hud-refine-seg' + (i < VALUE ? ' filled' : '');
      bar.appendChild(seg);
    }
  })();


  document.querySelectorAll('.et').forEach(function(span) {
    /* IDs are hardcoded in HTML — no sequential assignment needed */
    if (texts[span.id] !== undefined) span.textContent = texts[span.id];
    span.addEventListener('blur',    function()  { commitEdit(span); });
    span.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); span.blur(); }
    });
  });

  /* ══════════════════════
     ELEMENT WIRING
     ══════════════════════ */
  const TEXT_IDS = new Set(['el-name','el-lv','el-hp-label','el-mp-label','el-hp','el-mp']);

  function wireEl(id) {
    const el = document.getElementById(id);
    if (!el) return;

    /* Delete button */
    const delBtn = el.querySelector('.del-btn');
    if (delBtn) {
      delBtn.addEventListener('mousedown', function(e) { e.stopPropagation(); });
      delBtn.addEventListener('click',     function(e) { e.stopPropagation(); doDelete(id); });
    }

    /* Resize handles (8 directions) */
    el.querySelectorAll('.rz[data-rz]').forEach(function(rz) {
      rz.addEventListener('mousedown', function(e) { startResize(e, el, rz.dataset.rz); });
    });

    /* Drag (mousedown on element body) */
    el.addEventListener('mousedown', function(e) {
      if (e.target.classList.contains('rz'))      return; /* any resize handle */
      if (e.target.classList.contains('del-btn')) return;
      if (e.target.classList.contains('et') && e.target.contentEditable === 'true') return;
      startMove(e, el);
    });

    /* Click: selection + options are already handled on mousedown
       (startMove → syncAlignForSelection). Do NOT toggle here — toggling would
       hide the options on the very same click that showed them (flicker). We only
       keep the options shown for text-like elements so the click is idempotent. */
    el.addEventListener('click', function(e) {
      if (e.target.classList.contains('del-btn')) return;
      e.stopPropagation();
      refreshOptionsBar();
    });

    /* Double-click: enter text edit mode */
    el.addEventListener('dblclick', function(e) {
      e.stopPropagation();
      const span = el.querySelector('.et');
      if (span) startEdit(span); /* Text edit works regardless of grid state */
    });
  }

  /* ══════════════════════
     RESTORE DELETED + INIT
     ══════════════════════ */
  deleted.forEach(function(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
    delete layout[id];
  });

  /* Restore saved aligns */
  Object.keys(aligns).forEach(function(id) {
    if (aligns[id] && aligns[id] !== 'left') applyAlign(id, aligns[id]);
  });
  /* Restore saved valigns */
  Object.keys(valigns).forEach(function(id) {
    var el = document.getElementById(id);
    if (el && valigns[id] && VA_MAP[valigns[id]]) el.style.alignItems = VA_MAP[valigns[id]];
  });

  /* Restore saved sizes */
  Object.keys(sizes).forEach(function(id) {
    var el = document.getElementById(id);
    if (el && sizes[id]) { var span = el.querySelector('.et'); if (span && SIZE_MAP[sizes[id]]) span.style.fontSize = SIZE_MAP[sizes[id]]; }
  });

  /* Restore saved insets / z-order — deferred so every element is placed first */
  requestAnimationFrame(function() {
    Object.keys(pads).forEach(function(id) {
      var el = document.getElementById(id);
      if (el && pads[id]) setInset(el, pads[id]);
    });
    Object.keys(zIndexes).forEach(function(id) {
      var el = document.getElementById(id);
      if (el && typeof zIndexes[id] !== 'undefined') el.style.zIndex = zIndexes[id];
    });
  });

  /* Restore saved colours — background then foreground */
  Object.keys(colors).forEach(function(id) {
    if (document.getElementById(id) && colors[id]) applyBg(id, colors[id]);
  });
  Object.keys(fgColors).forEach(function(id) {
    if (document.getElementById(id) && fgColors[id]) applyFg(id, fgColors[id]);
  });

  /* Place all built-in elements */
  Object.keys(layout).forEach(function(id) {
    place(id, layout[id]);
    wireEl(id);
  });

  /* Fit any saved long text to its content so nothing loads clipped.
     Deferred so layout is computed and custom-text elements exist too. */
  requestAnimationFrame(function() {
    document.querySelectorAll('.hud-card > [data-grid]').forEach(function(el) {
      if (el.querySelector('.et')) autoFitText(el);
    });
  });

  /* ══════════════════════
     CUSTOM TEXT ELEMENTS
     ══════════════════════ */
  var customCounter = 0;
  customs.forEach(function(c) {
    const m = c.id && c.id.match(/^custom-(\d+)$/);
    if (m) customCounter = Math.max(customCounter, parseInt(m[1]) + 1);
  });

  function saveCustoms() {
    const out = customs.map(function(c) {
      const el = document.getElementById(c.id);
      const span = el && el.querySelector('.et');
      return { id: c.id, pos: layout[c.id] || c.pos, text: span ? span.textContent : c.text };
    });
    save(S_CUSTOM, out);
  }

  function makeCustom(id, pos, text) {
    const el = document.createElement('div');
    el.id = id;
    el.setAttribute('data-grid', '');
    el.setAttribute('data-custom', '');
    el.classList.add('ns-text');

    const delBtn = document.createElement('div');
    delBtn.className = 'del-btn';
    delBtn.textContent = '×';
    el.appendChild(delBtn);

    const span = document.createElement('span');
    span.className = 'et';
    span.textContent = text || '';
    if (!span.id) span.id = 'cet-' + id;
    el.appendChild(span);

    /* Restore saved text */
    if (texts[span.id] !== undefined) span.textContent = texts[span.id];

    ['nw','n','ne','e','se','s','sw','w'].forEach(function(d){var h=document.createElement('div');h.className='rz';h.dataset.rz=d;el.appendChild(h);});

    card.insertBefore(el, document.getElementById('ghost'));

    span.addEventListener('blur', function() {
      commitEdit(span);
      if (!span.textContent.trim()) {
        el.remove();
        customs = customs.filter(function(c){ return c.id !== id; });
        delete layout[id];
        save(S_CUSTOM, customs);
        save(S_LAYOUT, layout);
      } else {
        saveCustoms();
      }
    });
    span.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); span.blur(); }
    });

    const resolvedPos = layout[id] || pos || { c1:1, r1:1, c2:2, r2:2 };
    if (!resolvedPos.c1) resolvedPos.c1 = 1;
    if (!resolvedPos.r1) resolvedPos.r1 = 1;
    if (!resolvedPos.c2) resolvedPos.c2 = resolvedPos.c1 + 1;
    if (!resolvedPos.r2) resolvedPos.r2 = resolvedPos.r1 + 1;
    if (!natural[id]) natural[id] = { w: resolvedPos.c2 - resolvedPos.c1, h: resolvedPos.r2 - resolvedPos.r1 };
    TEXT_IDS.add(id);
    place(id, resolvedPos);
    save(S_LAYOUT, layout);          /* persist position immediately */
    save(S_NATURAL, natural);        /* persist intrinsic size → preserves --scale across reload/import */
    wireEl(id);
    if (aligns  && aligns[id])  applyAlign(id, aligns[id]);
    if (valigns && valigns[id]) applyVAlign(id, valigns[id]);
    if (sizes   && sizes[id])   applySize(id, sizes[id]);
    if (pads    && pads[id])    applyPad(id, pads[id]);
    if (zIndexes && typeof zIndexes[id] !== 'undefined') el.style.zIndex = zIndexes[id];
    if (fgColors && fgColors[id]) applyFg(id, fgColors[id]);

    return { el, span };
  }

  /* Restore saved custom elements */
  customs.forEach(function(c) { makeCustom(c.id, c.pos, c.text); });

  /* Double-click detection: native + manual fallback */
  var lastClickTime = 0;
  var lastClickX = 0, lastClickY = 0;
  
  function handleDoubleClick(e) {
    if (!card.contains(e.target)) return;
    if (e.target !== card && e.target.closest('[data-grid]')) return;
    const cell = toCell(e.clientX, e.clientY);
    const id   = 'custom-' + (customCounter++);
    const pos  = { c1:cell.col, r1:cell.row, c2:cell.col+1, r2:cell.row+1 };
    const { span } = makeCustom(id, pos, '');
    customs.push({ id, pos, text:'' });
    saveCustoms();
    startEdit(span);
  }
  
  card.addEventListener('dblclick', handleDoubleClick);
  
  /* Fallback: detect rapid clicks as double-click */
  card.addEventListener('click', function(e) {
    const now = Date.now();
    const dx = e.clientX - lastClickX;
    const dy = e.clientY - lastClickY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    if (now - lastClickTime < 300 && dist < 10) {
      /* This is a double-click */
      handleDoubleClick(e);
    }
    lastClickTime = now;
    lastClickX = e.clientX;
    lastClickY = e.clientY;
  });

  /* ══════════════════════
     ICON ELEMENTS
     ══════════════════════ */
  var S_ICONS    = 'ns-hud-icon-els';
  var savedIcons = load(S_ICONS, []);
  var iconElCtr  = 0;
  savedIcons.forEach(function(c) {
    var m = c.id && c.id.match(/^iel-(\d+)$/);
    if (m) iconElCtr = Math.max(iconElCtr, parseInt(m[1]) + 1);
  });

  function makeIconEl(id, iconName, pos) {
    if (!ICON_SVGS[iconName]) return null;
    var el = document.createElement('div');
    el.id = id;
    el.setAttribute('data-grid', '');
    el.setAttribute('data-icon-el', iconName);

    var delBtn = document.createElement('div');
    delBtn.className = 'del-btn';
    delBtn.textContent = '\u00d7';
    el.appendChild(delBtn);

    var svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('viewBox', '0 0 24 24');
    svgEl.style.cssText = 'display:block;width:16px;height:16px;image-rendering:pixelated;pointer-events:none;';
    svgEl.innerHTML = glyphMarkup(iconName);
    applyIconTilt(svgEl, iconName);
    el.appendChild(svgEl);

    ['nw','n','ne','e','se','s','sw','w'].forEach(function(d){var h=document.createElement('div');h.className='rz';h.dataset.rz=d;el.appendChild(h);});

    card.insertBefore(el, document.getElementById('ghost'));
    var resolvedPos = layout[id] || pos || { c1:1, r1:1, c2:3, r2:3 };
    if (!natural[id]) natural[id] = { w: resolvedPos.c2 - resolvedPos.c1, h: resolvedPos.r2 - resolvedPos.r1 };
    place(id, resolvedPos);
    save(S_LAYOUT, layout);
    save(S_NATURAL, natural);
    wireEl(id);
    return el;
  }

  function saveIconEls() {
    save(S_ICONS, savedIcons.map(function(c) { return { id: c.id, iconName: c.iconName }; }));
  }

  /* Restore persisted icon elements */
  savedIcons.forEach(function(c) {
    if (c.id && c.iconName && ICON_SVGS[c.iconName]) {
      makeIconEl(c.id, c.iconName, null);
    }
  });

  /* ══════════════════════
     EMOJI ELEMENTS
     ══════════════════════ */
  var S_EMOJIS    = 'ns-hud-emoji-els';
  var savedEmojis = load(S_EMOJIS, []);
  var emojiElCtr  = 0;
  savedEmojis.forEach(function(c) {
    var m = c.id && c.id.match(/^eel-(\d+)$/);
    if (m) emojiElCtr = Math.max(emojiElCtr, parseInt(m[1]) + 1);
  });

  function makeEmojiEl(id, emoji, pos) {
    var el = document.createElement('div');
    el.id = id;
    el.setAttribute('data-grid', '');
    el.setAttribute('data-emoji-el', emoji);
    var delBtn = document.createElement('div');
    delBtn.className = 'del-btn';
    delBtn.textContent = '\u00d7';
    el.appendChild(delBtn);
    var span = document.createElement('span');
    span.textContent = emoji;
    span.style.cssText = 'font-size:calc(var(--hud-row) * 1.4 * var(--scale));line-height:1;pointer-events:none;display:block;user-select:none;';
    el.appendChild(span);
    ['nw','n','ne','e','se','s','sw','w'].forEach(function(d){var h=document.createElement('div');h.className='rz';h.dataset.rz=d;el.appendChild(h);});
    card.insertBefore(el, document.getElementById('ghost'));
    var resolvedPos = layout[id] || pos || { c1:1, r1:1, c2:3, r2:3 };
    if (!natural[id]) natural[id] = { w: 2, h: 2 };
    place(id, resolvedPos);
    save(S_LAYOUT, layout);
    save(S_NATURAL, natural);
    wireEl(id);
    return el;
  }

  function saveEmojiEls() {
    save(S_EMOJIS, savedEmojis.map(function(c){ return { id: c.id, emoji: c.emoji }; }));
  }

  /* Restore persisted emoji elements */
  savedEmojis.forEach(function(c) {
    if (c.id && c.emoji) makeEmojiEl(c.id, c.emoji, null);
  });

  /* ══════════════════════
     COMP ELEMENTS
     ══════════════════════ */
  var S_COMPS    = 'ns-hud-comp-els';
  var savedComps = load(S_COMPS, []);
  var compElCtr  = 0;
  savedComps.forEach(function(c) {
    var m = c.id && c.id.match(/^cel-(\d+)$/);
    if (m) compElCtr = Math.max(compElCtr, parseInt(m[1]) + 1);
  });

  function makeCompEl(id, compName, pos) {
    compName = COMP_ALIASES[compName] || compName;
    var build = COMP_BUILD[compName];
    if (!build) return null;
    var el = document.createElement('div');
    el.id = id;
    el.setAttribute('data-grid', '');
    el.setAttribute('data-comp-el', compName);
    var delBtn = document.createElement('div');
    delBtn.className = 'del-btn';
    delBtn.textContent = '\u00d7';
    el.appendChild(delBtn);
    /* Expose resize helper for build functions (e.g. minimap toggle swaps sizes) */
    el._mmResize = function(p){ place(id, p); save(S_LAYOUT, layout); };
    build(el);
    ['nw','n','ne','e','se','s','sw','w'].forEach(function(d){var h=document.createElement('div');h.className='rz';h.dataset.rz=d;el.appendChild(h);});
    card.insertBefore(el, document.getElementById('ghost'));
    var def = COMP_DEFAULT_POS[compName] || {c1:1,r1:1,c2:5,r2:5};
    var resolvedPos = layout[id] || pos || {c1:1,r1:1,c2:1+(def.c2-def.c1),r2:1+(def.r2-def.r1)};
    if (!natural[id]) natural[id] = {w:resolvedPos.c2-resolvedPos.c1, h:resolvedPos.r2-resolvedPos.r1};
    place(id, resolvedPos);
    save(S_LAYOUT, layout);
    save(S_NATURAL, natural);
    wireEl(id);
    if (typeof aligns   !== 'undefined' && aligns[id])   applyAlign(id, aligns[id]);
    if (typeof valigns  !== 'undefined' && valigns[id])  applyVAlign(id, valigns[id]);
    if (typeof sizes    !== 'undefined' && sizes[id])    applySize(id, sizes[id]);
    if (typeof pads     !== 'undefined' && pads[id])     applyPad(id, pads[id]);
    if (typeof zIndexes !== 'undefined' && typeof zIndexes[id] !== 'undefined') el.style.zIndex = zIndexes[id];
    if (typeof colors   !== 'undefined' && colors[id])   applyBg(id, colors[id]);
    if (typeof fgColors !== 'undefined' && fgColors[id]) applyFg(id, fgColors[id]);
    return el;
  }

  function saveCompEls() {
    save(S_COMPS, savedComps.map(function(c){ return {id:c.id, compName:c.compName}; }));
  }

  /* Restore persisted component elements */
  savedComps.forEach(function(c) {
    if (c.id && c.compName && COMP_BUILD[COMP_ALIASES[c.compName] || c.compName]) {
      makeCompEl(c.id, c.compName, null);
    }
  });
  /* Restore persisted stacking order across every element type */
  Object.keys(zorder).forEach(function(id){ var el = document.getElementById(id); if (el) applyStoredZorder(id, el); });

  /* ══════════════════════
     PALETTE WIRING
     ══════════════════════ */
  var palOpen    = false;
  var palGroup   = 'weapons';
  var palEl      = document.getElementById('icon-palette');
  var palIconsEl = document.getElementById('palette-icons');
  var hudTogBtn  = document.getElementById('hud-toggle');
  var palClsBtn  = null;
  var palTabs    = [];
  (function buildPalTabs(){
    var tabsEl = document.getElementById('palette-tabs');
    if (!tabsEl) return;
    var defs = [{g:'ui',l:'WIDGETS'}]
      .concat(Object.keys(ICON_GROUPS).map(function(k){ return {g:k, l:(GROUP_LABELS[k] || k.toUpperCase())}; }));
    defs.forEach(function(d){
      var b = document.createElement('div');
      b.className = 'ns-hud-tab';
      b.dataset.group = d.g;
      b.setAttribute('data-tip', GROUP_TIPS[d.g] || d.l);
      /* Prefix glyph: each category leads with its first object's icon */
      var glyph = document.createElement('span');
      glyph.className = 'tab-glyph';
      if (d.g === 'emojis') {
        glyph.textContent = (EMOJI_LIST[0] || '');
      } else if (ICON_GROUPS[d.g] && ICON_GROUPS[d.g].length) {
        var first = ICON_GROUPS[d.g][0];
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.innerHTML = glyphMarkup(first);
        applyIconTilt(svg, first);
        glyph.appendChild(svg);
      } else if (COMP_GROUPS[d.g] && COMP_GROUPS[d.g].length) {
        var c = COMP_GROUPS[d.g][0];
        var csvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        csvg.setAttribute('viewBox', '0 0 24 24');
        csvg.innerHTML = tok24(COMP_SVGS[c] || '');
        glyph.appendChild(csvg);
      }
      var label = document.createElement('span');
      label.className = 'tab-label';
      label.textContent = d.l;
      if (glyph.childNodes.length || glyph.textContent) b.appendChild(glyph);
      b.appendChild(label);
      tabsEl.appendChild(b);
      palTabs.push(b);
    });
  })();

  function renderPalette(group) {
    palIconsEl.innerHTML = '';
    var isComp  = !!COMP_GROUPS[group];
    var isEmoji = !!EMOJI_GROUPS[group];
    var names   = isComp ? COMP_GROUPS[group] : isEmoji ? EMOJI_GROUPS[group] : (ICON_GROUPS[group] || []);
    names.forEach(function(name) {
      var btn = document.createElement('div');
      btn.className = 'ns-hud-slot';
      btn.setAttribute('data-tip', isComp ? (COMP_LABELS[name] || name)
        : isEmoji ? name
        : (name.charAt(0) === '/' ? (EMOTE_TIPS[name] || name)
          : name.replace(/^attack-/, '').replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); })));
      if (isEmoji) {
        btn.style.cssText += 'font-size:13px;line-height:1;';
        btn.textContent = name;
      } else {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.innerHTML = isComp ? tok24(COMP_SVGS[name] || '') : glyphMarkup(name);
        if (!isComp) applyIconTilt(svg, name);
        btn.appendChild(svg);
      }
      btn.addEventListener('mousedown', function(e) {
        e.preventDefault(); e.stopPropagation();
        palGhostEl = document.createElement('div');
        palGhostEl.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border:1px dashed rgba(230,219,116,0.55);opacity:0.75;';
        if (isEmoji) {
          var eg = document.createElement('span');
          eg.textContent = name;
          eg.style.cssText = 'font-size:13px;line-height:1;';
          palGhostEl.appendChild(eg);
        } else {
          var sg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          sg.setAttribute('viewBox', '0 0 24 24');
          sg.style.cssText = 'width:14px;height:14px;image-rendering:pixelated;display:block;';
          sg.innerHTML = isComp ? tok24(COMP_SVGS[name] || '') : glyphMarkup(name);
          if (!isComp) applyIconTilt(sg, name);
          palGhostEl.appendChild(sg);
        }
        palGhostEl.style.left = (e.clientX - 11) + 'px';
        palGhostEl.style.top  = (e.clientY - 11) + 'px';
        document.body.appendChild(palGhostEl);
        palDrag = { name: name, isComp: isComp, isEmoji: isEmoji, moved: false, sx: e.clientX, sy: e.clientY };
      });
      palIconsEl.appendChild(btn);
    });
  }

  function setPalGroup(grp) {
    palGroup = grp;
    palTabs.forEach(function(b) { b.classList.toggle('is-active', b.dataset.group === grp); });
    renderPalette(grp);
  }

  function openPal() {
    palOpen = true;
    if (palEl) palEl.classList.add('open');
    if (hudTogBtn) hudTogBtn.classList.add('is-on');
    if (palTabs.length > 0) setPalGroup(palTabs[0].dataset.group);
  }
  function closePal() {
    palOpen = false;
    if (palEl) palEl.classList.remove('open');
    if (hudTogBtn) hudTogBtn.classList.remove('is-on');
  }

  if (palClsBtn) palClsBtn.addEventListener('click', function(e) { e.stopPropagation(); closePal(); });
  if (palTabs.length) setPalGroup('ui'); /* palette always visible in side panel */

  palTabs.forEach(function(b) {
    b.addEventListener('click', function(e) { e.stopPropagation(); setPalGroup(b.dataset.group); });
  });
  if (palEl) palEl.addEventListener('click', function(e) { e.stopPropagation(); });

  var palDrag    = null;
  var palGhostEl = null;
  var textDrag   = null;

  /* TEXT tool drag: click and drag on card to create text */
  const textToolBtn = document.getElementById('text-tool');
  if (textToolBtn) {
    textToolBtn.addEventListener('mousedown', function(e) {
      e.preventDefault(); e.stopPropagation();
      textDrag = { active: true, moved: false };
      
      /* Create ghost preview */
      palGhostEl = document.createElement('div');
      palGhostEl.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:22px;height:22px;display:flex;align-items:center;justify-content:center;border:1px dashed rgba(230,219,116,0.55);opacity:0.75;color:var(--hud-gold);font-family:var(--hud-font);font-size:6px;line-height:1;';
      palGhostEl.textContent = 'A';
      palGhostEl.style.left = (e.clientX - 11) + 'px';
      palGhostEl.style.top  = (e.clientY - 11) + 'px';
      document.body.appendChild(palGhostEl);
    });
  }

  document.addEventListener('mousemove', function(e) {
    if (!textDrag) return;
    textDrag.moved = true;
    palGhostEl.style.left = (e.clientX - 11) + 'px';
    palGhostEl.style.top  = (e.clientY - 11) + 'px';
    var cr   = card.getBoundingClientRect();
    var over = e.clientX >= cr.left && e.clientX <= cr.right &&
               e.clientY >= cr.top  && e.clientY <= cr.bottom;
    if (over) {
      palGhostEl.style.opacity = '0'; /* hide ghost when inside card — grid snap is shown */
      var cell = toCell(e.clientX, e.clientY);
      ghost.classList.add('active');
      ghost.style.gridColumn = cell.col + '/' + Math.min(COLS + 1, cell.col + 1);
      ghost.style.gridRow    = cell.row + '/' + Math.min(ROWS + 1, cell.row + 1);
    } else {
      ghost.classList.remove('active');
      palGhostEl.style.opacity = '0.75';
    }
  });

  document.addEventListener('mousemove', function(e) {
    if (!palDrag) return;
    /* Only count as a drag once the pointer clears a small threshold — otherwise
       the sub-pixel jitter of an ordinary click sets moved=true and the element
       (released over the palette, not the card) would be silently cancelled. */
    if (Math.abs(e.clientX - palDrag.sx) > 4 || Math.abs(e.clientY - palDrag.sy) > 4) palDrag.moved = true;
    palGhostEl.style.left = (e.clientX - 11) + 'px';
    palGhostEl.style.top  = (e.clientY - 11) + 'px';
    var cr   = card.getBoundingClientRect();
    var over = e.clientX >= cr.left && e.clientX <= cr.right &&
               e.clientY >= cr.top  && e.clientY <= cr.bottom;
    if (over) {
      palGhostEl.style.opacity = '0'; /* hide ghost when inside card — grid snap is shown */
      var cell = toCell(e.clientX, e.clientY);
      var ghostW = palDrag.isComp ? ((COMP_DEFAULT_POS[palDrag.name] || {c1:1,r1:1,c2:5,r2:5}).c2 - (COMP_DEFAULT_POS[palDrag.name] || {c1:1,r1:1,c2:5,r2:5}).c1) : 1;
      var ghostH = palDrag.isComp ? ((COMP_DEFAULT_POS[palDrag.name] || {c1:1,r1:1,c2:5,r2:5}).r2 - (COMP_DEFAULT_POS[palDrag.name] || {c1:1,r1:1,c2:5,r2:5}).r1) : 1;
      ghost.classList.add('active');
      ghost.style.gridColumn = cell.col + '/' + Math.min(COLS + 1, cell.col + ghostW);
      ghost.style.gridRow    = cell.row + '/' + Math.min(ROWS + 1, cell.row + ghostH);
    } else {
      palGhostEl.style.opacity = '0.75';
      ghost.classList.remove('active');
    }
  });

  document.addEventListener('mouseup', function(e) {
    if (!palDrag && !textDrag) return;
    
    if (textDrag) {
      /* TEXT tool drop */
      if (palGhostEl) { palGhostEl.remove(); palGhostEl = null; }
      ghost.classList.remove('active');
      
      var cr   = card.getBoundingClientRect();
      var over = e.clientX >= cr.left && e.clientX <= cr.right &&
                 e.clientY >= cr.top  && e.clientY <= cr.bottom;
      
      if (textDrag.moved && over) {
        /* Dropped on card — create text at cell */
        var cell = toCell(e.clientX, e.clientY);
        var id   = 'custom-' + (customCounter++);
        var pos  = { c1: cell.col, r1: cell.row, c2: cell.col + 1, r2: cell.row + 1 };
        var { el: tEl, span } = makeCustom(id, pos, '');
        customs.push({ id, pos, text: '' });
        saveCustoms();
        if (tEl) bumpZ(id, tEl);
        startEdit(span);
      }
      textDrag = null;
      return;
    }
    
    /* Original palette drag handler */
    if (!palDrag) return;
    var name    = palDrag.name;
    var isComp  = palDrag.isComp;
    var isEmoji = palDrag.isEmoji;
    var moved   = palDrag.moved;
    palDrag = null;
    if (palGhostEl) { palGhostEl.remove(); palGhostEl = null; }
    ghost.classList.remove('active');

    var cr   = card.getBoundingClientRect();
    var over = e.clientX >= cr.left && e.clientX <= cr.right &&
               e.clientY >= cr.top  && e.clientY <= cr.bottom;
    var def  = isComp ? (COMP_DEFAULT_POS[name] || {c1:1,r1:1,c2:5,r2:5}) : null;
    var defW = def ? (def.c2 - def.c1) : 1;
    var defH = def ? (def.r2 - def.r1) : 1;
    var pos;
    if (moved && over) {
      /* Dropped on card — place at snapped cell */
      var cell = toCell(e.clientX, e.clientY);
      pos = { c1: cell.col, r1: cell.row,
              c2: Math.min(COLS + 1, cell.col + defW),
              r2: Math.min(ROWS + 1, cell.row + defH) };
    } else if (!moved) {
      /* Quick click — place at card center */
      pos = { c1: 4, r1: 4, c2: 4 + defW, r2: 4 + defH };
    } else {
      return; /* dragged but dropped outside card — cancel */
    }
    var id;
    if (isComp) {
      id = 'cel-' + (compElCtr++);
      savedComps.push({ id: id, compName: name });
      makeCompEl(id, name, pos);
      saveCompEls();
    } else if (isEmoji) {
      id = 'eel-' + (emojiElCtr++);
      savedEmojis.push({ id: id, emoji: name });
      makeEmojiEl(id, name, pos);
      saveEmojiEls();
    } else {
      id = 'iel-' + (iconElCtr++);
      savedIcons.push({ id: id, iconName: name });
      makeIconEl(id, name, pos);
      saveIconEls();
    }
    var newEl = document.getElementById(id);
    if (newEl) { selectOnly(id); bumpZ(id, newEl); recordAdd([id]); }
  });

  /* ══════════════════════
     MARQUEE (rubber-band) SELECT + COPY / PASTE
     ══════════════════════ */
  function pointInCard(x, y) {
    var r = card.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  var marquee = null, marqueeBox = null;

  /* Press on empty canvas: start a rubber-band. A plain press (no drag) just
     deselects; dragging selects every element the rectangle touches. */
  document.addEventListener('mousedown', function(e) {
    if (e.button !== 0) return;
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('[data-grid]')) return;               /* pressed a placed element */
    if (t.closest('#align-bar') || t.closest('#color-swatches') || t.closest('#side-panel')) return;
    if (!pointInCard(e.clientX, e.clientY)) { deselect(); hideAlign(); return; }
    marquee = { x0: e.clientX, y0: e.clientY, additive: (e.shiftKey || e.metaKey || e.ctrlKey), moved: false };
    if (!marquee.additive) { deselect(); hideAlign(); }
  });

  document.addEventListener('mousemove', function(e) {
    if (!marquee) return;
    var dx = e.clientX - marquee.x0, dy = e.clientY - marquee.y0;
    if (!marquee.moved && (Math.abs(dx) + Math.abs(dy)) < 4) return;
    marquee.moved = true;
    if (!marqueeBox) {
      marqueeBox = document.createElement('div');
      marqueeBox.style.cssText = 'position:fixed;z-index:9998;border:1px solid rgba(230,219,116,0.9);background:rgba(230,219,116,0.12);pointer-events:none;';
      document.body.appendChild(marqueeBox);
    }
    marqueeBox.style.left   = Math.min(e.clientX, marquee.x0) + 'px';
    marqueeBox.style.top    = Math.min(e.clientY, marquee.y0) + 'px';
    marqueeBox.style.width  = Math.abs(dx) + 'px';
    marqueeBox.style.height = Math.abs(dy) + 'px';
  });

  document.addEventListener('mouseup', function(e) {
    if (!marquee) return;
    var m = marquee; marquee = null;
    if (marqueeBox) { marqueeBox.remove(); marqueeBox = null; }
    if (!m.moved) return;                                /* plain click — already deselected */
    var L = Math.min(e.clientX, m.x0), R = Math.max(e.clientX, m.x0);
    var T = Math.min(e.clientY, m.y0), B = Math.max(e.clientY, m.y0);
    if (!m.additive) deselect();
    document.querySelectorAll('.hud-card > [data-grid]').forEach(function(el) {
      if (el.id === 'ghost') return;
      var r = el.getBoundingClientRect();
      var hit = !(r.right < L || r.left > R || r.bottom < T || r.top > B);
      if (hit) addSel(el.id);
    });
    syncAlignForSelection();
  });

  /* ── Copy / paste the current selection (in-app clipboard) ── */
  var clipboard = [];

  function describeEl(id) {
    var el = document.getElementById(id); if (!el) return null;
    var pos = layout[id]; if (!pos) return null;
    /* Capture BOTH the grid span (pos) and the element's intrinsic cell size
       (nat) so a paste replicates the original 1:1 — same number of cells and
       same content scale — instead of being re-fit to its content. */
    var base = { pos: { c1: pos.c1, r1: pos.r1, c2: pos.c2, r2: pos.r2 },
                 nat: natural[id] ? { w: natural[id].w, h: natural[id].h } : undefined };
    if (el.hasAttribute('data-comp-el')) {
      var cspan = el.querySelector('.et');
      return Object.assign(base, { kind: 'comp',  name: el.getAttribute('data-comp-el'),
        bg: colors[id], fg: fgColors[id], size: sizes[id], pad: pads[id], z: zIndexes[id], align: aligns[id], valign: valigns[id],
        text: cspan ? cspan.textContent : undefined });
    }
    if (el.hasAttribute('data-icon-el'))  return Object.assign(base, { kind: 'icon',  name: el.getAttribute('data-icon-el') });
    if (el.hasAttribute('data-emoji-el')) return Object.assign(base, { kind: 'emoji', name: el.getAttribute('data-emoji-el') });
    var span = el.querySelector('.et');
    if (span) return Object.assign(base, { kind: 'text', text: span.textContent,
      fg: fgColors[id], size: sizes[id], pad: pads[id], z: zIndexes[id], align: aligns[id], valign: valigns[id] });
    return null;
  }

  function copySelection() {
    if (!selSet.length) return;
    clipboard = selSet.map(describeEl).filter(Boolean);
  }

  function clampPos(p) {
    var w = p.c2 - p.c1, h = p.r2 - p.r1;
    var c1 = Math.max(1, Math.min(p.c1, COLS + 1 - w));
    var r1 = Math.max(1, Math.min(p.r1, ROWS + 1 - h));
    return { c1: c1, r1: r1, c2: c1 + w, r2: r1 + h };
  }

  function createFromDesc(d, pos) {
    var id = null;
    if (d.kind === 'comp' && COMP_BUILD[d.name]) {
      id = 'cel-' + (compElCtr++); savedComps.push({ id: id, compName: d.name }); makeCompEl(id, d.name, pos); saveCompEls();
      var nel = document.getElementById(id);
      if (nel && d.text !== undefined) {
        var ns = nel.querySelector('.et');
        if (ns) {
          ns.textContent = d.text;
          if (ns.id) { try { var t = JSON.parse(localStorage.getItem('ns-hud-texts') || '{}'); t[ns.id] = d.text; localStorage.setItem('ns-hud-texts', JSON.stringify(t)); } catch(e) {} }
        }
      }
      if (d.bg) { applyBg(id, d.bg); save(S_COLORS, colors); }
      if (d.fg) { applyFg(id, d.fg); save(S_FGCOLORS, fgColors); }
      if (d.size)   applySize(id, d.size);
      if (d.pad)    applyPad(id, d.pad);
      if (typeof d.z !== 'undefined') applyZ(id, d.z);
      if (d.align)  applyAlign(id, d.align);
      if (d.valign) applyVAlign(id, d.valign);
    } else if (d.kind === 'icon' && ICON_SVGS[d.name]) {
      id = 'iel-' + (iconElCtr++); savedIcons.push({ id: id, iconName: d.name }); makeIconEl(id, d.name, pos); saveIconEls();
    } else if (d.kind === 'emoji') {
      id = 'eel-' + (emojiElCtr++); savedEmojis.push({ id: id, emoji: d.name }); makeEmojiEl(id, d.name, pos); saveEmojiEls();
    } else if (d.kind === 'text') {
      id = 'custom-' + (customCounter++);
      makeCustom(id, pos, d.text || '');
      customs.push({ id: id, pos: pos, text: d.text || '' });
      saveCustoms();
      if (d.fg) { applyFg(id, d.fg); save(S_FGCOLORS, fgColors); }
      if (d.size)   applySize(id, d.size);
      if (d.pad)    applyPad(id, d.pad);
      if (typeof d.z !== 'undefined') applyZ(id, d.z);
      if (d.align)  applyAlign(id, d.align);
      if (d.valign) applyVAlign(id, d.valign);
    }
    return id;
  }

  function pasteClipboard() {
    if (!clipboard.length) return;
    deselect();
    var newIds = [], cascade = [];
    clipboard.forEach(function(d) {
      var np = clampPos({ c1: d.pos.c1 + 1, r1: d.pos.r1 + 1, c2: d.pos.c2 + 1, r2: d.pos.r2 + 1 });
      var id = createFromDesc(d, np);
      if (id) {
        /* Replicate the source 1:1. createFromDesc may run applySize → autoFitText,
           which shrinks a text/comp element to hug its content; re-assert the
           captured intrinsic size + exact grid span as the LAST step so the paste
           occupies the same cells (and renders at the same scale) as the original. */
        if (d.nat) natural[id] = { w: d.nat.w, h: d.nat.h };
        place(id, np);
        save(S_LAYOUT, layout);
        save(S_NATURAL, natural);
        newIds.push(id);
        cascade.push(Object.assign({}, d, { pos: np }));
      }
    });
    newIds.forEach(addSel);
    syncAlignForSelection();
    recordAdd(newIds);
    clipboard = cascade;                                 /* repeated paste cascades */
  }

})();



/* ══════════════════════════════════════════
   TOOLBAR & PALETTE DRAG & RESIZE
   ══════════════════════════════════════════ */
(function() {
  const toolbarRow = document.getElementById('toolbar-row');
  const iconPalette = null; // Palette removed from UI
  
  let draggedEl = null;
  let resizingEl = null;
  let offset = { x: 0, y: 0 };
  let startSize = { w: 0, h: 0 };
  let startPos = { x: 0, y: 0 };
  
  function makeDraggable(el, header) {
    header.style.cursor = 'grab';
    header.addEventListener('mousedown', function(e) {
      if (resizingEl) return; // Don't drag while resizing
      draggedEl = el;
      const rect = el.getBoundingClientRect();
      offset.x = e.clientX - rect.left;
      offset.y = e.clientY - rect.top;
      el.style.position = 'fixed';
      el.style.zIndex = '10000';
      header.style.cursor = 'grabbing';
      e.preventDefault();
    });
  }
  
  function addResizeHandle(el) {
    const handle = document.createElement('div');
    handle.style.cssText = `
      position: absolute;
      bottom: 0;
      right: 0;
      width: 16px;
      height: 16px;
      background: linear-gradient(135deg, transparent 50%, #999 50%);
      cursor: se-resize;
      z-index: 10001;
    `;
    el.style.position = 'fixed';
    el.appendChild(handle);
    
    handle.addEventListener('mousedown', function(e) {
      resizingEl = el;
      startSize = { w: el.offsetWidth, h: el.offsetHeight };
      startPos = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    });
  }
  
  document.addEventListener('mousemove', function(e) {
    if (!draggedEl && !resizingEl) return;
    
    if (draggedEl) {
      draggedEl.style.left = (e.clientX - offset.x) + 'px';
      draggedEl.style.top = (e.clientY - offset.y) + 'px';
    }
    
    if (resizingEl) {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      resizingEl.style.width = Math.max(200, startSize.w + deltaX) + 'px';
      resizingEl.style.height = Math.max(100, startSize.h + deltaY) + 'px';
    }
  });
  
  document.addEventListener('mouseup', function() {
    if (draggedEl) {
      const header = draggedEl.querySelector('[data-drag-header]') || draggedEl.firstElementChild;
      if (header) header.style.cursor = 'grab';
      draggedEl = null;
    }
    resizingEl = null;
  });
  
  // Make toolbar draggable by the controls
  if (toolbarRow) {
    const hudControls = toolbarRow.querySelector('#hud-controls');
    if (hudControls) makeDraggable(toolbarRow, hudControls);
    addResizeHandle(toolbarRow);
  }
  
  // Make palette draggable by the header
  if (iconPalette) {
    const paletteHead = iconPalette.querySelector('#palette-head');
    if (paletteHead) makeDraggable(iconPalette, paletteHead);
    addResizeHandle(iconPalette);
  }
})();



(function() {
  /* Polished tooltip for UI chrome — replaces native title= popups.
     Anchors below the hovered [data-tip] element, with a caret + fade. */
  var tip = document.getElementById('ui-tooltip');
  if (!tip) return;
  var current = null, hideTimer = null;

  function place(el) {
    var text = el.getAttribute('data-tip');
    if (!text) return;
    clearTimeout(hideTimer);
    current = el;
    tip.textContent = text;
    tip.style.display = 'block';
    tip.style.left = '0px'; tip.style.top = '0px';   // reset to measure
    var r = el.getBoundingClientRect();
    var t = tip.getBoundingClientRect();
    var pad = 6;
    var cx = r.left + r.width / 2;
    var left = cx - t.width / 2;
    left = Math.max(pad, Math.min(left, window.innerWidth - t.width - pad));
    /* prefer ABOVE the element; flip below only when there's no room */
    var above = true;
    var top = r.top - t.height - 7;
    if (top < pad) { above = false; top = r.bottom + 7; }
    tip.classList.toggle('below', !above);
    tip.style.left = Math.round(left) + 'px';
    tip.style.top  = Math.round(top) + 'px';
    tip.style.setProperty('--arrow-x', Math.round(cx - left) + 'px');
    requestAnimationFrame(function() { tip.classList.add('show'); });
  }
  function hide() {
    current = null;
    tip.classList.remove('show');
    hideTimer = setTimeout(function() { if (!current) tip.style.display = 'none'; }, 130);
  }
  document.addEventListener('mouseover', function(e) {
    var el = e.target.closest('[data-tip]');
    if (el && el !== current) place(el);
  });
  document.addEventListener('mouseout', function(e) {
    var el = e.target.closest('[data-tip]');
    if (el && !e.relatedTarget || (el && !el.contains(e.relatedTarget))) hide();
  });
  /* hide on click/scroll so it never lingers */
  document.addEventListener('click', hide, true);
  window.addEventListener('scroll', hide, true);
})();



(function() {
  var tip   = document.getElementById('hud-tooltip');
  var stage = document.getElementById('stage');
  var EL_NAMES = {
    'el-avatar':'Avatar','el-hp':'HP','el-mp':'MP',
    'el-hp-label':'HP Label','el-mp-label':'MP Label','el-lv':'Level',
    'el-sword':'Weapon','el-human':'Race','el-neutral':'Element',
    'el-medium':'Size','el-bxp':'BXP','el-txp':'TXP',
    'el-wxp':'WXP','el-ref':'Ref'
  };
  function getName(el) {
    if (!el) return null;
    var iconName = el.getAttribute('data-icon-el');
    if (iconName) return iconName.replace('attack-','').replace(/-/g,' ');
    var compName = el.getAttribute('data-comp-el');
    if (compName) return (window.COMP_LABELS && COMP_LABELS[compName]) || compName;
    if (EL_NAMES[el.id]) return EL_NAMES[el.id];
    if (el.id && /^custom-/.test(el.id)) return 'Text';
    if (el.id && /^cel-/.test(el.id))    return 'Component';
    if (el.id && /^eel-/.test(el.id))    return 'Emoji';
    return null;
  }
  stage.addEventListener('mouseover', function(e) {
    var el = e.target.closest('[data-grid]');
    var name = el ? getName(el) : null;
    if (name) { tip.textContent = name; tip.style.display = 'block'; }
    else       { tip.style.display = 'none'; }
  });
  stage.addEventListener('mousemove', function(e) {
    if (tip.style.display === 'block') {
      tip.style.left = (e.clientX + 12) + 'px';
      tip.style.top  = (e.clientY - 22) + 'px';
    }
  });
  stage.addEventListener('mouseleave', function() { tip.style.display = 'none'; });
})();
