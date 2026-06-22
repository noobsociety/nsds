export { NS, nsTokens, questStatus } from '../components/shared/constants.js';
export {
  rpgIconElements,
  rpgIconGroups,
  rpgIconNames,
  rpgIconRaces,
  rpgIconSizes,
  rpgIconWeapons,
  rpgIconNames as icons,
} from '../components/icons/registry.js';
export type {
  RPGIconElement,
  RPGIconName,
  RPGIconRace,
  RPGIconSize,
  RPGIconWeapon,
} from '../components/icons/registry.js';

export const nsClientRelease = '21.06' as const;
export const nsClientTargets = ['web', 'game'] as const;
export type NSClientTarget = (typeof nsClientTargets)[number];
