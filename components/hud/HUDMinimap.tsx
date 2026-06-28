import type { HTMLAttributes, ReactElement } from 'react';

import type { NSStyle } from '../shared/styles.js';

export interface HUDMinimapProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'style'
> {
  /** Map background color. */
  mapColor?: string;
  /** Player marker color. */
  markerColor?: string;
  /** Accent color for paths / points of interest. */
  accentColor?: string;
  /** Whether to show a border frame. */
  framed?: boolean;
  style?: NSStyle;
}

export function HUDMinimap({
  mapColor = 'var(--hud-minimap-bg)',
  markerColor = 'var(--hud-minimap-player)',
  accentColor = 'var(--hud-minimap-path, var(--hud-gold))',
  framed = true,
  style,
  ...props
}: HUDMinimapProps): ReactElement {
  return (
    <div
      {...props}
      style={{
        position: 'relative',
        background: mapColor,
        border: framed ? `1px solid ${accentColor}` : 'none',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Static decorative map path — replace with live data via children */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 60 40"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* terrain outline */}
        <polyline
          points="4,20 12,14 22,18 30,10 42,16 52,12"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.8"
          opacity="0.5"
        />
        {/* path */}
        <polyline
          points="10,30 18,24 28,26 38,20 48,22"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.5"
          opacity="0.35"
          strokeDasharray="2 2"
        />
        {/* point of interest */}
        <rect x="28" y="8" width="3" height="3" fill={accentColor} opacity="0.6" />
        {/* player marker */}
        <polygon points="30,22 28,26 30,25 32,26" fill={markerColor} />
      </svg>
    </div>
  );
}
