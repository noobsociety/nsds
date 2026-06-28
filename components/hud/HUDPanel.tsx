import type { HTMLAttributes, ReactElement } from 'react';

import type { NSStyle } from '../shared/styles.js';

const VARIANTS = {
  dark: { background: 'rgba(12,16,22,0.72)', border: '1px solid rgba(255,255,255,0.10)' },
  light: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)' },
  clear: { background: 'transparent', border: '1px solid rgba(255,255,255,0.08)' },
} as const;

export interface HUDPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  /** Visual treatment of the panel surface. */
  variant?: keyof typeof VARIANTS;
  /** Corner radius in px. */
  radius?: number;
  style?: NSStyle;
}

export function HUDPanel({
  variant = 'dark',
  radius = 0,
  style,
  children,
  ...props
}: HUDPanelProps): ReactElement {
  const v = VARIANTS[variant] ?? VARIANTS.dark;

  return (
    <div
      {...props}
      style={{
        position: 'relative',
        background: v.background,
        border: v.border,
        borderRadius: radius,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
