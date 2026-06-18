/**
 * Example: Section eyebrow using MUI Typography overline variant.
 *
 * The overline variant is pre-configured to:
 *   font: Inter 700, 13px, letter-spacing 0.18em, uppercase, color: gold
 */

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// The ✦ star SVG eyebrow icon
const StarIcon = () => (
  <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"
    fill="currentColor" style={{ display: 'block', flexShrink: 0 }}>
    <polygon points="5,0.5 6.2,3.8 9.8,3.8 6.9,5.9 8,9.2 5,7.1 2,9.2 3.1,5.9 0.2,3.8 3.8,3.8" />
  </svg>
);

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <Box sx={{ mb: '2rem' }}>
      <Typography
        variant="overline"
        component="p"
        sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '0.875rem' }}
      >
        <StarIcon />
        {eyebrow}
      </Typography>
      <Typography variant="h2" sx={{ mb: subtitle ? '0.75rem' : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle2">{subtitle}</Typography>
      )}
    </Box>
  );
}
