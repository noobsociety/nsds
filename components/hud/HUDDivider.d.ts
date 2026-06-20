import type * as React from 'react';

export interface HUDDividerProps {
  /** Vertical by default; use horizontal for a 1px row rule. */
  direction?: 'vertical' | 'horizontal';
  /** Line color */
  color?: string;
  style?: React.CSSProperties;
}

export declare function HUDDivider(props: HUDDividerProps): React.ReactElement;
