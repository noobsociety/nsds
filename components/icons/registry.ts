export type RPGIconWeapon = 'sword' | 'bow' | 'staff' | 'katar' | 'book' | 'hammer';
export type RPGIconElement =
  | 'neutral'
  | 'fire'
  | 'earth'
  | 'wind'
  | 'water'
  | 'light'
  | 'dark'
  | 'void';
export type RPGIconRace = 'human' | 'beast' | 'demon' | 'angel' | 'spirit';
export type RPGIconSize = 'small' | 'medium' | 'large';
export type RPGIconAttack =
  | 'attack-sword'
  | 'attack-bow'
  | 'attack-staff'
  | 'attack-katar'
  | 'attack-book'
  | 'attack-hammer';
export type RPGIconSkill = 'passive' | 'active' | 'combo' | 'stance' | 'buff' | 'debuff';
export type RPGIconItem = 'potion' | 'ether' | 'scroll' | 'gem' | 'relic' | 'key';
export type RPGIconEquip = 'helm' | 'armor' | 'cloak' | 'shield' | 'ring' | 'greaves';
export type RPGIconSkin = 'hat' | 'emblem' | 'cape' | 'badge' | 'boots';
export type RPGIconMenu =
  | 'menu'
  | 'inventory'
  | 'party'
  | 'quest'
  | 'map'
  | 'shop'
  | 'settings'
  | 'save';
export type RPGIconEmote =
  | 'emote-tysm'
  | 'emote-sos'
  | 'emote-lol'
  | 'emote-win'
  | 'emote-lgo'
  | 'emote-ugh'
  | 'emote-myb'
  | 'emote-wut'
  | 'emote-grr';

export type RPGIconName =
  | RPGIconWeapon
  | RPGIconElement
  | RPGIconRace
  | RPGIconSize
  | RPGIconAttack
  | RPGIconSkill
  | RPGIconItem
  | RPGIconEquip
  | RPGIconSkin
  | RPGIconMenu
  | RPGIconEmote;

export const rpgIconWeapons = [
  'sword',
  'bow',
  'staff',
  'katar',
  'book',
  'hammer',
] as const satisfies readonly RPGIconWeapon[];
export const rpgIconElements = [
  'neutral',
  'fire',
  'earth',
  'wind',
  'water',
  'light',
  'dark',
  'void',
] as const satisfies readonly RPGIconElement[];
export const rpgIconRaces = [
  'human',
  'beast',
  'demon',
  'angel',
  'spirit',
] as const satisfies readonly RPGIconRace[];
export const rpgIconSizes = ['small', 'medium', 'large'] as const satisfies readonly RPGIconSize[];
export const rpgIconAttack = [
  'attack-sword',
  'attack-bow',
  'attack-staff',
  'attack-katar',
  'attack-book',
  'attack-hammer',
] as const satisfies readonly RPGIconAttack[];
export const rpgIconSkills = [
  'passive',
  'active',
  'combo',
  'stance',
  'buff',
  'debuff',
] as const satisfies readonly RPGIconSkill[];
export const rpgIconItems = [
  'potion',
  'ether',
  'scroll',
  'gem',
  'relic',
  'key',
] as const satisfies readonly RPGIconItem[];
export const rpgIconEquip = [
  'helm',
  'armor',
  'cloak',
  'shield',
  'ring',
  'greaves',
] as const satisfies readonly RPGIconEquip[];
export const rpgIconSkins = [
  'hat',
  'emblem',
  'cape',
  'badge',
  'boots',
] as const satisfies readonly RPGIconSkin[];
export const rpgIconMenu = [
  'menu',
  'inventory',
  'party',
  'quest',
  'map',
  'shop',
  'settings',
  'save',
] as const satisfies readonly RPGIconMenu[];
export const rpgIconEmotes = [
  'emote-tysm',
  'emote-sos',
  'emote-lol',
  'emote-win',
  'emote-lgo',
  'emote-ugh',
  'emote-myb',
  'emote-wut',
  'emote-grr',
] as const satisfies readonly RPGIconEmote[];

export const rpgIconGroups = {
  weapons: rpgIconWeapons,
  elements: rpgIconElements,
  races: rpgIconRaces,
  sizes: rpgIconSizes,
  attack: rpgIconAttack,
  skills: rpgIconSkills,
  items: rpgIconItems,
  equip: rpgIconEquip,
  skins: rpgIconSkins,
  menu: rpgIconMenu,
  emotes: rpgIconEmotes,
} as const;

export const rpgIconNames = [
  ...rpgIconWeapons,
  ...rpgIconElements,
  ...rpgIconRaces,
  ...rpgIconSizes,
  ...rpgIconAttack,
  ...rpgIconSkills,
  ...rpgIconItems,
  ...rpgIconEquip,
  ...rpgIconSkins,
  ...rpgIconMenu,
  ...rpgIconEmotes,
] as RPGIconName[];
