export const cx = (...parts) => parts.filter(Boolean).join(' ');

export function mergeStyles(base, override) {
  return override ? { ...base, ...override } : base;
}

export const NS = {
  gold: 'var(--ns-gold)',
  pink: 'var(--ns-pink)',
  purple: 'var(--ns-purple)',
  cyan: 'var(--ns-cyan)',
  green: 'var(--ns-green)',
  orange: 'var(--ns-orange)',
  later: 'var(--ns-ink-faint)',
};

export const questStatus = {
  done: { className: 'ns-quest-card--done', label: 'HOLDS', icon: '✓' },
  active: { className: 'ns-quest-card--active', label: 'BUILDING', icon: '▶' },
  planned: { className: 'ns-quest-card--planned', label: 'PLANNED', icon: '◌' },
  locked: { className: 'ns-quest-card--locked', label: 'LATER', icon: '✦' },
};
