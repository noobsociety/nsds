# Design Principles

NSDS is Tailwind-first, token-driven, and component-light.

## Token-Driven

Colors, typography, spacing, motion, and HUD values live in CSS custom
properties. Components read those values instead of hard-coding product themes.

## Tailwind-First

The Tailwind preset maps theme values to NSDS tokens. Product apps should use
Tailwind for layout and composition, then use NSDS components for repeated UI
patterns.

## Stable Components

React components expose stable class names and typed props. Runtime fallbacks are
kept for defensive rendering, while TypeScript guides new usage toward valid
variants.

## Public Surface

The package surface is intentionally small:

- React components
- CSS token files
- CSS primitive entry
- Tailwind preset
- generated TypeScript declarations
