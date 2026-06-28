import type { CSSProperties, ReactElement } from 'react';

import { rpgIconNames } from './registry.js';
import type { RPGIconName } from './registry.js';

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
  RPGIconSkill,
  RPGIconSkin,
  RPGIconWeapon,
} from './registry.js';

/* ── Icon library ──────────────────────────────────────────────────────────
   Original geometric pixel-art on a 24×24 viewBox (scales cleanly; existing
   artwork preserved, wrapped at scale(1.5)). 68 icons across 11 groups:
     Weapons (6)  · Elements (8) · Races (5)  · Sizes (3)
     Attack (6)   · Skills (6)   · Items (6)  · Equip (6)
     Skins (5)    · Menu (8)     · Emotes (9)
   Weapon/attack art reads as a held diagonal; the WEAPON_TILT map rotates it.
   ───────────────────────────────────────────────────────────────────────── */

function SwordIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <line
          x1="14"
          y1="2"
          x2="6"
          y2="10"
          stroke="#cfd8e2"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <line
          x1="13"
          y1="2"
          x2="14"
          y2="3"
          stroke="#eef0f4"
          strokeWidth="1"
          strokeLinecap="square"
        />
        <line
          x1="4"
          y1="9"
          x2="8"
          y2="13"
          stroke="#e6db74"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <line
          x1="6"
          y1="11"
          x2="3"
          y2="14"
          stroke="#b07040"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
}

function BowIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="3" y="1" width="3" height="2" fill="#8a6540" />
        <rect x="2" y="3" width="2" height="10" fill="#8a6540" />
        <rect x="3" y="13" width="3" height="2" fill="#8a6540" />
        <rect x="6" y="2" width="1" height="1" fill="#cfd8e2" />
        <rect x="7" y="3" width="1" height="10" fill="#cfd8e2" />
        <rect x="6" y="13" width="1" height="1" fill="#cfd8e2" />
        <rect x="7" y="7" width="7" height="2" fill="#c8a878" />
        <rect x="13" y="6" width="2" height="1" fill="#cfd8e2" />
        <rect x="14" y="7" width="2" height="2" fill="#cfd8e2" />
        <rect x="13" y="9" width="2" height="1" fill="#cfd8e2" />
        <rect x="7" y="5" width="2" height="2" fill="var(--ns-purple)" />
        <rect x="7" y="9" width="2" height="2" fill="var(--ns-purple)" />
      </g>
    </svg>
  );
}

function StaffIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#c8a8ff" />
        <rect x="4" y="2" width="8" height="4" fill="var(--ns-purple)" />
        <rect x="5" y="6" width="6" height="1" fill="#c8a8ff" />
        <rect x="6" y="3" width="4" height="2" fill="#d4b8ff" />
        <rect x="7" y="7" width="2" height="8" fill="#8a6540" />
        <rect x="6" y="10" width="4" height="1" fill="#b07040" />
      </g>
    </svg>
  );
}

function KatarIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="1" width="2" height="8" fill="#cfd8e2" />
        <rect x="2" y="9" width="2" height="3" fill="#a8b0bc" />
        <rect x="12" y="1" width="2" height="8" fill="#cfd8e2" />
        <rect x="12" y="9" width="2" height="3" fill="#a8b0bc" />
        <rect x="2" y="8" width="12" height="2" fill="var(--hud-gold)" />
        <rect x="6" y="10" width="4" height="5" fill="#8a6540" />
        <rect x="3" y="0" width="1" height="1" fill="#eef0f4" />
        <rect x="12" y="0" width="1" height="1" fill="#eef0f4" />
      </g>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="2" width="2" height="12" fill="#6a4a6a" />
        <rect x="4" y="2" width="10" height="12" fill="#8855aa" />
        <rect x="13" y="3" width="1" height="10" fill="#f4f0e8" />
        <rect x="7" y="4" width="2" height="1" fill="#c8a8ff" />
        <rect x="6" y="5" width="4" height="1" fill="#c8a8ff" />
        <rect x="7" y="6" width="2" height="1" fill="#c8a8ff" />
        <rect x="6" y="8" width="4" height="1" fill="var(--hud-gold)" />
        <rect x="7" y="9" width="2" height="2" fill="var(--hud-gold)" />
      </g>
    </svg>
  );
}

function HammerIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="4" y="1" width="8" height="1" fill="#a8b0bc" />
        <rect x="3" y="2" width="10" height="5" fill="#a8b0bc" />
        <rect x="3" y="2" width="10" height="1" fill="#cfd8e2" />
        <rect x="3" y="3" width="1" height="3" fill="#cfd8e2" />
        <rect x="3" y="7" width="10" height="1" fill="#5a6570" />
        <rect x="7" y="7" width="2" height="8" fill="#8a6540" />
        <rect x="6" y="10" width="4" height="1" fill="#b07040" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   ELEMENTS — color is the primary signal
   ══════════════════════════════════════════════════════════ */

function NeutralIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="6" width="12" height="4" fill="#7a7a8a" />
        <rect x="6" y="2" width="4" height="12" fill="#7a7a8a" />
        <rect x="3" y="3" width="2" height="2" fill="#7a7a8a" />
        <rect x="11" y="3" width="2" height="2" fill="#7a7a8a" />
        <rect x="3" y="11" width="2" height="2" fill="#7a7a8a" />
        <rect x="11" y="11" width="2" height="2" fill="#7a7a8a" />
        <rect x="7" y="7" width="2" height="2" fill="#b0b0c0" />
        <rect x="7" y="4" width="2" height="1" fill="#b0b0c0" />
        <rect x="7" y="11" width="2" height="1" fill="#b0b0c0" />
        <rect x="4" y="7" width="1" height="2" fill="#b0b0c0" />
        <rect x="11" y="7" width="1" height="2" fill="#b0b0c0" />
      </g>
    </svg>
  );
}

function EarthIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="2" width="2" height="2" fill="#c8a050" />
        <rect x="6" y="4" width="4" height="2" fill="#c8a050" />
        <rect x="5" y="6" width="6" height="2" fill="#8b6914" />
        <rect x="4" y="8" width="8" height="2" fill="#8b6914" />
        <rect x="3" y="10" width="10" height="2" fill="#6a5010" />
        <rect x="1" y="12" width="14" height="3" fill="#5a4008" />
        <rect x="7" y="2" width="2" height="1" fill="#f0ece0" />
        <rect x="6" y="3" width="4" height="1" fill="#f0ece0" />
        <rect x="5" y="8" width="1" height="1" fill="#a07820" />
        <rect x="10" y="9" width="1" height="1" fill="#a07820" />
      </g>
    </svg>
  );
}

function WindIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="4" width="10" height="1" fill="var(--hud-el-wind)" />
        <rect x="3" y="5" width="2" height="1" fill="var(--hud-el-wind)" />
        <rect x="12" y="3" width="2" height="2" fill="var(--hud-el-wind)" />
        <rect x="13" y="5" width="1" height="1" fill="var(--hud-el-wind)" />
        <rect x="1" y="7" width="11" height="2" fill="var(--hud-el-wind)" />
        <rect x="12" y="6" width="2" height="4" fill="var(--hud-el-wind)" />
        <rect x="11" y="10" width="2" height="1" fill="var(--hud-el-wind)" />
        <rect x="2" y="12" width="9" height="1" fill="var(--hud-el-wind)" />
        <rect x="2" y="11" width="2" height="1" fill="var(--hud-el-wind)" />
        <rect x="11" y="12" width="2" height="2" fill="var(--hud-el-wind)" />
        <rect x="10" y="14" width="2" height="1" fill="var(--hud-el-wind)" />
        <rect x="2" y="3" width="8" height="1" fill="#90e8cc" />
        <rect x="2" y="8" width="9" height="1" fill="#90e8cc" />
      </g>
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="6" y="1" width="4" height="1" fill="var(--hud-el-water)" />
        <rect x="5" y="2" width="6" height="2" fill="var(--hud-el-water)" />
        <rect x="4" y="4" width="8" height="6" fill="var(--hud-el-water)" />
        <rect x="5" y="10" width="6" height="2" fill="var(--hud-el-water)" />
        <rect x="6" y="12" width="4" height="2" fill="var(--hud-el-water)" />
        <rect x="7" y="14" width="2" height="1" fill="var(--hud-el-water)" />
        <rect x="6" y="4" width="3" height="4" fill="#70b8f0" />
        <rect x="7" y="3" width="2" height="1" fill="#70b8f0" />
        <rect x="5" y="7" width="2" height="1" fill="#1a5a9a" />
        <rect x="9" y="8" width="2" height="1" fill="#1a5a9a" />
      </g>
    </svg>
  );
}

function FireIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="4" y="11" width="8" height="4" fill="var(--hud-el-fire)" />
        <rect x="3" y="8" width="10" height="3" fill="var(--hud-el-fire)" />
        <rect x="4" y="5" width="8" height="3" fill="var(--hud-el-fire)" />
        <rect x="5" y="3" width="6" height="2" fill="var(--hud-el-fire)" />
        <rect x="6" y="1" width="4" height="2" fill="var(--hud-el-fire)" />
        <rect x="5" y="9" width="6" height="5" fill="#e8882a" />
        <rect x="6" y="7" width="4" height="2" fill="#e8882a" />
        <rect x="6" y="10" width="4" height="3" fill="var(--hud-gold)" />
        <rect x="7" y="9" width="2" height="1" fill="var(--hud-gold)" />
      </g>
    </svg>
  );
}

function DarkIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="2" width="6" height="2" fill="var(--hud-el-neutral)" />
        <rect x="3" y="4" width="8" height="8" fill="var(--hud-el-neutral)" />
        <rect x="5" y="12" width="6" height="2" fill="var(--hud-el-neutral)" />
        <rect x="4" y="3" width="1" height="10" fill="var(--hud-el-neutral)" />
        <rect x="8" y="4" width="4" height="8" fill="#1a1a20" />
        <rect x="7" y="5" width="5" height="6" fill="#1a1a20" />
        <rect x="11" y="2" width="1" height="1" fill="#c8c8d0" />
        <rect x="13" y="5" width="1" height="1" fill="#c8c8d0" />
        <rect x="12" y="9" width="1" height="1" fill="#c8c8d0" />
      </g>
    </svg>
  );
}

function LightIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="5" width="6" height="6" fill="var(--hud-el-light)" />
        <rect x="6" y="4" width="4" height="1" fill="var(--hud-el-light)" />
        <rect x="6" y="11" width="4" height="1" fill="var(--hud-el-light)" />
        <rect x="4" y="6" width="1" height="4" fill="var(--hud-el-light)" />
        <rect x="11" y="6" width="1" height="4" fill="var(--hud-el-light)" />
        <rect x="7" y="1" width="2" height="3" fill="var(--hud-el-light)" />
        <rect x="7" y="12" width="2" height="3" fill="var(--hud-el-light)" />
        <rect x="1" y="7" width="3" height="2" fill="var(--hud-el-light)" />
        <rect x="12" y="7" width="3" height="2" fill="var(--hud-el-light)" />
        <rect x="3" y="3" width="2" height="2" fill="var(--hud-el-light)" />
        <rect x="11" y="3" width="2" height="2" fill="var(--hud-el-light)" />
        <rect x="3" y="11" width="2" height="2" fill="var(--hud-el-light)" />
        <rect x="11" y="11" width="2" height="2" fill="var(--hud-el-light)" />
        <rect x="6" y="6" width="4" height="4" fill="#fff8e0" />
      </g>
    </svg>
  );
}

function VoidIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="2" fill="var(--hud-el-void)" />
        <rect x="3" y="3" width="10" height="2" fill="var(--hud-el-void)" />
        <rect x="2" y="5" width="12" height="6" fill="var(--hud-el-void)" />
        <rect x="3" y="11" width="10" height="2" fill="var(--hud-el-void)" />
        <rect x="5" y="13" width="6" height="2" fill="var(--hud-el-void)" />
        <rect x="4" y="4" width="8" height="8" fill="#1a1828" />
        <rect x="5" y="3" width="6" height="1" fill="#1a1828" />
        <rect x="5" y="12" width="6" height="1" fill="#1a1828" />
        <rect x="3" y="5" width="1" height="6" fill="#1a1828" />
        <rect x="12" y="5" width="1" height="6" fill="#1a1828" />
        <rect x="6" y="6" width="4" height="4" fill="#4a44aa" />
        <rect x="7" y="5" width="2" height="1" fill="#4a44aa" />
        <rect x="7" y="10" width="2" height="1" fill="#4a44aa" />
        <rect x="5" y="7" width="1" height="2" fill="#4a44aa" />
        <rect x="10" y="7" width="1" height="2" fill="#4a44aa" />
        <rect x="7" y="7" width="2" height="2" fill="#c8c0ff" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   RACES
   ══════════════════════════════════════════════════════════ */

function HumanIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="5" fill="#e8c87a" />
        <rect x="7" y="6" width="2" height="1" fill="#d4a85a" />
        <rect x="3" y="7" width="10" height="5" fill="#c8873a" />
        <rect x="1" y="7" width="2" height="4" fill="#c8873a" />
        <rect x="13" y="7" width="2" height="4" fill="#c8873a" />
        <rect x="4" y="12" width="3" height="3" fill="#8a5c2a" />
        <rect x="9" y="12" width="3" height="3" fill="#8a5c2a" />
      </g>
    </svg>
  );
}

function BeastIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="1" width="3" height="4" fill="#c8a060" />
        <rect x="11" y="1" width="3" height="4" fill="#c8a060" />
        <rect x="3" y="2" width="1" height="2" fill="#e8886a" />
        <rect x="12" y="2" width="1" height="2" fill="#e8886a" />
        <rect x="3" y="4" width="10" height="6" fill="#c8a060" />
        <rect x="5" y="8" width="6" height="3" fill="#d4b070" />
        <rect x="7" y="8" width="2" height="1" fill="#5a3020" />
        <rect x="4" y="6" width="3" height="2" fill="#e8a020" />
        <rect x="9" y="6" width="3" height="2" fill="#e8a020" />
        <rect x="5" y="6" width="1" height="2" fill="#1a1008" />
        <rect x="10" y="6" width="1" height="2" fill="#1a1008" />
        <rect x="3" y="11" width="10" height="4" fill="#a87840" />
        <rect x="1" y="11" width="2" height="3" fill="#a87840" />
        <rect x="13" y="11" width="2" height="3" fill="#a87840" />
      </g>
    </svg>
  );
}

function DemonIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="3" y="1" width="2" height="5" fill="#cc3030" />
        <rect x="11" y="1" width="2" height="5" fill="#cc3030" />
        <rect x="2" y="1" width="2" height="2" fill="#cc3030" />
        <rect x="12" y="1" width="2" height="2" fill="#cc3030" />
        <rect x="3" y="5" width="10" height="6" fill="#7a2a2a" />
        <rect x="4" y="7" width="3" height="2" fill="#ff2020" />
        <rect x="9" y="7" width="3" height="2" fill="#ff2020" />
        <rect x="5" y="7" width="1" height="2" fill="#ff8080" />
        <rect x="10" y="7" width="1" height="2" fill="#ff8080" />
        <rect x="6" y="11" width="1" height="2" fill="#f0e8d0" />
        <rect x="9" y="11" width="1" height="2" fill="#f0e8d0" />
        <rect x="2" y="12" width="12" height="4" fill="#5a1a1a" />
        <rect x="1" y="12" width="2" height="3" fill="#5a1a1a" />
        <rect x="13" y="12" width="2" height="3" fill="#5a1a1a" />
      </g>
    </svg>
  );
}

function AngelIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="4" y="1" width="8" height="1" fill="var(--hud-gold)" />
        <rect x="3" y="2" width="10" height="1" fill="var(--hud-gold)" />
        <rect x="3" y="3" width="2" height="1" fill="var(--hud-gold)" />
        <rect x="11" y="3" width="2" height="1" fill="var(--hud-gold)" />
        <rect x="5" y="4" width="6" height="5" fill="#f4e4c0" />
        <rect x="6" y="6" width="2" height="1" fill="#6090e0" />
        <rect x="10" y="6" width="2" height="1" fill="#6090e0" />
        <rect x="1" y="9" width="4" height="5" fill="#f0f0f8" />
        <rect x="11" y="9" width="4" height="5" fill="#f0f0f8" />
        <rect x="1" y="9" width="2" height="3" fill="#ffffff" />
        <rect x="13" y="9" width="2" height="3" fill="#ffffff" />
        <rect x="5" y="9" width="6" height="6" fill="#d4c8f0" />
        <rect x="4" y="10" width="1" height="4" fill="#d4c8f0" />
        <rect x="11" y="10" width="1" height="4" fill="#d4c8f0" />
      </g>
    </svg>
  );
}

function SpiritIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="6" y="1" width="4" height="2" fill="var(--ns-cyan)" />
        <rect x="5" y="3" width="6" height="4" fill="var(--ns-cyan)" />
        <rect x="4" y="7" width="8" height="4" fill="var(--ns-cyan)" />
        <rect x="5" y="11" width="6" height="2" fill="var(--ns-cyan)" />
        <rect x="4" y="13" width="2" height="2" fill="var(--ns-cyan)" />
        <rect x="7" y="13" width="2" height="2" fill="var(--ns-cyan)" />
        <rect x="10" y="13" width="2" height="2" fill="var(--ns-cyan)" />
        <rect x="6" y="4" width="4" height="3" fill="#b0eff6" />
        <rect x="7" y="3" width="2" height="1" fill="#b0eff6" />
        <rect x="6" y="7" width="2" height="2" fill="#ffffff" />
        <rect x="9" y="7" width="2" height="2" fill="#ffffff" />
        <rect x="7" y="8" width="1" height="1" fill="var(--ns-cyan)" />
        <rect x="10" y="8" width="1" height="1" fill="var(--ns-cyan)" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   SIZES
   ══════════════════════════════════════════════════════════ */

function SizeSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="1" y="11" width="3" height="4" fill="#cfd8e2" />
        <rect x="6" y="7" width="4" height="8" fill="#4a4a5a" />
        <rect x="12" y="4" width="3" height="11" fill="#4a4a5a" />
        <rect x="1" y="15" width="14" height="1" fill="#5a5a6a" />
        <rect x="1" y="8" width="1" height="2" fill="var(--hud-gold)" />
        <rect x="3" y="10" width="1" height="2" fill="var(--hud-gold)" />
        <rect x="2" y="10" width="1" height="1" fill="var(--hud-gold)" />
      </g>
    </svg>
  );
}

function SizeMediumIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="1" y="11" width="3" height="4" fill="#4a4a5a" />
        <rect x="6" y="7" width="4" height="8" fill="#cfd8e2" />
        <rect x="12" y="4" width="3" height="11" fill="#4a4a5a" />
        <rect x="1" y="15" width="14" height="1" fill="#5a5a6a" />
        <rect x="6" y="4" width="1" height="2" fill="var(--hud-gold)" />
        <rect x="9" y="4" width="1" height="2" fill="var(--hud-gold)" />
        <rect x="7" y="5" width="2" height="1" fill="var(--hud-gold)" />
      </g>
    </svg>
  );
}

function SizeLargeIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="1" y="11" width="3" height="4" fill="#4a4a5a" />
        <rect x="6" y="7" width="4" height="8" fill="#4a4a5a" />
        <rect x="12" y="4" width="3" height="11" fill="#cfd8e2" />
        <rect x="1" y="15" width="14" height="1" fill="#5a5a6a" />
        <rect x="13" y="1" width="1" height="2" fill="var(--hud-gold)" />
        <rect x="14" y="1" width="1" height="3" fill="var(--hud-gold)" />
        <rect x="13" y="3" width="1" height="1" fill="var(--hud-gold)" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   ATTACK (reuses weapon silhouettes in steel)
   ══════════════════════════════════════════════════════════ */

function AttackSwordIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <line
          x1="14"
          y1="2"
          x2="6"
          y2="10"
          stroke="#c0c8d0"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <line
          x1="13"
          y1="2"
          x2="14"
          y2="3"
          stroke="#e8ecf0"
          strokeWidth="1"
          strokeLinecap="square"
        />
        <line
          x1="4"
          y1="9"
          x2="8"
          y2="13"
          stroke="#8a9098"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <line
          x1="6"
          y1="11"
          x2="3"
          y2="14"
          stroke="#5a6268"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
}

function AttackBowIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="3" y="1" width="3" height="2" fill="#6a7278" />
        <rect x="2" y="3" width="2" height="10" fill="#6a7278" />
        <rect x="3" y="13" width="3" height="2" fill="#6a7278" />
        <rect x="6" y="2" width="1" height="1" fill="#c0c8d0" />
        <rect x="7" y="3" width="1" height="10" fill="#c0c8d0" />
        <rect x="6" y="13" width="1" height="1" fill="#c0c8d0" />
        <rect x="7" y="7" width="7" height="2" fill="#9aa2aa" />
        <rect x="13" y="6" width="2" height="1" fill="#c0c8d0" />
        <rect x="14" y="7" width="2" height="2" fill="#c0c8d0" />
        <rect x="13" y="9" width="2" height="1" fill="#c0c8d0" />
        <rect x="7" y="5" width="2" height="2" fill="#8a9098" />
        <rect x="7" y="9" width="2" height="2" fill="#8a9098" />
      </g>
    </svg>
  );
}

function AttackStaffIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#9aa2aa" />
        <rect x="4" y="2" width="8" height="4" fill="#8a9098" />
        <rect x="5" y="6" width="6" height="1" fill="#9aa2aa" />
        <rect x="6" y="3" width="4" height="2" fill="#b0b8c0" />
        <rect x="7" y="7" width="2" height="8" fill="#6a7278" />
        <rect x="6" y="10" width="4" height="1" fill="#7a8290" />
      </g>
    </svg>
  );
}

function AttackKatarIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="1" width="2" height="8" fill="#c0c8d0" />
        <rect x="2" y="9" width="2" height="3" fill="#9aa2aa" />
        <rect x="12" y="1" width="2" height="8" fill="#c0c8d0" />
        <rect x="12" y="9" width="2" height="3" fill="#9aa2aa" />
        <rect x="2" y="8" width="12" height="2" fill="#8a9098" />
        <rect x="6" y="10" width="4" height="5" fill="#6a7278" />
        <rect x="3" y="0" width="1" height="1" fill="#e8ecf0" />
        <rect x="12" y="0" width="1" height="1" fill="#e8ecf0" />
      </g>
    </svg>
  );
}

function AttackBookIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="2" width="2" height="12" fill="#5a6268" />
        <rect x="4" y="2" width="10" height="12" fill="#7a8290" />
        <rect x="13" y="3" width="1" height="10" fill="#e8ecf0" />
        <rect x="7" y="4" width="2" height="1" fill="#9aa2aa" />
        <rect x="6" y="5" width="4" height="1" fill="#9aa2aa" />
        <rect x="7" y="6" width="2" height="1" fill="#9aa2aa" />
        <rect x="6" y="8" width="4" height="1" fill="#a0a8b0" />
        <rect x="7" y="9" width="2" height="2" fill="#a0a8b0" />
      </g>
    </svg>
  );
}

function AttackHammerIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="4" y="1" width="8" height="1" fill="#9aa2aa" />
        <rect x="3" y="2" width="10" height="5" fill="#9aa2aa" />
        <rect x="3" y="2" width="10" height="1" fill="#c0c8d0" />
        <rect x="3" y="3" width="1" height="3" fill="#c0c8d0" />
        <rect x="3" y="7" width="10" height="1" fill="#5a6268" />
        <rect x="7" y="7" width="2" height="8" fill="#6a7278" />
        <rect x="6" y="10" width="4" height="1" fill="#7a8290" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   SKILLS / techniques
   ══════════════════════════════════════════════════════════ */

function PassiveIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#5a6a7a" />
        <rect x="4" y="2" width="8" height="8" fill="#4a5a6a" />
        <rect x="5" y="10" width="6" height="2" fill="#4a5a6a" />
        <rect x="6" y="12" width="4" height="2" fill="#4a5a6a" />
        <rect x="7" y="14" width="2" height="1" fill="#4a5a6a" />
        <rect x="6" y="4" width="4" height="4" fill="#5dcaa5" />
        <rect x="7" y="3" width="2" height="1" fill="#5dcaa5" />
        <rect x="5" y="5" width="1" height="2" fill="#5dcaa5" />
        <rect x="10" y="5" width="1" height="2" fill="#5dcaa5" />
        <rect x="7" y="8" width="2" height="1" fill="#5dcaa5" />
      </g>
    </svg>
  );
}

function ActiveIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="1" width="2" height="3" fill="#fac775" />
        <rect x="7" y="12" width="2" height="3" fill="#fac775" />
        <rect x="1" y="7" width="3" height="2" fill="#fac775" />
        <rect x="12" y="7" width="3" height="2" fill="#fac775" />
        <rect x="3" y="3" width="2" height="2" fill="#fac775" />
        <rect x="11" y="3" width="2" height="2" fill="#fac775" />
        <rect x="3" y="11" width="2" height="2" fill="#fac775" />
        <rect x="11" y="11" width="2" height="2" fill="#fac775" />
        <rect x="5" y="5" width="6" height="6" fill="#ff9040" />
        <rect x="6" y="6" width="4" height="4" fill="#ffdd80" />
        <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
      </g>
    </svg>
  );
}

function ComboIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="6" width="3" height="4" fill="#ae81ff" />
        <rect x="7" y="4" width="3" height="4" fill="#ae81ff" />
        <rect x="12" y="6" width="3" height="4" fill="#ae81ff" />
        <rect x="5" y="7" width="2" height="2" fill="#7f77dd" />
        <rect x="10" y="7" width="2" height="2" fill="#7f77dd" />
        <rect x="3" y="11" width="2" height="1" fill="#c8a8ff" />
        <rect x="8" y="9" width="2" height="1" fill="#c8a8ff" />
        <rect x="13" y="11" width="2" height="1" fill="#c8a8ff" />
      </g>
    </svg>
  );
}

function StanceIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="1" width="2" height="2" fill="#cfd8e2" />
        <rect x="6" y="3" width="4" height="4" fill="#cfd8e2" />
        <rect x="3" y="4" width="3" height="2" fill="#cfd8e2" />
        <rect x="10" y="3" width="3" height="2" fill="#cfd8e2" />
        <rect x="12" y="2" width="2" height="2" fill="#e6db74" />
        <rect x="5" y="7" width="2" height="4" fill="#cfd8e2" />
        <rect x="9" y="7" width="2" height="4" fill="#cfd8e2" />
        <rect x="4" y="11" width="2" height="3" fill="#cfd8e2" />
        <rect x="10" y="11" width="2" height="3" fill="#cfd8e2" />
        <rect x="7" y="3" width="2" height="1" fill="#eef0f4" />
      </g>
    </svg>
  );
}

function BuffIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="1" width="2" height="1" fill="#5dcaa5" />
        <rect x="6" y="2" width="4" height="2" fill="#5dcaa5" />
        <rect x="5" y="4" width="6" height="2" fill="#5dcaa5" />
        <rect x="7" y="6" width="2" height="9" fill="#5dcaa5" />
        <rect x="6" y="3" width="1" height="1" fill="#90e8cc" />
        <rect x="9" y="3" width="1" height="1" fill="#90e8cc" />
        <rect x="5" y="5" width="1" height="1" fill="#90e8cc" />
        <rect x="10" y="5" width="1" height="1" fill="#90e8cc" />
      </g>
    </svg>
  );
}

function DebuffIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="5" width="2" height="9" fill="#cc3030" />
        <rect x="5" y="10" width="6" height="2" fill="#cc3030" />
        <rect x="6" y="12" width="4" height="2" fill="#cc3030" />
        <rect x="7" y="14" width="2" height="1" fill="#cc3030" />
        <rect x="5" y="11" width="1" height="1" fill="#ff8080" />
        <rect x="10" y="11" width="1" height="1" fill="#ff8080" />
        <rect x="6" y="13" width="1" height="1" fill="#ff8080" />
        <rect x="9" y="13" width="1" height="1" fill="#ff8080" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   ITEMS — consumables & valuables
   ══════════════════════════════════════════════════════════ */

function PotionIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="1" width="2" height="2" fill="#a8b0bc" />
        <rect x="6" y="3" width="4" height="1" fill="#c8a050" />
        <rect x="5" y="4" width="6" height="10" fill="#cfd8e2" />
        <rect x="4" y="6" width="8" height="7" fill="#cfd8e2" />
        <rect x="5" y="7" width="6" height="6" fill="#ff4080" />
        <rect x="4" y="9" width="8" height="4" fill="#ff4080" />
        <rect x="5" y="5" width="2" height="3" fill="#eef0f4" />
        <rect x="5" y="14" width="6" height="1" fill="#a8b0bc" />
        <rect x="4" y="13" width="8" height="1" fill="#a8b0bc" />
      </g>
    </svg>
  );
}

function EtherIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="1" width="2" height="3" fill="#a8b0bc" />
        <rect x="6" y="3" width="4" height="1" fill="#5dcaa5" />
        <rect x="5" y="4" width="6" height="9" fill="#cfd8e2" />
        <rect x="4" y="6" width="8" height="6" fill="#cfd8e2" />
        <rect x="5" y="6" width="6" height="6" fill="#66d9e8" />
        <rect x="4" y="8" width="8" height="3" fill="#66d9e8" />
        <rect x="6" y="7" width="2" height="3" fill="#b0eff6" />
        <rect x="5" y="13" width="6" height="1" fill="#a8b0bc" />
        <rect x="4" y="12" width="8" height="1" fill="#a8b0bc" />
      </g>
    </svg>
  );
}

function ScrollIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="1" y="4" width="3" height="8" fill="#c8a050" />
        <rect x="2" y="3" width="2" height="10" fill="#d4b060" />
        <rect x="12" y="4" width="3" height="8" fill="#c8a050" />
        <rect x="12" y="3" width="2" height="10" fill="#d4b060" />
        <rect x="3" y="2" width="10" height="12" fill="#f0e8c0" />
        <rect x="2" y="4" width="12" height="8" fill="#f0e8c0" />
        <rect x="5" y="5" width="6" height="1" fill="#c8a050" />
        <rect x="5" y="7" width="6" height="1" fill="#c8a050" />
        <rect x="5" y="9" width="4" height="1" fill="#c8a050" />
      </g>
    </svg>
  );
}

function GemIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="6" y="1" width="4" height="1" fill="#b0eff6" />
        <rect x="5" y="2" width="6" height="2" fill="#66d9e8" />
        <rect x="4" y="4" width="8" height="1" fill="#b0eff6" />
        <rect x="3" y="5" width="10" height="4" fill="#378add" />
        <rect x="4" y="5" width="4" height="3" fill="#66d9e8" />
        <rect x="4" y="9" width="8" height="2" fill="#1a5a9a" />
        <rect x="5" y="11" width="6" height="2" fill="#1a5a9a" />
        <rect x="6" y="13" width="4" height="1" fill="#1a5a9a" />
        <rect x="7" y="14" width="2" height="1" fill="#1a5a9a" />
      </g>
    </svg>
  );
}

function RelicIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#c8a050" />
        <rect x="3" y="2" width="2" height="2" fill="#c8a050" />
        <rect x="11" y="2" width="2" height="2" fill="#c8a050" />
        <rect x="4" y="4" width="8" height="10" fill="#e6db74" />
        <rect x="3" y="6" width="10" height="6" fill="#e6db74" />
        <rect x="6" y="6" width="4" height="6" fill="#ae81ff" />
        <rect x="5" y="7" width="6" height="4" fill="#ae81ff" />
        <rect x="7" y="7" width="2" height="4" fill="#c8a8ff" />
        <rect x="4" y="4" width="2" height="2" fill="#c8a050" />
        <rect x="10" y="4" width="2" height="2" fill="#c8a050" />
        <rect x="4" y="12" width="2" height="2" fill="#c8a050" />
        <rect x="10" y="12" width="2" height="2" fill="#c8a050" />
      </g>
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#e6db74" />
        <rect x="4" y="2" width="8" height="5" fill="#e6db74" />
        <rect x="4" y="2" width="2" height="5" fill="#c8a050" />
        <rect x="5" y="3" width="6" height="3" fill="#c8a050" />
        <rect x="6" y="4" width="4" height="1" fill="#1a1a20" />
        <rect x="7" y="7" width="2" height="8" fill="#e6db74" />
        <rect x="9" y="10" width="3" height="1" fill="#e6db74" />
        <rect x="9" y="12" width="2" height="1" fill="#e6db74" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   EQUIP — gear slots
   ══════════════════════════════════════════════════════════ */

function HelmIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#a8b0bc" />
        <rect x="4" y="2" width="8" height="2" fill="#a8b0bc" />
        <rect x="3" y="4" width="10" height="4" fill="#a8b0bc" />
        <rect x="3" y="4" width="10" height="1" fill="#cfd8e2" />
        <rect x="3" y="5" width="1" height="3" fill="#cfd8e2" />
        <rect x="4" y="6" width="8" height="2" fill="#1a2a38" />
        <rect x="2" y="8" width="12" height="4" fill="#a8b0bc" />
        <rect x="2" y="8" width="12" height="1" fill="#7a8290" />
        <rect x="5" y="10" width="6" height="1" fill="#7a8290" />
      </g>
    </svg>
  );
}

function ArmorIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="1" y="2" width="4" height="5" fill="#a8b0bc" />
        <rect x="11" y="2" width="4" height="5" fill="#a8b0bc" />
        <rect x="3" y="4" width="10" height="10" fill="#a8b0bc" />
        <rect x="4" y="3" width="8" height="11" fill="#a8b0bc" />
        <rect x="4" y="4" width="4" height="8" fill="#cfd8e2" />
        <rect x="7" y="3" width="2" height="11" fill="#5a6570" />
        <rect x="4" y="14" width="8" height="1" fill="#7a8290" />
        <rect x="6" y="1" width="4" height="3" fill="#8a9290" />
      </g>
    </svg>
  );
}

function CloakIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="6" y="1" width="4" height="2" fill="#7a6aaa" />
        <rect x="5" y="3" width="6" height="2" fill="#7a6aaa" />
        <rect x="3" y="5" width="10" height="8" fill="#5a4a8a" />
        <rect x="2" y="7" width="12" height="5" fill="#5a4a8a" />
        <rect x="3" y="5" width="2" height="8" fill="#7a6aaa" />
        <rect x="11" y="5" width="2" height="8" fill="#7a6aaa" />
        <rect x="4" y="13" width="2" height="2" fill="#5a4a8a" />
        <rect x="10" y="13" width="2" height="2" fill="#5a4a8a" />
        <rect x="7" y="2" width="2" height="1" fill="#c8a8ff" />
      </g>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="4" y="1" width="8" height="1" fill="#a8b0bc" />
        <rect x="3" y="2" width="10" height="7" fill="#a8b0bc" />
        <rect x="3" y="2" width="10" height="1" fill="#cfd8e2" />
        <rect x="3" y="3" width="1" height="6" fill="#cfd8e2" />
        <rect x="4" y="9" width="8" height="3" fill="#a8b0bc" />
        <rect x="5" y="12" width="6" height="2" fill="#a8b0bc" />
        <rect x="6" y="14" width="4" height="1" fill="#a8b0bc" />
        <rect x="7" y="4" width="2" height="5" fill="#378add" />
        <rect x="5" y="6" width="6" height="2" fill="#378add" />
      </g>
    </svg>
  );
}

function RingIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="6" y="2" width="4" height="1" fill="#e6db74" />
        <rect x="4" y="3" width="2" height="2" fill="#e6db74" />
        <rect x="10" y="3" width="2" height="2" fill="#e6db74" />
        <rect x="3" y="5" width="2" height="4" fill="#e6db74" />
        <rect x="11" y="5" width="2" height="4" fill="#e6db74" />
        <rect x="4" y="9" width="2" height="2" fill="#e6db74" />
        <rect x="10" y="9" width="2" height="2" fill="#e6db74" />
        <rect x="6" y="11" width="4" height="1" fill="#e6db74" />
        <rect x="6" y="4" width="4" height="5" fill="#ae81ff" />
        <rect x="7" y="5" width="2" height="3" fill="#c8a8ff" />
      </g>
    </svg>
  );
}

function GreavesIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="3" y="1" width="4" height="7" fill="#a8b0bc" />
        <rect x="9" y="1" width="4" height="7" fill="#a8b0bc" />
        <rect x="3" y="1" width="4" height="1" fill="#cfd8e2" />
        <rect x="9" y="1" width="4" height="1" fill="#cfd8e2" />
        <rect x="3" y="3" width="1" height="4" fill="#cfd8e2" />
        <rect x="9" y="3" width="1" height="4" fill="#cfd8e2" />
        <rect x="2" y="8" width="5" height="4" fill="#a8b0bc" />
        <rect x="9" y="8" width="5" height="4" fill="#a8b0bc" />
        <rect x="1" y="12" width="7" height="3" fill="#a8b0bc" />
        <rect x="8" y="12" width="7" height="3" fill="#a8b0bc" />
        <rect x="1" y="12" width="7" height="1" fill="#cfd8e2" />
        <rect x="8" y="12" width="7" height="1" fill="#cfd8e2" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   SKINS — cosmetic apparel
   ══════════════════════════════════════════════════════════ */

function HatIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="1" y="9" width="14" height="2" fill="#8a6540" />
        <rect x="2" y="8" width="12" height="1" fill="#8a6540" />
        <rect x="4" y="4" width="8" height="5" fill="#8a6540" />
        <rect x="5" y="3" width="6" height="1" fill="#8a6540" />
        <rect x="6" y="2" width="4" height="1" fill="#8a6540" />
        <rect x="1" y="9" width="14" height="1" fill="#c8a050" />
        <rect x="4" y="8" width="8" height="1" fill="#c8a050" />
        <rect x="6" y="5" width="4" height="2" fill="#c8a878" />
      </g>
    </svg>
  );
}

function EmblemIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="4" y="1" width="8" height="1" fill="#e6db74" />
        <rect x="3" y="2" width="10" height="7" fill="#e6db74" />
        <rect x="4" y="9" width="8" height="3" fill="#e6db74" />
        <rect x="5" y="12" width="6" height="2" fill="#e6db74" />
        <rect x="7" y="14" width="2" height="1" fill="#e6db74" />
        <rect x="5" y="3" width="6" height="6" fill="#ae81ff" />
        <rect x="4" y="4" width="8" height="4" fill="#ae81ff" />
        <rect x="7" y="4" width="2" height="5" fill="#c8a8ff" />
        <rect x="5" y="6" width="6" height="2" fill="#c8a8ff" />
      </g>
    </svg>
  );
}

function CapeIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="6" y="1" width="4" height="1" fill="#cc3030" />
        <rect x="5" y="2" width="6" height="2" fill="#cc3030" />
        <rect x="4" y="4" width="8" height="5" fill="#cc3030" />
        <rect x="3" y="6" width="10" height="4" fill="#cc3030" />
        <rect x="3" y="10" width="4" height="5" fill="#cc3030" />
        <rect x="9" y="10" width="4" height="5" fill="#cc3030" />
        <rect x="5" y="5" width="2" height="8" fill="#e84040" />
        <rect x="4" y="4" width="1" height="6" fill="#e84040" />
      </g>
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="1" width="2" height="2" fill="#e6db74" />
        <rect x="7" y="13" width="2" height="2" fill="#e6db74" />
        <rect x="1" y="7" width="2" height="2" fill="#e6db74" />
        <rect x="13" y="7" width="2" height="2" fill="#e6db74" />
        <rect x="4" y="3" width="2" height="2" fill="#e6db74" />
        <rect x="10" y="3" width="2" height="2" fill="#e6db74" />
        <rect x="4" y="11" width="2" height="2" fill="#e6db74" />
        <rect x="10" y="11" width="2" height="2" fill="#e6db74" />
        <rect x="5" y="5" width="6" height="6" fill="#c8a050" />
        <rect x="6" y="6" width="4" height="4" fill="#5dcaa5" />
        <rect x="7" y="7" width="2" height="2" fill="#90e8cc" />
      </g>
    </svg>
  );
}

function BootsIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="4" y="1" width="3" height="9" fill="#8a6540" />
        <rect x="9" y="1" width="3" height="9" fill="#8a6540" />
        <rect x="4" y="1" width="3" height="1" fill="#c8a878" />
        <rect x="9" y="1" width="3" height="1" fill="#c8a878" />
        <rect x="3" y="10" width="4" height="4" fill="#8a6540" />
        <rect x="9" y="10" width="4" height="4" fill="#8a6540" />
        <rect x="2" y="13" width="6" height="2" fill="#8a6540" />
        <rect x="9" y="13" width="6" height="2" fill="#8a6540" />
        <rect x="2" y="13" width="6" height="1" fill="#c8a050" />
        <rect x="9" y="13" width="6" height="1" fill="#c8a050" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   MENU & system
   ══════════════════════════════════════════════════════════ */

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="4" width="12" height="2" fill="#cfd8e2" />
        <rect x="2" y="7" width="12" height="2" fill="#cfd8e2" />
        <rect x="2" y="10" width="12" height="2" fill="#cfd8e2" />
        <rect x="2" y="4" width="12" height="1" fill="#eef0f4" />
        <rect x="2" y="7" width="12" height="1" fill="#eef0f4" />
        <rect x="2" y="10" width="12" height="1" fill="#eef0f4" />
      </g>
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="2" fill="#8a6540" />
        <rect x="4" y="3" width="8" height="11" fill="#8a6540" />
        <rect x="3" y="5" width="10" height="8" fill="#8a6540" />
        <rect x="4" y="3" width="8" height="1" fill="#c8a878" />
        <rect x="4" y="4" width="1" height="8" fill="#c8a878" />
        <rect x="6" y="8" width="4" height="3" fill="#c8a050" />
        <rect x="7" y="9" width="2" height="1" fill="#e6db74" />
      </g>
    </svg>
  );
}

function PartyIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="3" y="1" width="3" height="3" fill="#a8b0bc" />
        <rect x="2" y="4" width="5" height="4" fill="#a8b0bc" />
        <rect x="2" y="8" width="2" height="4" fill="#a8b0bc" />
        <rect x="5" y="8" width="2" height="4" fill="#a8b0bc" />
        <rect x="10" y="1" width="3" height="3" fill="#cfd8e2" />
        <rect x="9" y="4" width="5" height="4" fill="#cfd8e2" />
        <rect x="9" y="8" width="2" height="4" fill="#cfd8e2" />
        <rect x="12" y="8" width="2" height="4" fill="#cfd8e2" />
      </g>
    </svg>
  );
}

function QuestIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#c8a050" />
        <rect x="4" y="2" width="8" height="12" fill="#f0e8c0" />
        <rect x="3" y="3" width="10" height="9" fill="#f0e8c0" />
        <rect x="5" y="13" width="6" height="1" fill="#c8a050" />
        <rect x="7" y="4" width="2" height="6" fill="#cc3030" />
        <rect x="7" y="11" width="2" height="2" fill="#cc3030" />
      </g>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="2" width="4" height="12" fill="#f0e8c0" />
        <rect x="6" y="2" width="4" height="12" fill="#e8e0b8" />
        <rect x="10" y="2" width="4" height="12" fill="#f0e8c0" />
        <rect x="2" y="2" width="12" height="1" fill="#c8a050" />
        <rect x="2" y="13" width="12" height="1" fill="#c8a050" />
        <rect x="3" y="5" width="3" height="1" fill="#5dcaa5" />
        <rect x="6" y="6" width="1" height="2" fill="#5dcaa5" />
        <rect x="7" y="8" width="4" height="1" fill="#5dcaa5" />
        <rect x="10" y="9" width="1" height="2" fill="#5dcaa5" />
        <rect x="11" y="10" width="2" height="2" fill="#ff6060" />
      </g>
    </svg>
  );
}

function ShopIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="6" y="1" width="4" height="2" fill="#8a6540" />
        <rect x="5" y="3" width="6" height="1" fill="#8a6540" />
        <rect x="4" y="4" width="8" height="9" fill="#e6db74" />
        <rect x="3" y="6" width="10" height="6" fill="#e6db74" />
        <rect x="4" y="4" width="8" height="1" fill="#fac775" />
        <rect x="4" y="5" width="1" height="8" fill="#fac775" />
        <rect x="6" y="7" width="4" height="4" fill="#c8a050" />
        <rect x="7" y="8" width="2" height="2" fill="#fac775" />
        <rect x="4" y="13" width="8" height="1" fill="#c8a050" />
      </g>
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="7" y="1" width="2" height="2" fill="#a8b0bc" />
        <rect x="7" y="13" width="2" height="2" fill="#a8b0bc" />
        <rect x="1" y="7" width="2" height="2" fill="#a8b0bc" />
        <rect x="13" y="7" width="2" height="2" fill="#a8b0bc" />
        <rect x="3" y="3" width="2" height="2" fill="#a8b0bc" />
        <rect x="11" y="3" width="2" height="2" fill="#a8b0bc" />
        <rect x="3" y="11" width="2" height="2" fill="#a8b0bc" />
        <rect x="11" y="11" width="2" height="2" fill="#a8b0bc" />
        <rect x="4" y="4" width="8" height="8" fill="#a8b0bc" />
        <rect x="3" y="5" width="10" height="6" fill="#a8b0bc" />
        <rect x="5" y="3" width="6" height="10" fill="#a8b0bc" />
        <rect x="6" y="6" width="4" height="4" fill="#1a1a20" />
        <rect x="7" y="7" width="2" height="2" fill="#2a2a30" />
      </g>
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="2" y="1" width="12" height="13" fill="#3a4a5a" />
        <rect x="3" y="1" width="8" height="5" fill="#a8b0bc" />
        <rect x="2" y="1" width="12" height="1" fill="#5a6a7a" />
        <rect x="2" y="2" width="1" height="12" fill="#5a6a7a" />
        <rect x="4" y="9" width="8" height="4" fill="#4a5a6a" />
        <rect x="5" y="10" width="6" height="2" fill="#3a4a5a" />
        <rect x="9" y="2" width="2" height="3" fill="#7a8290" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   EMOTES — chat command faces
   ══════════════════════════════════════════════════════════ */

function EmoteTysmIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="4" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="5" y="5" width="2" height="1" fill="#3a2e1a" />
        <rect x="7" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="8" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="9" y="5" width="2" height="1" fill="#3a2e1a" />
        <rect x="11" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="6" y="9" width="4" height="1" fill="#3a2e1a" />
        <rect x="5" y="8" width="1" height="1" fill="#3a2e1a" />
        <rect x="10" y="8" width="1" height="1" fill="#3a2e1a" />
        <rect x="3" y="8" width="1" height="1" fill="#f0a070" />
        <rect x="12" y="8" width="1" height="1" fill="#f0a070" />
      </g>
    </svg>
  );
}

function EmoteSosIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="6" y="3" width="1" height="1" fill="#3a2e1a" />
        <rect x="5" y="4" width="1" height="1" fill="#3a2e1a" />
        <rect x="4" y="5" width="1" height="1" fill="#3a2e1a" />
        <rect x="9" y="3" width="1" height="1" fill="#3a2e1a" />
        <rect x="10" y="4" width="1" height="1" fill="#3a2e1a" />
        <rect x="11" y="5" width="1" height="1" fill="#3a2e1a" />
        <rect x="5" y="6" width="1" height="2" fill="#3a2e1a" />
        <rect x="10" y="6" width="1" height="2" fill="#3a2e1a" />
        <rect x="6" y="10" width="4" height="2" fill="#3a2e1a" />
        <rect x="7" y="11" width="2" height="1" fill="#c0432f" />
        <rect x="12" y="2" width="1" height="1" fill="#5aa9e6" />
        <rect x="11" y="3" width="3" height="2" fill="#5aa9e6" />
        <rect x="12" y="5" width="1" height="1" fill="#5aa9e6" />
        <rect x="12" y="3" width="1" height="1" fill="#add6f5" />
      </g>
    </svg>
  );
}

function EmoteLolIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="4" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="5" y="5" width="2" height="1" fill="#3a2e1a" />
        <rect x="7" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="8" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="9" y="5" width="2" height="1" fill="#3a2e1a" />
        <rect x="11" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="5" y="9" width="6" height="3" fill="#3a2e1a" />
        <rect x="6" y="9" width="4" height="1" fill="#ffffff" />
        <rect x="6" y="11" width="4" height="1" fill="#c0432f" />
        <rect x="3" y="7" width="1" height="2" fill="#5aa9e6" />
        <rect x="12" y="7" width="1" height="2" fill="#5aa9e6" />
      </g>
    </svg>
  );
}

function EmoteWinIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="5" y="6" width="2" height="2" fill="#3a2e1a" />
        <rect x="9" y="6" width="3" height="1" fill="#3a2e1a" />
        <rect x="5" y="9" width="6" height="2" fill="#3a2e1a" />
        <rect x="6" y="9" width="4" height="1" fill="#ffffff" />
        <rect x="4" y="8" width="1" height="1" fill="#3a2e1a" />
        <rect x="11" y="8" width="1" height="1" fill="#3a2e1a" />
        <rect x="12" y="2" width="1" height="3" fill="#f6d860" />
        <rect x="11" y="3" width="3" height="1" fill="#f6d860" />
        <rect x="12" y="3" width="1" height="1" fill="#fff8e0" />
      </g>
    </svg>
  );
}

function EmoteLgoIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="5" y="4" width="1" height="3" fill="#3a2e1a" />
        <rect x="4" y="5" width="3" height="1" fill="#3a2e1a" />
        <rect x="10" y="4" width="1" height="3" fill="#3a2e1a" />
        <rect x="9" y="5" width="3" height="1" fill="#3a2e1a" />
        <rect x="5" y="9" width="6" height="3" fill="#3a2e1a" />
        <rect x="6" y="9" width="4" height="1" fill="#ffffff" />
        <rect x="6" y="11" width="4" height="1" fill="#c0432f" />
        <rect x="4" y="8" width="1" height="1" fill="#3a2e1a" />
        <rect x="11" y="8" width="1" height="1" fill="#3a2e1a" />
        <rect x="13" y="1" width="1" height="3" fill="#f6d860" />
        <rect x="13" y="5" width="1" height="1" fill="#f6d860" />
      </g>
    </svg>
  );
}

function EmoteUghIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="4" y="6" width="3" height="1" fill="#3a2e1a" />
        <rect x="9" y="6" width="3" height="1" fill="#3a2e1a" />
        <rect x="6" y="11" width="4" height="1" fill="#3a2e1a" />
        <rect x="5" y="10" width="1" height="1" fill="#3a2e1a" />
        <rect x="10" y="10" width="1" height="1" fill="#3a2e1a" />
        <rect x="12" y="2" width="1" height="1" fill="#5aa9e6" />
        <rect x="11" y="3" width="3" height="2" fill="#5aa9e6" />
        <rect x="12" y="5" width="1" height="1" fill="#5aa9e6" />
        <rect x="12" y="3" width="1" height="1" fill="#add6f5" />
      </g>
    </svg>
  );
}

function EmoteMybIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="4" y="5" width="2" height="1" fill="#3a2e1a" />
        <rect x="10" y="5" width="2" height="1" fill="#3a2e1a" />
        <rect x="5" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="10" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="6" y="10" width="1" height="1" fill="#3a2e1a" />
        <rect x="7" y="11" width="1" height="1" fill="#3a2e1a" />
        <rect x="8" y="10" width="1" height="1" fill="#3a2e1a" />
        <rect x="9" y="11" width="1" height="1" fill="#3a2e1a" />
        <rect x="4" y="2" width="1" height="1" fill="#5aa9e6" />
        <rect x="3" y="3" width="3" height="1" fill="#5aa9e6" />
        <rect x="4" y="4" width="1" height="1" fill="#5aa9e6" />
        <rect x="4" y="3" width="1" height="1" fill="#add6f5" />
      </g>
    </svg>
  );
}

function EmoteWutIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="4" y="3" width="2" height="1" fill="#3a2e1a" />
        <rect x="9" y="3" width="2" height="1" fill="#3a2e1a" />
        <rect x="4" y="5" width="3" height="3" fill="#ffffff" />
        <rect x="9" y="5" width="3" height="3" fill="#ffffff" />
        <rect x="5" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="10" y="6" width="1" height="1" fill="#3a2e1a" />
        <rect x="6" y="9" width="4" height="3" fill="#3a2e1a" />
        <rect x="7" y="10" width="2" height="1" fill="#f6d860" />
        <rect x="11" y="1" width="2" height="1" fill="#3a2e1a" />
        <rect x="13" y="2" width="1" height="1" fill="#3a2e1a" />
        <rect x="12" y="3" width="1" height="1" fill="#3a2e1a" />
        <rect x="12" y="5" width="1" height="1" fill="#3a2e1a" />
      </g>
    </svg>
  );
}

function EmoteGrrIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(1.5)">
        <rect x="5" y="1" width="6" height="1" fill="#f6d860" />
        <rect x="3" y="2" width="10" height="1" fill="#f6d860" />
        <rect x="2" y="3" width="12" height="8" fill="#f6d860" />
        <rect x="3" y="11" width="10" height="1" fill="#e3c24f" />
        <rect x="4" y="12" width="8" height="1" fill="#e3c24f" />
        <rect x="5" y="13" width="6" height="1" fill="#c9aa3e" />
        <rect x="4" y="5" width="1" height="1" fill="#3a2e1a" />
        <rect x="5" y="6" width="2" height="1" fill="#3a2e1a" />
        <rect x="9" y="6" width="2" height="1" fill="#3a2e1a" />
        <rect x="11" y="5" width="1" height="1" fill="#3a2e1a" />
        <rect x="5" y="7" width="2" height="1" fill="#3a2e1a" />
        <rect x="9" y="7" width="2" height="1" fill="#3a2e1a" />
        <rect x="6" y="10" width="4" height="1" fill="#3a2e1a" />
        <rect x="5" y="11" width="1" height="1" fill="#3a2e1a" />
        <rect x="10" y="11" width="1" height="1" fill="#3a2e1a" />
        <rect x="12" y="1" width="1" height="3" fill="#e23b3b" />
        <rect x="11" y="2" width="3" height="1" fill="#e23b3b" />
        <rect x="3" y="8" width="1" height="1" fill="#e87a5a" />
        <rect x="12" y="8" width="1" height="1" fill="#e87a5a" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   REGISTRY
   ══════════════════════════════════════════════════════════ */
export interface RPGIconProps {
  /** Icon name across all eleven groups (weapons, elements, races, sizes, attack, skills, items, equip, skins, menu, emotes). */
  name?: RPGIconName;
  /** Rendered size in px. */
  size?: number;
  style?: CSSProperties;
}

type IconComponent = () => ReactElement;

const ICONS = {
  /* Weapons (6) */
  sword: SwordIcon,
  bow: BowIcon,
  staff: StaffIcon,
  katar: KatarIcon,
  book: BookIcon,
  hammer: HammerIcon,
  /* Elements (8) */
  neutral: NeutralIcon,
  fire: FireIcon,
  earth: EarthIcon,
  wind: WindIcon,
  water: WaterIcon,
  light: LightIcon,
  dark: DarkIcon,
  void: VoidIcon,
  /* Races (5) */
  human: HumanIcon,
  beast: BeastIcon,
  demon: DemonIcon,
  angel: AngelIcon,
  spirit: SpiritIcon,
  /* Sizes (3) */
  small: SizeSmallIcon,
  medium: SizeMediumIcon,
  large: SizeLargeIcon,
  /* Attack (6) */
  'attack-sword': AttackSwordIcon,
  'attack-bow': AttackBowIcon,
  'attack-staff': AttackStaffIcon,
  'attack-katar': AttackKatarIcon,
  'attack-book': AttackBookIcon,
  'attack-hammer': AttackHammerIcon,
  /* Skills (6) */
  passive: PassiveIcon,
  active: ActiveIcon,
  combo: ComboIcon,
  stance: StanceIcon,
  buff: BuffIcon,
  debuff: DebuffIcon,
  /* Items (6) */
  potion: PotionIcon,
  ether: EtherIcon,
  scroll: ScrollIcon,
  gem: GemIcon,
  relic: RelicIcon,
  key: KeyIcon,
  /* Equip (6) */
  helm: HelmIcon,
  armor: ArmorIcon,
  cloak: CloakIcon,
  shield: ShieldIcon,
  ring: RingIcon,
  greaves: GreavesIcon,
  /* Skins (5) */
  hat: HatIcon,
  emblem: EmblemIcon,
  cape: CapeIcon,
  badge: BadgeIcon,
  boots: BootsIcon,
  /* Menu (8) */
  menu: MenuIcon,
  inventory: InventoryIcon,
  party: PartyIcon,
  quest: QuestIcon,
  map: MapIcon,
  shop: ShopIcon,
  settings: SettingsIcon,
  save: SaveIcon,
  /* Emotes (9) */
  'emote-tysm': EmoteTysmIcon,
  'emote-sos': EmoteSosIcon,
  'emote-lol': EmoteLolIcon,
  'emote-win': EmoteWinIcon,
  'emote-lgo': EmoteLgoIcon,
  'emote-ugh': EmoteUghIcon,
  'emote-myb': EmoteMybIcon,
  'emote-wut': EmoteWutIcon,
  'emote-grr': EmoteGrrIcon,
} satisfies Record<RPGIconName, IconComponent>;

export const icons = [...rpgIconNames] as RPGIconName[];

/* Weapons (and their attack variants) read best held diagonally — blade toward
   the top-right. The sword art is already a top-right diagonal (0°, omitted).
   Values are CSS degrees (clockwise); the companion scale keeps the rotated
   square from clipping its tile. */
const WEAPON_TILT: Partial<Record<RPGIconName, number>> = {
  staff: 45,
  katar: 45,
  hammer: 45,
  book: 45,
  bow: -45,
  'attack-staff': 45,
  'attack-katar': 45,
  'attack-hammer': 45,
  'attack-book': 45,
  'attack-bow': -45,
};

/**
 * RPGIcon — 68 original pixel-art icons across 11 groups.
 *
 * Weapons (6):  sword · bow · staff · katar · book · hammer
 * Elements (8): neutral · fire · earth · wind · water · light · dark · void
 * Races (5):    human · beast · demon · angel · spirit
 * Sizes (3):    small · medium · large
 * Attack (6):   attack-sword · attack-bow · attack-staff · attack-katar · attack-book · attack-hammer
 * Skills (6):   passive · active · combo · stance · buff · debuff
 * Items (6):    potion · ether · scroll · gem · relic · key
 * Equip (6):    helm · armor · cloak · shield · ring · greaves
 * Skins (5):    hat · emblem · cape · badge · boots
 * Menu (8):     menu · inventory · party · quest · map · shop · settings · save
 * Emotes (9):   emote-tysm · emote-sos · emote-lol · emote-win · emote-lgo · emote-ugh · emote-myb · emote-wut · emote-grr
 */
export const RPGIcon = Object.assign(
  function RPGIcon({ name = 'sword', size = 22, style }: RPGIconProps): ReactElement {
    const Icon = ICONS[name] || SwordIcon;
    const tilt = WEAPON_TILT[name];
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          imageRendering: 'pixelated',
          flexShrink: 0,
          overflow: 'visible',
          ...style,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            width: '100%',
            height: '100%',
            /* Tilt weapons so the blade points top-right; the downscale keeps the
           rotated square inside the icon box (no clipping at the corners). */
            transform: tilt ? `rotate(${tilt}deg) scale(0.82)` : undefined,
            transformOrigin: 'center',
          }}
        >
          <Icon />
        </span>
      </span>
    );
  },
  { icons },
);

/** @deprecated Use RPGIcon — kept for backward compatibility */
export const HUDIcon = RPGIcon;
