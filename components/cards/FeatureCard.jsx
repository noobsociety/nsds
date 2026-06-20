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
  return (
    <li
      {...props}
      className={cx('ns-card ns-feature-card', className)}
      style={mergeStyles({ '--ns-feature-accent': iconColor }, style)}
    >
      <span className="ns-icon-slot ns-feature-card__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <h3 className="ns-feature-card__title">{title}</h3>
        <p className="ns-feature-card__body">{body}</p>
      </div>
      {tag && (
        <span className="ns-tag ns-feature-card__tag">{tag}</span>
      )}
    </li>
  );
}
