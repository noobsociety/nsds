export type RPGIconWeapon = 'sword' | 'staff' | 'bow' | 'katar' | 'book' | 'hammer';
export type RPGIconElement =
  | 'neutral'
  | 'earth'
  | 'wind'
  | 'water'
  | 'fire'
  | 'light'
  | 'dark'
  | 'void';
export type RPGIconRace = 'human' | 'beast' | 'demon' | 'angel' | 'spirit';
export type RPGIconSize = 'small' | 'medium' | 'large';

export type RPGIconName = RPGIconWeapon | RPGIconElement | RPGIconRace | RPGIconSize;

export const rpgIconWeapons = [
  'sword',
  'staff',
  'bow',
  'katar',
  'book',
  'hammer',
] as const satisfies readonly RPGIconWeapon[];
export const rpgIconElements = [
  'neutral',
  'earth',
  'wind',
  'water',
  'fire',
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

export const rpgIconGroups = {
  weapons: rpgIconWeapons,
  elements: rpgIconElements,
  races: rpgIconRaces,
  sizes: rpgIconSizes,
} as const;

export const rpgIconNames = [
  ...rpgIconWeapons,
  ...rpgIconElements,
  ...rpgIconRaces,
  ...rpgIconSizes,
] as RPGIconName[];
