import type * as React from 'react';

export type RPGIconWeapon  = 'sword' | 'staff' | 'bow' | 'katar' | 'book' | 'hammer';
export type RPGIconElement = 'neutral' | 'earth' | 'wind' | 'water' | 'fire' | 'light' | 'dark' | 'void';
export type RPGIconRace    = 'human' | 'beast' | 'demon' | 'angel' | 'spirit';
export type RPGIconSize    = 'small' | 'medium' | 'large';

export type RPGIconName =
  | RPGIconWeapon
  | RPGIconElement
  | RPGIconRace
  | RPGIconSize;

export interface RPGIconProps {
  /**
   * 22 original pixel-art icons across 4 canonical categories:
   *
   * Weapons (6):  sword · staff · bow · katar · book · hammer
   *               (from game/items/index.ts weapon hand-slot items)
   *
   * Elements (8): neutral · earth · wind · water · fire · light · dark · void
   *               (from identity.ts ELEMENTS + ELEMENT_DISPLAY)
   *
   * Races (5):    human · beast · demon · angel · spirit
   *               (illustrative — race is free text in the game)
   *
   * Sizes (3):    small · medium · large
   *               (from identity.ts BODY_SIZES)
   */
  name?: RPGIconName;
  /** Rendered size in px (width = height). Default: 22 */
  size?: number;
  style?: React.CSSProperties;
}

export declare function RPGIcon(props: RPGIconProps): React.ReactElement;

/** Sorted list of all valid icon names */
export declare const icons: RPGIconName[];

/** @deprecated Use RPGIcon — HUDIcon is kept for backward compatibility */
export declare const HUDIcon: typeof RPGIcon;
