import type * as React from 'react';

export interface QuestCardProps {
  /** Gate number shown in the title */
  gate: number;
  /** Short gate name (e.g. "Space", "Movement") */
  title: string;
  /** One-sentence description */
  body: string;
  /** Controls border color, bg tint, icon, and pill label */
  status?: 'done' | 'active' | 'planned' | 'locked';
  className?: string;
  style?: React.CSSProperties;
}

export declare function QuestCard(props: QuestCardProps): React.ReactElement;
