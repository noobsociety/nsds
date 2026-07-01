import type { ReactElement } from 'react';
import type { RPGIconSkill } from '@noobsociety/nsds';
import type { NSClientTarget, RPGIconName } from '@noobsociety/nsds/client';

import heroAvatarUrl from '@noobsociety/nsds/assets/hero-avatar.svg';
import sceneBackgroundUrl from '@noobsociety/nsds/assets/scene-bg.png';
import {
  Button,
  FeatureCard,
  HUDBar,
  HUDDivider,
  HUDLabel,
  QuestCard,
  SectionArrow,
} from '@noobsociety/nsds';
import { nsClientTargets, rpgIconNames, rpgIconSkins } from '@noobsociety/nsds/client';

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
const hudBar: ReactElement = HUDBar({ value: 30, max: 40 });
const hudDivider: ReactElement = HUDDivider({ direction: 'horizontal' });
const hudLabel: ReactElement = HUDLabel({ text: 'HP', align: 'center' });
const arrow: ReactElement = SectionArrow({
  href: '#next',
  label: 'Next section',
});
const target: NSClientTarget = nsClientTargets[0];
const iconName: RPGIconName = rpgIconNames[0];
const skillName: RPGIconSkill = 'passive';
void feature;
void quest;
void hudBar;
void hudDivider;
void hudLabel;
void arrow;
void target;
void iconName;
void skillName;
void (heroAvatarUrl satisfies string);
void (sceneBackgroundUrl satisfies string);
void rpgIconSkins;
