import type * as React from 'react';

export interface HUDLabelProps {
  /** Display text */
  text?: string;
  /** Text alignment within the container */
  align?: 'left' | 'center' | 'right';
  /** Uniform scale multiplier applied to fontSize */
  scale?: number;
  /** Text color */
  color?: string;
  /** Base font size in px, before scale */
  fontSize?: number;
  style?: React.CSSProperties;
}

export declare function HUDLabel(props: HUDLabelProps): React.ReactElement;
