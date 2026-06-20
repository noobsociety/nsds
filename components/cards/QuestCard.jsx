import React from 'react';
import { cx, questStatus } from '../shared/styles.js';

export function QuestCard({ gate, title, body, status = 'locked', className, ...props }) {
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
