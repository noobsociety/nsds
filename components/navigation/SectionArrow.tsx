import type { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';

import { cx } from '../shared/styles.js';

export interface SectionArrowProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'href'
> {
  /** href of the next section. */
  href: string;
  /** Accessible label for screen readers. */
  label: string;
  children?: ReactNode;
}

function ChevronDownIcon(): ReactElement {
  return (
    <svg
      viewBox="0 0 12 8"
      width={12}
      height={12}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1,1.5 6,6.5 11,1.5" />
    </svg>
  );
}

export function SectionArrow({
  href,
  label,
  className,
  children,
  ...props
}: SectionArrowProps): ReactElement {
  return (
    <a {...props} href={href} aria-label={label} className={cx('ns-section-arrow', className)}>
      {children || <ChevronDownIcon />}
    </a>
  );
}
