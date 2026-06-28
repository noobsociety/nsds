import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
} from 'react';

import type { NSStyle } from '../shared/styles.js';

export interface HUDJoystickProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'style' | 'onChange'
> {
  /** Outer diameter in px. The component renders a square of this size. */
  size?: number;
  /** Thumb diameter as a fraction of size (0–1). */
  thumbSize?: number;
  /**
   * Fires continuously during drag with normalised x, y values in [-1, 1].
   * Emits (0, 0) when the thumb is released.
   */
  onChange?: (x: number, y: number) => void;
  style?: NSStyle;
}

/**
 * HUDJoystick — interactive virtual thumbstick.
 *
 * Drag the thumb within the circular pad; onChange fires normalised
 * x/y coordinates in [-1, 1]. The thumb snaps back to centre on release.
 */
export function HUDJoystick({
  size = 80,
  thumbSize = 0.32,
  onChange,
  style,
  ...props
}: HUDJoystickProps): ReactElement {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragging = useRef(false);
  const baseRef = useRef<HTMLDivElement | null>(null);
  const maxR = size * 0.35;
  const thumbPx = Math.round(size * thumbSize);

  const startDrag = useCallback((e: ReactMouseEvent) => {
    e.preventDefault();
    dragging.current = true;
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !baseRef.current) return;
      const r = baseRef.current.getBoundingClientRect();
      let dx = e.clientX - (r.left + r.width / 2);
      let dy = e.clientY - (r.top + r.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > maxR) {
        dx = (dx / d) * maxR;
        dy = (dy / d) * maxR;
      }
      const nx = dx / maxR;
      const ny = dy / maxR;
      setOffset({ x: nx, y: ny });
      onChange?.(nx, ny);
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setOffset({ x: 0, y: 0 });
      onChange?.(0, 0);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [maxR, onChange]);

  return (
    <div
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        ...style,
      }}
    >
      <div
        ref={baseRef}
        onMouseDown={startDrag}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.18)',
          background: 'rgba(0,0,0,0.38)',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {/* Crosshair guides */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 1,
            background: 'rgba(255,255,255,0.07)',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 1,
            background: 'rgba(255,255,255,0.07)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        />
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            width: thumbPx,
            height: thumbPx,
            borderRadius: '50%',
            background: 'rgba(190,190,210,0.72)',
            border: '1px solid rgba(255,255,255,0.35)',
            top: `calc(50% + ${offset.y * maxR}px - ${thumbPx / 2}px)`,
            left: `calc(50% + ${offset.x * maxR}px - ${thumbPx / 2}px)`,
            pointerEvents: 'none',
            transition: dragging.current ? 'none' : 'top 0.12s, left 0.12s',
          }}
        />
      </div>
    </div>
  );
}
