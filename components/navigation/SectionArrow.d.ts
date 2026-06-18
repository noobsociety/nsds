import type * as React from 'react';

export interface SectionArrowProps {
  /** href of the next section (e.g. "#why") */
  href: string;
  /** Accessible label for screen readers */
  label: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export declare function SectionArrow(props: SectionArrowProps): React.ReactElement;
