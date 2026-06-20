import { cx } from '../shared/styles.js';

function ChevronDownIcon() {
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

export function SectionArrow({ href, label, className, children, ...props }) {
  return (
    <a
      {...props}
      href={href}
      aria-label={label}
      className={cx('ns-section-arrow', className)}
    >
      {children || <ChevronDownIcon />}
    </a>
  );
}
