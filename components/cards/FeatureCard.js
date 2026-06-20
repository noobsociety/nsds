import React from 'react';

import { nsTokens, cx, mergeStyles } from '../shared/styles.js';

export function FeatureCard({
  icon,
  title,
  body,
  tag,
  iconColor = nsTokens.gold,
  className,
  style,
  ...props
}) {
  return React.createElement('li', {
    ...props,
    className: cx('ns-card ns-feature-card', className),
    style: mergeStyles({ '--ns-feature-accent': iconColor }, style),
  },
    React.createElement('span', {
      className: 'ns-icon-slot ns-feature-card__icon',
      'aria-hidden': true,
    }, icon),
    React.createElement('div', null,
      React.createElement('h3', {
        className: 'ns-feature-card__title',
      }, title),
      React.createElement('p', {
        className: 'ns-feature-card__body',
      }, body),
    ),
    tag && React.createElement('span', {
      className: 'ns-tag ns-feature-card__tag',
    }, tag),
  );
}
