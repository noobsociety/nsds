import type { LiHTMLAttributes, ReactElement } from 'react';

import { cx, questStatus } from '../shared/styles.js';

export type QuestCardStatus = 'done' | 'active' | 'planned' | 'locked';

export interface QuestCardProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'children' | 'title'> {
  /** Gate number shown in the title. */
  gate: number;
  /** Short gate name. */
  title: string;
  /** Supporting copy shown below the gate title. */
  body: string;
  /** Controls border color, tint, icon, and pill label. */
  status?: QuestCardStatus;
}

export function QuestCard({
  gate,
  title,
  body,
  status = 'locked',
  className,
  ...props
}: QuestCardProps): ReactElement {
  const s = questStatus[status] || questStatus.locked;

  return (
    <li {...props} className={cx('ns-quest-card', s.className, className)}>
      <span className="ns-quest-card__icon" aria-hidden="true">
        {s.icon}
      </span>
      <div className="ns-quest-card__body">
        <p className="ns-quest-card__title">{`Gate ${gate} · ${title}`}</p>
        <p className="ns-quest-card__desc">{body}</p>
        <span className="ns-status-pill">{s.label}</span>
      </div>
    </li>
  );
}
