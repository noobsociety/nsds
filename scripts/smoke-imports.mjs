import assert from 'node:assert/strict';
import React from 'react';

import {
  Button,
  FeatureCard,
  HUDBar,
  HUDDivider,
  HUDLabel,
  QuestCard,
  SectionArrow,
} from '@noobsociety/nsds';
import * as ReactEntry from '@noobsociety/nsds/react';
import { NS, NSThemeProvider, theme } from '@noobsociety/nsds/mui';

for (const name of [
  'Button',
  'FeatureCard',
  'QuestCard',
  'HUDBar',
  'HUDDivider',
  'HUDLabel',
  'SectionArrow',
]) {
  assert.equal(typeof ReactEntry[name], 'function', `${name} must be exported from /react`);
}

const button = Button({ children: 'Play' });
assert.equal(button.type, 'button');
assert.equal(button.props.type, 'button');
assert.equal(button.props.disabled, false);
assert.match(button.props.className, /\bns-button\b/);
assert.match(button.props.className, /\bns-button--play\b/);

const disabledLink = Button({ href: '/docs', disabled: true, children: 'Docs' });
assert.equal(disabledLink.type, 'a');
assert.equal(disabledLink.props.href, undefined);
assert.equal(disabledLink.props['aria-disabled'], true);
assert.equal(disabledLink.props.tabIndex, -1);

const feature = FeatureCard({
  icon: React.createElement('span'),
  title: 'Tokens',
  body: 'Reusable visual decisions.',
  tag: 'Core',
});
assert.equal(feature.type, 'li');
assert.match(feature.props.className, /\bns-feature-card\b/);
assert.equal(feature.props.style['--ns-feature-accent'], 'var(--ns-gold)');

const quest = QuestCard({
  gate: 1,
  title: 'Setup',
  body: 'Install the package.',
  status: 'active',
});
assert.equal(quest.type, 'li');
assert.match(quest.props.className, /\bns-quest-card\b/);
assert.match(quest.props.className, /\bns-quest-card--active\b/);

const hudBar = HUDBar({ value: 30, max: 40 });
assert.equal(hudBar.type, 'div');
assert.equal(hudBar.props.style.height, 14);

const hudDivider = HUDDivider({ direction: 'horizontal' });
assert.equal(hudDivider.type, 'div');
assert.equal(hudDivider.props.style.width, '100%');

const hudLabel = HUDLabel({ text: 'HP', align: 'center' });
assert.equal(hudLabel.type, 'div');
assert.equal(hudLabel.props.children, 'HP');

const arrow = SectionArrow({ href: '#next', label: 'Next section' });
assert.equal(arrow.type, 'a');
assert.equal(arrow.props.href, '#next');
assert.equal(arrow.props['aria-label'], 'Next section');
assert.match(arrow.props.className, /\bns-section-arrow\b/);

assert.equal(NS.gold, '#e6db74');
assert.equal(theme.palette.mode, 'dark');
assert.equal(theme.palette.ns.gold, NS.gold);
assert.equal(theme.spacing(4), '1rem');

const provider = NSThemeProvider({ children: React.createElement('main') });
assert.equal(React.isValidElement(provider), true);

console.log('Public entry smoke imports passed.');
