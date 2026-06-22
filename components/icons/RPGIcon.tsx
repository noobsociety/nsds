import type { CSSProperties, ReactElement } from 'react';

import { rpgIconNames } from './registry.js';
import type {
  RPGIconElement,
  RPGIconName,
  RPGIconRace,
  RPGIconSize,
  RPGIconWeapon,
} from './registry.js';

export type {
  RPGIconElement,
  RPGIconName,
  RPGIconRace,
  RPGIconSize,
  RPGIconWeapon,
} from './registry.js';

/* ── Icon library ──────────────────────────────────────────────────────────
   Original geometric pixel-art, 16×16 viewBox.
   Canonical sets from the game design:
     Weapons (6):  sword · staff · bow · katar · book · hammer
     Elements (8): neutral · earth · wind · water · fire · dark · light · void
     Races (5):    human · beast · demon · angel · spirit
     Sizes (3):    small · medium · large
   ───────────────────────────────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════════
   WEAPONS
   ══════════════════════════════════════════════════════════ */

function SwordIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <line x1="13" y1="2"  x2="4"  y2="11" stroke="#cfd8e2" strokeWidth="2"   strokeLinecap="square"/>
      <line x1="6"  y1="5"  x2="10" y2="9"  stroke="#e6db74" strokeWidth="2"   strokeLinecap="square"/>
      <line x1="4"  y1="10" x2="2"  y2="13" stroke="#b07040" strokeWidth="1.5" strokeLinecap="square"/>
    </svg>
  );
}

function BowIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="3"  y="1"  width="3"  height="2"  fill="#8a6540"/>
      <rect x="2"  y="3"  width="2"  height="10" fill="#8a6540"/>
      <rect x="3"  y="13" width="3"  height="2"  fill="#8a6540"/>
      <rect x="6"  y="2"  width="1"  height="1"  fill="#cfd8e2"/>
      <rect x="7"  y="3"  width="1"  height="10" fill="#cfd8e2"/>
      <rect x="6"  y="13" width="1"  height="1"  fill="#cfd8e2"/>
      <rect x="7"  y="7"  width="7"  height="2"  fill="#c8a878"/>
      <rect x="13" y="6"  width="2"  height="1"  fill="#cfd8e2"/>
      <rect x="14" y="7"  width="2"  height="2"  fill="#cfd8e2"/>
      <rect x="13" y="9"  width="2"  height="1"  fill="#cfd8e2"/>
      <rect x="7"  y="5"  width="2"  height="2"  fill="#ae81ff"/>
      <rect x="7"  y="9"  width="2"  height="2"  fill="#ae81ff"/>
    </svg>
  );
}

function StaffIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="5"  y="1"  width="6"  height="1"  fill="#c8a8ff"/>
      <rect x="4"  y="2"  width="8"  height="4"  fill="#ae81ff"/>
      <rect x="5"  y="6"  width="6"  height="1"  fill="#c8a8ff"/>
      <rect x="6"  y="3"  width="4"  height="2"  fill="#d4b8ff"/>
      <rect x="7"  y="7"  width="2"  height="8"  fill="#8a6540"/>
      <rect x="6"  y="10" width="4"  height="1"  fill="#b07040"/>
    </svg>
  );
}

function KatarIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="1"  width="2"  height="8"  fill="#cfd8e2"/>
      <rect x="2"  y="9"  width="2"  height="3"  fill="#a8b0bc"/>
      <rect x="12" y="1"  width="2"  height="8"  fill="#cfd8e2"/>
      <rect x="12" y="9"  width="2"  height="3"  fill="#a8b0bc"/>
      <rect x="2"  y="8"  width="12" height="2"  fill="#e6db74"/>
      <rect x="6"  y="10" width="4"  height="5"  fill="#8a6540"/>
      <rect x="3"  y="0"  width="1"  height="1"  fill="#eef0f4"/>
      <rect x="12" y="0"  width="1"  height="1"  fill="#eef0f4"/>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="2"  width="2"  height="12" fill="#6a4a6a"/>
      <rect x="4"  y="2"  width="10" height="12" fill="#8855aa"/>
      <rect x="13" y="3"  width="1"  height="10" fill="#f4f0e8"/>
      <rect x="7"  y="4"  width="2"  height="1"  fill="#c8a8ff"/>
      <rect x="6"  y="5"  width="4"  height="1"  fill="#c8a8ff"/>
      <rect x="7"  y="6"  width="2"  height="1"  fill="#c8a8ff"/>
      <rect x="6"  y="8"  width="4"  height="1"  fill="#e6db74"/>
      <rect x="7"  y="9"  width="2"  height="2"  fill="#e6db74"/>
    </svg>
  );
}

function HammerIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="4"  y="1"  width="8"  height="1"  fill="#a8b0bc"/>
      <rect x="3"  y="2"  width="10" height="5"  fill="#a8b0bc"/>
      <rect x="3"  y="2"  width="10" height="1"  fill="#cfd8e2"/>
      <rect x="3"  y="3"  width="1"  height="3"  fill="#cfd8e2"/>
      <rect x="3"  y="7"  width="10" height="1"  fill="#5a6570"/>
      <rect x="7"  y="7"  width="2"  height="8"  fill="#8a6540"/>
      <rect x="6"  y="10" width="4"  height="1"  fill="#b07040"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   ELEMENTS — color is the primary signal
   ══════════════════════════════════════════════════════════ */

function NeutralIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="6"  width="12" height="4" fill="#7a7a8a"/>
      <rect x="6"  y="2"  width="4"  height="12" fill="#7a7a8a"/>
      <rect x="3"  y="3"  width="2"  height="2" fill="#7a7a8a"/>
      <rect x="11" y="3"  width="2"  height="2" fill="#7a7a8a"/>
      <rect x="3"  y="11" width="2"  height="2" fill="#7a7a8a"/>
      <rect x="11" y="11" width="2"  height="2" fill="#7a7a8a"/>
      <rect x="7"  y="7"  width="2"  height="2" fill="#b0b0c0"/>
      <rect x="7"  y="4"  width="2"  height="1" fill="#b0b0c0"/>
      <rect x="7"  y="11" width="2"  height="1" fill="#b0b0c0"/>
      <rect x="4"  y="7"  width="1"  height="2" fill="#b0b0c0"/>
      <rect x="11" y="7"  width="1"  height="2" fill="#b0b0c0"/>
    </svg>
  );
}

function EarthIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="7"  y="2"  width="2"  height="2"  fill="#c8a050"/>
      <rect x="6"  y="4"  width="4"  height="2"  fill="#c8a050"/>
      <rect x="5"  y="6"  width="6"  height="2"  fill="#8b6914"/>
      <rect x="4"  y="8"  width="8"  height="2"  fill="#8b6914"/>
      <rect x="3"  y="10" width="10" height="2"  fill="#6a5010"/>
      <rect x="1"  y="12" width="14" height="3"  fill="#5a4008"/>
      <rect x="7"  y="2"  width="2"  height="1"  fill="#f0ece0"/>
      <rect x="6"  y="3"  width="4"  height="1"  fill="#f0ece0"/>
      <rect x="5"  y="8"  width="1"  height="1"  fill="#a07820"/>
      <rect x="10" y="9"  width="1"  height="1"  fill="#a07820"/>
    </svg>
  );
}

function WindIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="4"  width="10" height="1"  fill="#5dcaa5"/>
      <rect x="3"  y="5"  width="2"  height="1"  fill="#5dcaa5"/>
      <rect x="12" y="3"  width="2"  height="2"  fill="#5dcaa5"/>
      <rect x="13" y="5"  width="1"  height="1"  fill="#5dcaa5"/>
      <rect x="1"  y="7"  width="11" height="2"  fill="#5dcaa5"/>
      <rect x="12" y="6"  width="2"  height="4"  fill="#5dcaa5"/>
      <rect x="11" y="10" width="2"  height="1"  fill="#5dcaa5"/>
      <rect x="2"  y="12" width="9"  height="1"  fill="#5dcaa5"/>
      <rect x="2"  y="11" width="2"  height="1"  fill="#5dcaa5"/>
      <rect x="11" y="12" width="2"  height="2"  fill="#5dcaa5"/>
      <rect x="10" y="14" width="2"  height="1"  fill="#5dcaa5"/>
      <rect x="2"  y="3"  width="8"  height="1"  fill="#90e8cc"/>
      <rect x="2"  y="8"  width="9"  height="1"  fill="#90e8cc"/>
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="6"  y="1"  width="4"  height="1"  fill="#378add"/>
      <rect x="5"  y="2"  width="6"  height="2"  fill="#378add"/>
      <rect x="4"  y="4"  width="8"  height="6"  fill="#378add"/>
      <rect x="5"  y="10" width="6"  height="2"  fill="#378add"/>
      <rect x="6"  y="12" width="4"  height="2"  fill="#378add"/>
      <rect x="7"  y="14" width="2"  height="1"  fill="#378add"/>
      <rect x="6"  y="4"  width="3"  height="4"  fill="#70b8f0"/>
      <rect x="7"  y="3"  width="2"  height="1"  fill="#70b8f0"/>
      <rect x="5"  y="7"  width="2"  height="1"  fill="#1a5a9a"/>
      <rect x="9"  y="8"  width="2"  height="1"  fill="#1a5a9a"/>
    </svg>
  );
}

function FireIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="4"  y="11" width="8"  height="4"  fill="#ba7517"/>
      <rect x="3"  y="8"  width="10" height="3"  fill="#ba7517"/>
      <rect x="4"  y="5"  width="8"  height="3"  fill="#ba7517"/>
      <rect x="5"  y="3"  width="6"  height="2"  fill="#ba7517"/>
      <rect x="6"  y="1"  width="4"  height="2"  fill="#ba7517"/>
      <rect x="5"  y="9"  width="6"  height="5"  fill="#e8882a"/>
      <rect x="6"  y="7"  width="4"  height="2"  fill="#e8882a"/>
      <rect x="6"  y="10" width="4"  height="3"  fill="#e6db74"/>
      <rect x="7"  y="9"  width="2"  height="1"  fill="#e6db74"/>
    </svg>
  );
}

function DarkIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="5"  y="2"  width="6"  height="2"  fill="#888780"/>
      <rect x="3"  y="4"  width="8"  height="8"  fill="#888780"/>
      <rect x="5"  y="12" width="6"  height="2"  fill="#888780"/>
      <rect x="4"  y="3"  width="1"  height="10" fill="#888780"/>
      <rect x="8"  y="4"  width="4"  height="8"  fill="#1a1a20"/>
      <rect x="7"  y="5"  width="5"  height="6"  fill="#1a1a20"/>
      <rect x="11" y="2"  width="1"  height="1"  fill="#c8c8d0"/>
      <rect x="13" y="5"  width="1"  height="1"  fill="#c8c8d0"/>
      <rect x="12" y="9"  width="1"  height="1"  fill="#c8c8d0"/>
    </svg>
  );
}

function LightIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="5"  y="5"  width="6"  height="6"  fill="#fac775"/>
      <rect x="6"  y="4"  width="4"  height="1"  fill="#fac775"/>
      <rect x="6"  y="11" width="4"  height="1"  fill="#fac775"/>
      <rect x="4"  y="6"  width="1"  height="4"  fill="#fac775"/>
      <rect x="11" y="6"  width="1"  height="4"  fill="#fac775"/>
      <rect x="7"  y="1"  width="2"  height="3"  fill="#fac775"/>
      <rect x="7"  y="12" width="2"  height="3"  fill="#fac775"/>
      <rect x="1"  y="7"  width="3"  height="2"  fill="#fac775"/>
      <rect x="12" y="7"  width="3"  height="2"  fill="#fac775"/>
      <rect x="3"  y="3"  width="2"  height="2"  fill="#fac775"/>
      <rect x="11" y="3"  width="2"  height="2"  fill="#fac775"/>
      <rect x="3"  y="11" width="2"  height="2"  fill="#fac775"/>
      <rect x="11" y="11" width="2"  height="2"  fill="#fac775"/>
      <rect x="6"  y="6"  width="4"  height="4"  fill="#fff8e0"/>
    </svg>
  );
}

function VoidIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="5"  y="1"  width="6"  height="2"  fill="#7f77dd"/>
      <rect x="3"  y="3"  width="10" height="2"  fill="#7f77dd"/>
      <rect x="2"  y="5"  width="12" height="6"  fill="#7f77dd"/>
      <rect x="3"  y="11" width="10" height="2"  fill="#7f77dd"/>
      <rect x="5"  y="13" width="6"  height="2"  fill="#7f77dd"/>
      <rect x="4"  y="4"  width="8"  height="8"  fill="#1a1828"/>
      <rect x="5"  y="3"  width="6"  height="1"  fill="#1a1828"/>
      <rect x="5"  y="12" width="6"  height="1"  fill="#1a1828"/>
      <rect x="3"  y="5"  width="1"  height="6"  fill="#1a1828"/>
      <rect x="12" y="5"  width="1"  height="6"  fill="#1a1828"/>
      <rect x="6"  y="6"  width="4"  height="4"  fill="#4a44aa"/>
      <rect x="7"  y="5"  width="2"  height="1"  fill="#4a44aa"/>
      <rect x="7"  y="10" width="2"  height="1"  fill="#4a44aa"/>
      <rect x="5"  y="7"  width="1"  height="2"  fill="#4a44aa"/>
      <rect x="10" y="7"  width="1"  height="2"  fill="#4a44aa"/>
      <rect x="7"  y="7"  width="2"  height="2"  fill="#c8c0ff"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   RACES
   ══════════════════════════════════════════════════════════ */

function HumanIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="5"  y="1"  width="6"  height="5" fill="#e8c87a"/>
      <rect x="7"  y="6"  width="2"  height="1" fill="#d4a85a"/>
      <rect x="3"  y="7"  width="10" height="5" fill="#c8873a"/>
      <rect x="1"  y="7"  width="2"  height="4" fill="#c8873a"/>
      <rect x="13" y="7"  width="2"  height="4" fill="#c8873a"/>
      <rect x="4"  y="12" width="3"  height="3" fill="#8a5c2a"/>
      <rect x="9"  y="12" width="3"  height="3" fill="#8a5c2a"/>
    </svg>
  );
}

function BeastIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="2"  y="1"  width="3"  height="4"  fill="#c8a060"/>
      <rect x="11" y="1"  width="3"  height="4"  fill="#c8a060"/>
      <rect x="3"  y="2"  width="1"  height="2"  fill="#e8886a"/>
      <rect x="12" y="2"  width="1"  height="2"  fill="#e8886a"/>
      <rect x="3"  y="4"  width="10" height="6"  fill="#c8a060"/>
      <rect x="5"  y="8"  width="6"  height="3"  fill="#d4b070"/>
      <rect x="7"  y="8"  width="2"  height="1"  fill="#5a3020"/>
      <rect x="4"  y="6"  width="3"  height="2"  fill="#e8a020"/>
      <rect x="9"  y="6"  width="3"  height="2"  fill="#e8a020"/>
      <rect x="5"  y="6"  width="1"  height="2"  fill="#1a1008"/>
      <rect x="10" y="6"  width="1"  height="2"  fill="#1a1008"/>
      <rect x="3"  y="11" width="10" height="4"  fill="#a87840"/>
      <rect x="1"  y="11" width="2"  height="3"  fill="#a87840"/>
      <rect x="13" y="11" width="2"  height="3"  fill="#a87840"/>
    </svg>
  );
}

function DemonIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="3"  y="1"  width="2"  height="5"  fill="#cc3030"/>
      <rect x="11" y="1"  width="2"  height="5"  fill="#cc3030"/>
      <rect x="2"  y="1"  width="2"  height="2"  fill="#cc3030"/>
      <rect x="12" y="1"  width="2"  height="2"  fill="#cc3030"/>
      <rect x="3"  y="5"  width="10" height="6"  fill="#7a2a2a"/>
      <rect x="4"  y="7"  width="3"  height="2"  fill="#ff2020"/>
      <rect x="9"  y="7"  width="3"  height="2"  fill="#ff2020"/>
      <rect x="5"  y="7"  width="1"  height="2"  fill="#ff8080"/>
      <rect x="10" y="7"  width="1"  height="2"  fill="#ff8080"/>
      <rect x="6"  y="11" width="1"  height="2"  fill="#f0e8d0"/>
      <rect x="9"  y="11" width="1"  height="2"  fill="#f0e8d0"/>
      <rect x="2"  y="12" width="12" height="4"  fill="#5a1a1a"/>
      <rect x="1"  y="12" width="2"  height="3"  fill="#5a1a1a"/>
      <rect x="13" y="12" width="2"  height="3"  fill="#5a1a1a"/>
    </svg>
  );
}

function AngelIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="4"  y="1"  width="8"  height="1"  fill="#e6db74"/>
      <rect x="3"  y="2"  width="10" height="1"  fill="#e6db74"/>
      <rect x="3"  y="3"  width="2"  height="1"  fill="#e6db74"/>
      <rect x="11" y="3"  width="2"  height="1"  fill="#e6db74"/>
      <rect x="5"  y="4"  width="6"  height="5"  fill="#f4e4c0"/>
      <rect x="6"  y="6"  width="2"  height="1"  fill="#6090e0"/>
      <rect x="10" y="6"  width="2"  height="1"  fill="#6090e0"/>
      <rect x="1"  y="9"  width="4"  height="5"  fill="#f0f0f8"/>
      <rect x="11" y="9"  width="4"  height="5"  fill="#f0f0f8"/>
      <rect x="1"  y="9"  width="2"  height="3"  fill="#ffffff"/>
      <rect x="13" y="9"  width="2"  height="3"  fill="#ffffff"/>
      <rect x="5"  y="9"  width="6"  height="6"  fill="#d4c8f0"/>
      <rect x="4"  y="10" width="1"  height="4"  fill="#d4c8f0"/>
      <rect x="11" y="10" width="1"  height="4"  fill="#d4c8f0"/>
    </svg>
  );
}

function SpiritIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="6"  y="1"  width="4"  height="2"  fill="#66d9e8"/>
      <rect x="5"  y="3"  width="6"  height="4"  fill="#66d9e8"/>
      <rect x="4"  y="7"  width="8"  height="4"  fill="#66d9e8"/>
      <rect x="5"  y="11" width="6"  height="2"  fill="#66d9e8"/>
      <rect x="4"  y="13" width="2"  height="2"  fill="#66d9e8"/>
      <rect x="7"  y="13" width="2"  height="2"  fill="#66d9e8"/>
      <rect x="10" y="13" width="2"  height="2"  fill="#66d9e8"/>
      <rect x="6"  y="4"  width="4"  height="3"  fill="#b0eff6"/>
      <rect x="7"  y="3"  width="2"  height="1"  fill="#b0eff6"/>
      <rect x="6"  y="7"  width="2"  height="2"  fill="#ffffff"/>
      <rect x="9"  y="7"  width="2"  height="2"  fill="#ffffff"/>
      <rect x="7"  y="8"  width="1"  height="1"  fill="#66d9e8"/>
      <rect x="10" y="8"  width="1"  height="1"  fill="#66d9e8"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   SIZES
   ══════════════════════════════════════════════════════════ */

function SizeSmallIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1"  y="11" width="3"  height="4"  fill="#cfd8e2"/>
      <rect x="6"  y="7"  width="4"  height="8"  fill="#4a4a5a"/>
      <rect x="12" y="4"  width="3"  height="11" fill="#4a4a5a"/>
      <rect x="1"  y="15" width="14" height="1"  fill="#5a5a6a"/>
      <rect x="1"  y="8"  width="1"  height="2"  fill="#e6db74"/>
      <rect x="3"  y="10" width="1"  height="2"  fill="#e6db74"/>
      <rect x="2"  y="10" width="1"  height="1"  fill="#e6db74"/>
    </svg>
  );
}

function SizeMediumIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1"  y="11" width="3"  height="4"  fill="#4a4a5a"/>
      <rect x="6"  y="7"  width="4"  height="8"  fill="#cfd8e2"/>
      <rect x="12" y="4"  width="3"  height="11" fill="#4a4a5a"/>
      <rect x="1"  y="15" width="14" height="1"  fill="#5a5a6a"/>
      <rect x="6"  y="4"  width="1"  height="2"  fill="#e6db74"/>
      <rect x="9"  y="4"  width="1"  height="2"  fill="#e6db74"/>
      <rect x="7"  y="5"  width="2"  height="1"  fill="#e6db74"/>
    </svg>
  );
}

function SizeLargeIcon() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1"  y="11" width="3"  height="4"  fill="#4a4a5a"/>
      <rect x="6"  y="7"  width="4"  height="8"  fill="#4a4a5a"/>
      <rect x="12" y="4"  width="3"  height="11" fill="#cfd8e2"/>
      <rect x="1"  y="15" width="14" height="1"  fill="#5a5a6a"/>
      <rect x="13" y="1"  width="1"  height="2"  fill="#e6db74"/>
      <rect x="14" y="1"  width="1"  height="3"  fill="#e6db74"/>
      <rect x="13" y="3"  width="1"  height="1"  fill="#e6db74"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   REGISTRY
   ══════════════════════════════════════════════════════════ */
export interface RPGIconProps {
  /** Icon name across weapon, element, race, and size groups. */
  name?: RPGIconName;
  /** Rendered size in px. */
  size?: number;
  style?: CSSProperties;
}

type IconComponent = () => ReactElement;

const ICONS = {
  /* Weapons (6) */
  sword:   SwordIcon,
  staff:   StaffIcon,
  bow:     BowIcon,
  katar:   KatarIcon,
  book:    BookIcon,
  hammer:  HammerIcon,
  /* Elements (8) */
  neutral: NeutralIcon,
  earth:   EarthIcon,
  wind:    WindIcon,
  water:   WaterIcon,
  fire:    FireIcon,
  light:   LightIcon,
  dark:    DarkIcon,
  void:    VoidIcon,
  /* Races (5) */
  human:   HumanIcon,
  beast:   BeastIcon,
  demon:   DemonIcon,
  angel:   AngelIcon,
  spirit:  SpiritIcon,
  /* Sizes (3) */
  small:   SizeSmallIcon,
  medium:  SizeMediumIcon,
  large:   SizeLargeIcon,
} satisfies Record<RPGIconName, IconComponent>;

export const icons = [...rpgIconNames] as RPGIconName[];

/**
 * RPGIcon — 22 original pixel-art icons.
 *
 * Weapons (6):  sword · staff · bow · katar · book · hammer
 * Elements (8): neutral · earth · wind · water · fire · light · dark · void
 * Races (5):    human · beast · demon · angel · spirit
 * Sizes (3):    small · medium · large
 */
export const RPGIcon = Object.assign(function RPGIcon({
  name = 'sword',
  size = 22,
  style,
}: RPGIconProps): ReactElement {
  const Icon = ICONS[name] || SwordIcon;
  return (
    <span style={{
      display:        'inline-flex',
      alignItems:     'center',
      justifyContent: 'center',
      width:          size,
      height:         size,
      imageRendering: 'pixelated',
      flexShrink:     0,
      ...style,
    }}>
      <Icon />
    </span>
  );
}, { icons });

/** @deprecated Use RPGIcon — kept for backward compatibility */
export const HUDIcon = RPGIcon;
