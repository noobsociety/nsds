/**
 * @startingPoint section="Components" subtitle="Play and Ghost button variants" viewport="700x180"
 */
import type * as React from 'react';

export interface ButtonProps {
  /** Visual style */
  variant?: 'play' | 'ghost';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Render as <a> when provided */
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

export declare function Button(props: ButtonProps): React.ReactElement;
