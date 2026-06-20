import type { CSSProperties } from 'react';

export type NSStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;
export type ClassValue = string | false | null | undefined;

export const cx = (...parts: ClassValue[]) => parts.filter(Boolean).join(' ');

export function mergeStyles(base: NSStyle, override?: NSStyle): NSStyle {
  return override ? { ...base, ...override } : base;
}

/** Token shortcuts for inline style props — lowercase to avoid DS compiler treating this as a component */
export const nsTokens = {
  gold:   'var(--ns-gold)',
  pink:   'var(--ns-pink)',
  purple: 'var(--ns-purple)',
  cyan:   'var(--ns-cyan)',
  green:  'var(--ns-green)',
  orange: 'var(--ns-orange)',
  later:  'var(--ns-ink-faint)',
} as const;

/** @deprecated Use nsTokens */
export const NS = nsTokens;

export const questStatus = {
  done:    { className: 'ns-quest-card--done',    label: 'HOLDS',    icon: '✓' },
  active:  { className: 'ns-quest-card--active',  label: 'BUILDING', icon: '▶' },
  planned: { className: 'ns-quest-card--planned', label: 'PLANNED',  icon: '◌' },
  locked:  { className: 'ns-quest-card--locked',  label: 'LATER',    icon: '✦' },
} as const;
