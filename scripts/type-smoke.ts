import type { ReactElement } from 'react';

import { Button, FeatureCard, QuestCard, SectionArrow } from '@noobsociety/nsds';
import { NS, NSThemeProvider, theme } from '@noobsociety/nsds/mui';

const button: ReactElement = Button({ children: 'Play' });
const feature: ReactElement = FeatureCard({
  icon: button,
  title: 'Tokens',
  body: 'Reusable visual decisions.',
});
const quest: ReactElement = QuestCard({
  gate: 1,
  title: 'Setup',
  body: 'Install the package.',
  status: 'active',
});
const arrow: ReactElement = SectionArrow({
  href: '#next',
  label: 'Next section',
});
const provider: ReactElement = NSThemeProvider({ children: button });

const accent: string = NS.gold;
const themeAccent: string = theme.palette.ns.gold;

void feature;
void quest;
void arrow;
void provider;
void accent;
void themeAccent;
