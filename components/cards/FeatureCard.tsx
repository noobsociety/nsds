import type { LiHTMLAttributes, ReactElement, ReactNode } from 'react';

import { nsTokens, cx, mergeStyles } from '../shared/styles.js';
import type { NSStyle } from '../shared/styles.js';

export interface FeatureCardProps extends Omit<
  LiHTMLAttributes<HTMLLIElement>,
  'children' | 'style' | 'title'
> {
  /** Pixel-art icon element. */
  icon: ReactNode;
  /** Card heading. */
  title: string;
  /** Body copy. */
  body: string;
  /** Small tag label. */
  tag?: string;
  /** Icon accent color. */
  iconColor?: string;
  style?: NSStyle;
}

export function FeatureCard({
  icon,
  title,
  body,
  tag,
  iconColor = nsTokens.gold,
  className,
  style,
  ...props
}: FeatureCardProps): ReactElement {
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
      {tag && <span className="ns-tag ns-feature-card__tag">{tag}</span>}
    </li>
  );
}
