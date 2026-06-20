import type * as React from 'react';

export interface HUDBarProps {
  /** Current stat value */
  value?: number;
  /** Maximum stat value */
  max?: number;
  /** Bar fill color */
  fillColor?: string;
  /** Bar track color */
  trackColor?: string;
  /** Bar height in px */
  height?: number;
  style?: React.CSSProperties;
}

export declare function HUDBar(props: HUDBarProps): React.ReactElement;
