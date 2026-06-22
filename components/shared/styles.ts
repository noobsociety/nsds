import type { CSSProperties } from 'react';

export type NSStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;
export type ClassValue = string | false | null | undefined;

export const cx = (...parts: ClassValue[]) => parts.filter(Boolean).join(' ');

export function mergeStyles(base: NSStyle, override?: NSStyle): NSStyle {
  return override ? { ...base, ...override } : base;
}

export { NS, nsTokens, questStatus } from './constants.js';
