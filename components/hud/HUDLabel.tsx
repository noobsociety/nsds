import type { HTMLAttributes, ReactElement } from 'react';

import type { NSStyle } from '../shared/styles.js';

const FONT = 'var(--ns-font-pixel, "Press Start 2P", monospace)';
const JUSTIFY = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

export interface HUDLabelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  /** Display text. */
  text?: string;
  /** Text alignment within the container. */
  align?: keyof typeof JUSTIFY;
  /** Uniform scale multiplier applied to fontSize. */
  scale?: number;
  /** Text color. */
  color?: string;
  /** Base font size in px, before scale. */
  fontSize?: number;
  style?: NSStyle;
}

export function HUDLabel({
  text = 'Label',
  align = 'left',
  scale = 1,
  color = 'var(--ns-ink)',
  fontSize = 5,
  style,
  ...props
}: HUDLabelProps): ReactElement {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: JUSTIFY[align] || JUSTIFY.left,
        paddingLeft: align === 'right' ? 0 : 3,
        paddingRight: align === 'left' ? 0 : 3,
        fontFamily: FONT,
        fontSize: fontSize * scale,
        color,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {text}
    </div>
  );
}
