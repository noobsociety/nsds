import { useState, type ReactElement, type ReactNode } from 'react';

import type { NSStyle } from '../shared/styles.js';

const FONT = 'var(--ns-font-pixel, "Press Start 2P", monospace)';

export interface HUDTab {
  /** Unique identifier */
  id: string;
  /** Tab button label */
  label: string;
  /** Content rendered in the panel when this tab is active */
  content?: ReactNode;
}

export interface HUDTabWindowProps {
  /** Tab definitions */
  tabs?: HUDTab[];
  /** ID of the initially-active tab. Defaults to the first tab. */
  defaultTab?: string;
  /** Tab bar height in px. 1 grid cell ≈ 14 px. */
  tabHeight?: number;
  /**
   * Minimum tab button width in px.
   * Defaults to 48 px — two grid cells, the narrowest comfortably-readable
   * tab label at HUD scale.
   */
  tabMinWidth?: number;
  /** Label font size in px */
  tabFontSize?: number;
  /** Horizontal alignment of tab buttons within the tab bar */
  tabAlign?: 'left' | 'center' | 'right';
  style?: NSStyle;
}

const DEFAULT_TABS: HUDTab[] = [
  { id: 'stats', label: 'STATS' },
  { id: 'equip', label: 'EQUIP' },
  { id: 'map', label: 'MAP' },
];

/**
 * HUDTabWindow — a resizable tabbed panel container.
 *
 * Each tab is at minimum 48 px (two grid cells) wide and 1 grid cell tall.
 * The window fills its parent; size it with the surrounding grid.
 * Pass `content` on each tab to render any HUD element inside.
 */
export function HUDTabWindow({
  tabs = DEFAULT_TABS,
  defaultTab,
  tabHeight = 14,
  tabMinWidth = 48,
  tabFontSize = 3.5,
  tabAlign = 'left',
  style,
}: HUDTabWindowProps): ReactElement {
  const [activeId, setActiveId] = useState<string>(defaultTab ?? tabs[0]?.id ?? '');
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  const justifyContent =
    tabAlign === 'center' ? 'center' : tabAlign === 'right' ? 'flex-end' : 'flex-start';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {/* ── Tab bar ── */}
      <div
        style={{
          display: 'flex',
          justifyContent,
          flexShrink: 0,
          height: tabHeight,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              style={{
                minWidth: tabMinWidth,
                height: '100%',
                padding: '0 6px',
                background: active ? 'rgba(230,219,116,0.09)' : 'transparent',
                border: 'none',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                color: active ? 'var(--hud-gold, #e6db74)' : 'rgba(255,255,255,0.38)',
                fontFamily: FONT,
                fontSize: tabFontSize,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                flexShrink: 0,
                userSelect: 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Active panel ── */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {activeTab?.content ?? null}
      </div>
    </div>
  );
}
