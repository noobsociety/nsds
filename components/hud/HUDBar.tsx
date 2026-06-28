import type { HTMLAttributes, ReactElement } from 'react';

import type { NSStyle } from '../shared/styles.js';

const FONT = 'var(--ns-font-pixel, "Press Start 2P", monospace)';

/** Built-in bar kinds. Each maps to its own fill + label-colour tokens. */
export type HUDBarVariant = 'hp' | 'mp' | 'xp' | 'stamina';

interface VariantSpec {
  fill: string;
  labelColor: string;
  segmented: boolean;
}

const VARIANTS: Record<HUDBarVariant, VariantSpec> = {
  hp: {
    fill: 'var(--hud-hp-fill, #4caf73)',
    labelColor: 'var(--hud-hp-label, #88ee88)',
    segmented: false,
  },
  mp: {
    fill: 'var(--hud-mp-fill, #5b9bd5)',
    labelColor: 'var(--hud-mp-label, #8888ee)',
    segmented: false,
  },
  xp: {
    fill: 'var(--hud-xp-base, #4488cc)',
    labelColor: 'var(--hud-xp-base-label, #88aaee)',
    segmented: false,
  },
  stamina: {
    fill: 'var(--hud-stamina-fill, #5dcaa5)',
    labelColor: 'var(--hud-stamina-label, #8fe6cc)',
    segmented: true,
  },
};

export interface HUDBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  /** Built-in bar kind — sets fill colour, label colour and (for stamina) segmentation. */
  variant?: HUDBarVariant;
  /** Current stat value. */
  value?: number;
  /** Maximum stat value. */
  max?: number;
  /**
   * Label text. Defaults to `"{value} / {max}"`.
   * Pass a string to override, or `false`/`""` to hide the label entirely.
   */
  label?: string | false;
  /** Render the fill as discrete notched segments (defaults to the variant's setting). */
  segmented?: boolean;
  /** Width of one segment + gutter in px, when `segmented`. */
  segmentSize?: number;
  /** Bar fill colour. Overrides the variant's fill. */
  fillColor?: string;
  /** Bar track colour. */
  trackColor?: string;
  /** Bar height in px. */
  height?: number;
  style?: NSStyle;
}

export function HUDBar({
  variant = 'hp',
  value = 40,
  max = 40,
  label,
  segmented,
  segmentSize = 8,
  fillColor,
  trackColor = 'var(--hud-track, rgba(255, 255, 255, 0.10))',
  height = 14,
  style,
  role = 'meter',
  ...props
}: HUDBarProps): ReactElement {
  const spec = VARIANTS[variant] ?? VARIANTS.hp;
  const fill = fillColor ?? spec.fill;
  const isSegmented = segmented ?? spec.segmented;
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;

  const text = label === undefined ? `${value} / ${max}` : label;

  return (
    <div
      {...props}
      role={role}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.max(0, Math.min(value, max))}
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
          background: fill,
          transition: 'width .35s ease-out',
        }}
      />
      {isSegmented && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `repeating-linear-gradient(90deg, transparent 0, transparent ${segmentSize - 1}px, rgba(0,0,0,0.5) ${segmentSize - 1}px, rgba(0,0,0,0.5) ${segmentSize}px)`,
          }}
        />
      )}
      {text !== false && text !== '' && (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 4,
            fontSize: 4,
            color: spec.labelColor,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
