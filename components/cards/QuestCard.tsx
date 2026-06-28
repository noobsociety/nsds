import type { LiHTMLAttributes, ReactElement } from 'react';

import { cx, questStatus } from '../shared/styles.js';

export type QuestCardStatus = 'done' | 'active' | 'planned' | 'locked';

export interface QuestCardProps extends Omit<
  LiHTMLAttributes<HTMLLIElement>,
  'children' | 'title'
> {
  /** Gate number shown in the title. */
  gate: number;
  /** Short gate name. */
  title: string;
  /** One-sentence description. */
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
    <li
      {...props}
      className={cx('ns-quest-card', s.className, className)}
      data-quest-status={status}
    >
      <div className="ns-quest-card__header">
        <span className="ns-quest-card__icon" aria-hidden="true">
          {s.icon}
        </span>
        <div>
          <p className="ns-quest-card__gate">{`Gate ${gate}`}</p>
          <p className="ns-quest-card__name">
            <svg
              width="5"
              height="7"
              viewBox="0 0 5 7"
              aria-hidden="true"
              fill="currentColor"
              style={{ marginRight: 4, verticalAlign: 'middle' }}
            >
              <polygon points="0,0 5,3.5 0,7" />
            </svg>
            {title}
          </p>
        </div>
      </div>
      <div className="ns-quest-card__body">
        <p className="ns-quest-card__desc">{body}</p>
        <span className="ns-status-pill">{s.label}</span>
      </div>
    </li>
  );
}
