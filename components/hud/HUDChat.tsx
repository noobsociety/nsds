import type { HTMLAttributes, ReactElement } from 'react';

import type { NSStyle } from '../shared/styles.js';

const FONT_UI = 'var(--ns-font-body, Inter, system-ui, sans-serif)';

export interface HUDChatMessage {
  /** Sender display name */
  sender: string;
  /** Message text */
  text: string;
  /** Sender name color — defaults to var(--ns-ink) */
  color?: string;
}

export interface HUDChatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  /** Chat messages to display, oldest first */
  messages?: HUDChatMessage[];
  /** Panel height in px */
  height?: number;
  /** Message font size in px */
  fontSize?: number;
  style?: NSStyle;
}

const DEFAULT_MESSAGES: HUDChatMessage[] = [
  { sender: 'Aria', color: 'var(--ns-purple)', text: 'nice combo earlier!' },
  { sender: 'Zeph', color: 'var(--hud-el-light)', text: 'ty! push mid now' },
  { sender: 'Kira', color: 'var(--ns-green)', text: 'incoming top lane' },
  { sender: 'Aria', color: 'var(--ns-purple)', text: 'on my way' },
];

/**
 * HUDChat — compact scrollable chat log.
 *
 * Each message row: `[sender]:` in a player colour + message text in dim white.
 * Designed for small HUD footprints (fontSize 4–6 px).
 */
export function HUDChat({
  messages = DEFAULT_MESSAGES,
  height = 80,
  fontSize = 4,
  style,
  ...props
}: HUDChatProps): ReactElement {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: '2px 3px',
        height,
        overflow: 'hidden',
        ...style,
      }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 2,
            fontFamily: FONT_UI,
            fontSize,
            lineHeight: 1.4,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: msg.color ?? 'var(--ns-ink)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {msg.sender}:
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.6)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {msg.text}
          </span>
        </div>
      ))}
    </div>
  );
}
