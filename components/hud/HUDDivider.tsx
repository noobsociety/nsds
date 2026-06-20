import type { HTMLAttributes, ReactElement } from 'react';

import type { NSStyle } from '../shared/styles.js';

export interface HUDDividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  /** Vertical by default; use horizontal for a 1px row rule. */
  direction?: 'vertical' | 'horizontal';
  /** Line color. */
  color?: string;
  style?: NSStyle;
}

export function HUDDivider({
  direction = 'vertical',
  color = 'var(--ns-line)',
  style,
  role = 'separator',
  ...props
}: HUDDividerProps): ReactElement {
  const isVertical = direction === 'vertical';

  return (
    <div
      {...props}
      role={role}
      aria-orientation={direction}
      style={{
        width: isVertical ? '1px' : '100%',
        height: isVertical ? '100%' : '1px',
        background: color,
        flexShrink: 0,
        alignSelf: 'stretch',
        ...style,
      }}
    />
  );
}
