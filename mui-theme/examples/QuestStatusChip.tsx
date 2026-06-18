/**
 * Example: How to use the NS status chip colors in the roadmap.
 *
 * MUI Chip color prop maps to Monokai semantic colors:
 *   'success'  → green  (#a6e22e) → HOLDS
 *   'warning'  → orange (#fd971f) → BUILDING
 *   'info'     → cyan   (#66d9e8) → PLANNED
 *   'default'  → gold   (#e6db74) → generic tag
 *   'secondary'→ purple (#ae81ff) → personal
 *   'error'    → pink   (#f92672) → danger
 */

import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { NS } from '../theme';

type QuestStatus = 'done' | 'active' | 'planned' | 'locked';

const STATUS_CONFIG = {
  done:    { label: 'HOLDS',    color: 'success' },
  active:  { label: 'BUILDING', color: 'warning' },
  planned: { label: 'PLANNED',  color: 'info' },
  locked:  {
    label: 'LATER',
    color: 'default',
    sx: {
      color: NS.inkFaint,
      background: alpha(NS.ink, 0.05),
      borderColor: alpha(NS.ink, 0.1),
    },
  },
} satisfies Record<QuestStatus, {
  label: string;
  color: 'success' | 'warning' | 'info' | 'default';
  sx?: object;
}>;

export function QuestStatusChip({ status }: { status: QuestStatus }) {
  const { label, color, sx } = STATUS_CONFIG[status];
  return <Chip label={label} color={color} size="small" sx={sx} />;
}
