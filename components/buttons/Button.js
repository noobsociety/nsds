import React from 'react';

import { cx } from '../shared/styles.js';

const VALID_VARIANTS = new Set(['play', 'ghost']);
const VALID_SIZES = new Set(['sm', 'md', 'lg']);

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
}) {
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
    return React.createElement(
      'a',
      {
        ...commonProps,
        href: disabled ? undefined : href,
        'aria-disabled': disabled || undefined,
        tabIndex: disabled ? -1 : props.tabIndex,
      },
      children,
    );
  }

  return React.createElement(
    'button',
    {
      ...commonProps,
      type,
      disabled,
    },
    children,
  );
}
