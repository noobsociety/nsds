export { NS, nsTokens, questStatus } from '../components/shared/constants.js';
export {
  rpgIconAttack,
  rpgIconElements,
  rpgIconEmotes,
  rpgIconEquip,
  rpgIconGroups,
  rpgIconItems,
  rpgIconMenu,
  rpgIconNames,
  rpgIconRaces,
  rpgIconSizes,
  rpgIconSkills,
  rpgIconWeapons,
  rpgIconNames as icons,
} from '../components/icons/registry.js';
export type {
  RPGIconAttack,
  RPGIconElement,
  RPGIconEmote,
  RPGIconEquip,
  RPGIconItem,
  RPGIconMenu,
  RPGIconName,
  RPGIconRace,
  RPGIconSize,
  RPGIconSkin,
  RPGIconWeapon,
} from '../components/icons/registry.js';

export const nsClientRelease = '21.06' as const;
export const nsClientTargets = ['web', 'game'] as const;
export type NSClientTarget = (typeof nsClientTargets)[number];
