import React from 'react';

import { cx, questStatus } from '../shared/styles.js';

export function QuestCard({ gate, title, body, status = 'locked', className, ...props }) {
  const s = questStatus[status] || questStatus.locked;
  return React.createElement('li', {
    ...props,
    className: cx('ns-quest-card', s.className, className),
  },
    React.createElement('span', {
      className: 'ns-quest-card__icon',
      'aria-hidden': true,
    }, s.icon),
    React.createElement('div', { className: 'ns-quest-card__body' },
      React.createElement('p', {
        className: 'ns-quest-card__title',
      }, `Gate ${gate} · ${title}`),
      React.createElement('p', {
        className: 'ns-quest-card__desc',
      }, body),
      React.createElement('span', {
        className: 'ns-status-pill',
      }, s.label),
    ),
  );
}
