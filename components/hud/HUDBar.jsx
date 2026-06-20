import React from 'react';

const FONT = 'var(--ns-font-pixel, "Press Start 2P", monospace)';

export function HUDBar({
  value = 40,
  max = 40,
  fillColor = 'var(--hud-hp-fill, #4caf73)',
  trackColor = 'var(--hud-track, rgba(255, 255, 255, 0.10))',
  height = 14,
  style,
}) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;

  return (
    <div
      style={{
        position: 'relative',
        background: trackColor,
        height,
        overflow: 'hidden',
        fontFamily: FONT,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: `${pct}%`,
          background: fillColor,
          transition: 'width .35s ease-out',
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 4,
          fontSize: 4,
          color: '#fff',
          pointerEvents: 'none',
        }}
      >
        {value} / {max}
      </span>
    </div>
  );
}
