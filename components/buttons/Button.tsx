import type { AnchorHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactElement, ReactNode } from 'react';

import { cx } from '../shared/styles.js';

export type ButtonVariant = 'play' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  /** Visual style. */
  variant?: ButtonVariant;
  /** Control size. */
  size?: ButtonSize;
  /** Render as an anchor when provided. */
  href?: string;
  rel?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const VALID_VARIANTS = new Set<ButtonVariant>(['play', 'ghost']);
const VALID_SIZES = new Set<ButtonSize>(['sm', 'md', 'lg']);

export function Button({
  variant = 'play',
  size = 'md',
  href,
  onClick,
  children,
  disabled = false,
  className,
  type = 'button',
  ...props
}: ButtonProps): ReactElement {
  const resolvedVariant = VALID_VARIANTS.has(variant) ? variant : 'play';
  const resolvedSize = VALID_SIZES.has(size) ? size : 'md';
  const classes = cx(
    'ns-button',
    `ns-button--${resolvedVariant}`,
    `ns-button--${resolvedSize}`,
    className,
  );
  const commonProps = {
    ...props,
    className: classes,
    onClick: disabled ? undefined : onClick,
  };

  if (href) {
    return (
      <a
        {...commonProps}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
      >
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
