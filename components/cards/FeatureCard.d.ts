import type * as React from 'react';

export interface FeatureCardProps {
  /** Pixel-art icon element */
  icon: React.ReactNode;
  /** Card heading — Press Start 2P */
  title: string;
  /** Body copy — Inter 14px */
  body: string;
  /** Small tag label in top-right (e.g. "Spatial", "Live") */
  tag?: string;
  /** Icon color — defaults to gold #e6db74 */
  iconColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export declare function FeatureCard(props: FeatureCardProps): React.ReactElement;
