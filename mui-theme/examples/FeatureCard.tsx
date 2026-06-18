/**
 * Example: Feature card using MUI Card + the NS theme.
 */

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import type * as React from 'react';
import { NS } from '../theme';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  tag?: string;
  tagColor?: 'default' | 'success' | 'warning' | 'info' | 'error' | 'secondary';
  iconColor?: string;
}

export function FeatureCard({
  icon, title, body, tag, tagColor = 'default', iconColor = NS.gold
}: FeatureCardProps) {
  return (
    <Card sx={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '14rem' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.125rem', flex: 1 }}>
        {/* Icon slot */}
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 42, height: 42, background: NS.bg2, borderRadius: '6px', color: iconColor,
          flexShrink: 0,
        }}>
          {icon}
        </Box>
        {/* Content */}
        <Box>
          <Typography variant="h3" sx={{ mb: '0.5rem' }}>{title}</Typography>
          <Typography variant="body2">{body}</Typography>
        </Box>
      </CardContent>
      {tag && (
        <Chip
          label={tag}
          color={tagColor}
          size="small"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.875rem' }}
        />
      )}
    </Card>
  );
}
