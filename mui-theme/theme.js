/**
 * NoobSociety — MUI Theme
 *
 * Faithfully maps the Monokai dark design system to Material UI v5+.
 *
 * Usage:
 *   import { theme } from './theme';
 *   <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
 *
 * Fonts must be loaded separately — add to your index.html or _document.tsx:
 *   <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
 */

import { createTheme, alpha } from '@mui/material/styles';

// ── Monokai foregrounds ────────────────────────────────────────────
// Each color has a single fixed semantic role. Never reassign.
export const NS = {
  // Backgrounds (dark canvas — not Monokai colors)
  bg0:     '#1a1a16', // deepest — footer, drawer
  bg1:     '#272822', // page base
  bg2:     '#32332b', // raised surfaces, input fills
  glass:   'rgba(30, 31, 26, 0.88)',
  glass2:  'rgba(30, 31, 26, 0.60)',
  line:    'rgba(255, 255, 255, 0.12)',
  lineStr: 'rgba(255, 255, 255, 0.22)',

  // Monokai foregrounds
  ink:          '#f8f8f2',  // primary text
  inkDim:       '#a8a28c',  // secondary text
  inkFaint:     '#75715e',  // muted / comment grey

  // Accent palette — semantic, never reassign
  gold:         '#e6db74',  // primary accent: wordmark, CTAs, eyebrows
  goldPale:     '#f4f099',  // hover state of gold
  goldDeep:     '#cabb50',  // gold border
  goldShadow:   '#b5a83f',  // gold button press shadow
  goldBtnFg:    '#1c1c17',  // text on gold backgrounds

  green:        '#a6e22e',  // HOLDS / success / live
  greenDeep:    '#7fb81e',

  orange:       '#fd971f',  // BUILDING / in-progress
  orangeDeep:   '#c96f00',

  cyan:         '#66d9e8',  // PLANNED / info
  cyanDeep:     '#5bc8d7',

  pink:         '#f92672',  // highlight / panel accent / danger
  purple:       '#ae81ff',  // decorative / personal / tertiary
};

// ── Font stacks ────────────────────────────────────────────────────
const FONT_BODY  = "'Inter', system-ui, sans-serif";
const FONT_PIXEL = "'Press Start 2P', system-ui, sans-serif";

// ── Theme ──────────────────────────────────────────────────────────
export const theme = createTheme({

  // ── Palette ──────────────────────────────────────────────────────
  palette: {
    mode: 'dark',

    ns: NS,

    background: {
      default: NS.bg1,
      paper:   NS.bg2,
    },

    primary: {
      main:          NS.gold,
      light:         NS.goldPale,
      dark:          NS.goldDeep,
      contrastText:  NS.goldBtnFg,
    },
    secondary: {
      main:          NS.pink,
      contrastText:  NS.ink,
    },
    success: {
      main:          NS.green,
      dark:          NS.greenDeep,
      contrastText:  NS.goldBtnFg,
    },
    warning: {
      main:          NS.orange,
      dark:          NS.orangeDeep,
      contrastText:  NS.goldBtnFg,
    },
    info: {
      main:          NS.cyan,
      dark:          NS.cyanDeep,
      contrastText:  NS.goldBtnFg,
    },
    error: {
      main:          NS.pink,
      contrastText:  NS.ink,
    },

    text: {
      primary:   NS.ink,
      secondary: NS.inkDim,
      disabled:  NS.inkFaint,
    },

    divider: NS.line,

    action: {
      active:            NS.ink,
      hover:             alpha(NS.gold, 0.08),
      selected:          alpha(NS.gold, 0.12),
      disabled:          NS.inkFaint,
      disabledBackground:'rgba(255, 255, 255, 0.05)',
      focus:             alpha(NS.gold, 0.16),
    },
  },

  // ── Typography ────────────────────────────────────────────────────
  typography: {
    fontFamily: FONT_BODY,

    // Press Start 2P — hero title
    h1: {
      fontFamily:    FONT_PIXEL,
      fontSize:      'clamp(2rem, 1rem + 3vw, 3.45rem)',
      lineHeight:    1.08,
      letterSpacing: 0,
    },
    // Inter — section titles
    h2: {
      fontFamily:    FONT_BODY,
      fontSize:      'clamp(1.8rem, 1rem + 2vw, 2.4rem)',
      fontWeight:    700,
      letterSpacing: 0,
      lineHeight:    1.14,
    },
    // Press Start 2P — card titles
    h3: {
      fontFamily:    FONT_PIXEL,
      fontSize:      '11px',
      lineHeight:    1.45,
      letterSpacing: 0,
    },
    // Press Start 2P — quest gate titles
    h4: {
      fontFamily:    FONT_PIXEL,
      fontSize:      '9.5px',
      lineHeight:    1.5,
    },
    // Press Start 2P — footer column heads
    h5: {
      fontFamily:    FONT_PIXEL,
      fontSize:      '9.5px',
      lineHeight:    1.5,
      color:         NS.gold,
    },
    // Press Start 2P — small labels
    h6: {
      fontFamily:    FONT_PIXEL,
      fontSize:      '8px',
      lineHeight:    1.5,
    },

    // Inter — hero tagline
    subtitle1: {
      fontFamily:  FONT_BODY,
      fontSize:    '1.25rem',
      fontWeight:  500,
      lineHeight:  1.4,
    },
    // Inter — section subtitles
    subtitle2: {
      fontFamily:  FONT_BODY,
      fontSize:    '1.05rem',
      fontWeight:  400,
      lineHeight:  1.5,
      color:       NS.inkDim,
    },
    // Inter — body
    body1: {
      fontFamily: FONT_BODY,
      fontSize:   '1rem',
      lineHeight: 1.6,
    },
    // Inter — small body / card text
    body2: {
      fontFamily: FONT_BODY,
      fontSize:   '0.875rem',
      lineHeight: 1.45,
      color:      NS.inkDim,
    },

    // Press Start 2P — pixel labels (e.g. status pills, file URL)
    caption: {
      fontFamily:    FONT_PIXEL,
      fontSize:      '8px',
      letterSpacing: '0.05em',
      color:         NS.inkFaint,
    },
    // Inter — eyebrow labels (✦ SOCIETY OF BEGINNERS)
    overline: {
      fontFamily:    FONT_BODY,
      fontSize:      '13px',
      fontWeight:    700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color:         NS.gold,
      lineHeight:    1,
    },
    // Press Start 2P — used by Button
    button: {
      fontFamily:    FONT_PIXEL,
      fontSize:      '12px',
      textTransform: 'none',
      lineHeight:    1,
    },
  },

  // ── Shape ─────────────────────────────────────────────────────────
  shape: {
    borderRadius: 8,
  },

  // ── Spacing — 4px base in rem ─────────────────────────────────────
  // MUI default (8px) → override to match our 4px grid.
  // theme.spacing(1) = 0.25rem (4px)
  // theme.spacing(4) = 1rem (16px)
  // theme.spacing(8) = 2rem (32px)
  spacing: (factor) => `${0.25 * factor}rem`,

  // ── Component overrides ───────────────────────────────────────────
  components: {

    // ── Global baseline ─────────────────────────────────────────────
    MuiCssBaseline: {
      styleOverrides: `
        html { scroll-behavior: smooth; scroll-padding-top: 4rem; }
        body { background-color: ${NS.bg1}; background-image:
          radial-gradient(ellipse 80% 55% at 88% 2%, ${alpha(NS.pink, 0.11)}, transparent 58%),
          radial-gradient(ellipse 55% 45% at 8% 12%, ${alpha(NS.purple, 0.07)}, transparent 52%),
          linear-gradient(180deg, ${NS.bg1} 0%, #1e1f1a 100%);
          background-attachment: fixed;
        }
        ::selection { background: ${alpha(NS.pink, 0.28)}; color: ${NS.ink}; }
        :where(a, button, input, select, textarea, [tabindex]):focus-visible {
          outline: 2px solid ${NS.gold};
          outline-offset: 3px;
          box-shadow: 0 0 0 4px ${alpha(NS.gold, 0.35)};
        }
        @keyframes ns-live {
          0%   { box-shadow: 0 0 0 0   ${alpha(NS.green, 0.7)}; }
          70%  { box-shadow: 0 0 0 7px ${alpha(NS.green, 0)};   }
          100% { box-shadow: 0 0 0 0   ${alpha(NS.green, 0)};   }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            scroll-behavior: auto !important;
          }
        }
      `,
    },

    // ── AppBar / Header ─────────────────────────────────────────────
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'sticky',
      },
      styleOverrides: {
        root: {
          height: '4rem',
          background: NS.glass,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${NS.line}`,
          justifyContent: 'center',
        },
      },
    },
    MuiToolbar: {
      defaultProps: { disableGutters: true },
      styleOverrides: {
        root: {
          maxWidth: '1080px',
          width: '100%',
          margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 2rem)',
          minHeight: '4rem !important',
        },
      },
    },

    // ── Buttons ─────────────────────────────────────────────────────
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontFamily: FONT_PIXEL,
          fontSize: '12px',
          lineHeight: 1,
          textTransform: 'none',
          borderRadius: '9px',
          padding: '1rem 1.625rem',
          transition: '150ms ease-out',
          minWidth: 0,
        },
        // Play button — gold fill, 3D press shadow
        contained: {
          color: NS.goldBtnFg,
          background: NS.gold,
          border: `2px solid ${NS.goldDeep}`,
          boxShadow: `0 3px 0 ${NS.goldShadow}`,
          '&:hover': {
            background: NS.goldPale,
            boxShadow: `0 3px 0 ${NS.goldShadow}`,
          },
          '&:active': {
            boxShadow: 'none',
            transform: 'translateY(2px)',
          },
          '&.Mui-disabled': {
            background: alpha(NS.gold, 0.3),
            color: alpha(NS.goldBtnFg, 0.5),
          },
        },
        // Ghost button — transparent, soft border
        outlined: {
          color: NS.gold,
          background: 'transparent',
          border: `1px solid ${alpha(NS.ink, 0.45)}`,
          boxShadow: 'none',
          '&:hover': {
            color: NS.goldBtnFg,
            background: NS.gold,
            borderColor: NS.gold,
          },
        },
        // Text button — no border
        text: {
          color: NS.gold,
          '&:hover': {
            background: alpha(NS.gold, 0.08),
          },
        },
        // Small variant (header Play button)
        sizeSmall: {
          fontSize: '9px',
          padding: '0.625rem 0.875rem',
          borderRadius: '8px',
        },
      },
    },

    // ── Card / Paper ─────────────────────────────────────────────────
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          background: NS.glass,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: `1px solid ${NS.lineStr}`,
          borderRadius: '10px',
          boxShadow: 'none',
          transition: '180ms ease-out',
          '&:hover': {
            borderColor: alpha(NS.gold, 0.55),
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 34px rgba(0,0,0,.38)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 'clamp(1rem, 2vw, 1.25rem)',
          paddingRight: '3.5rem', // room for absolute badge
          '&:last-child': { paddingBottom: 'clamp(1rem, 2vw, 1.25rem)' },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          background: NS.glass,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${NS.line}`,
        },
        elevation2: {
          background: NS.bg2,
          border: `1px solid ${NS.line}`,
        },
      },
    },

    // ── Chip — status pills ──────────────────────────────────────────
    // Use color prop: 'default'=gold, 'success'=green, 'warning'=orange,
    // 'info'=cyan, 'error'=pink, 'secondary'=purple
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: FONT_PIXEL,
          fontSize: '7px',
          height: 'auto',
          padding: '4px 2px',
          borderRadius: '4px',
          letterSpacing: '0.02em',
        },
        label: {
          padding: '0 4px',
        },
        colorDefault: {
          background: alpha(NS.gold, 0.08),
          color: NS.gold,
          border: `1px solid ${alpha(NS.gold, 0.26)}`,
        },
        colorSuccess: {
          background: alpha(NS.green, 0.10),
          color: NS.green,
          border: `1px solid ${alpha(NS.green, 0.26)}`,
        },
        colorWarning: {
          background: alpha(NS.orange, 0.12),
          color: NS.orange,
          border: `1px solid ${alpha(NS.orange, 0.26)}`,
        },
        colorInfo: {
          background: alpha(NS.cyan, 0.12),
          color: NS.cyan,
          border: `1px solid ${alpha(NS.cyan, 0.26)}`,
        },
        colorError: {
          background: alpha(NS.pink, 0.08),
          color: NS.pink,
          border: `1px solid ${alpha(NS.pink, 0.26)}`,
        },
        colorSecondary: {
          background: alpha(NS.purple, 0.08),
          color: NS.purple,
          border: `1px solid ${alpha(NS.purple, 0.26)}`,
        },
      },
    },

    // ── Divider ──────────────────────────────────────────────────────
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: NS.line },
      },
    },

    // ── Link ─────────────────────────────────────────────────────────
    MuiLink: {
      defaultProps: { underline: 'none' },
      styleOverrides: {
        root: {
          color: NS.gold,
          transition: '150ms ease-out',
          '&:hover': { color: NS.goldPale },
        },
      },
    },

    // ── TextField / Input ─────────────────────────────────────────────
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: NS.bg2,
          fontFamily: FONT_BODY,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: NS.line,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(NS.gold, 0.5),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: NS.gold,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: FONT_BODY,
          color: NS.inkFaint,
          '&.Mui-focused': { color: NS.gold },
        },
      },
    },

    // ── Tooltip ──────────────────────────────────────────────────────
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: NS.bg2,
          color: NS.ink,
          border: `1px solid ${NS.line}`,
          fontFamily: FONT_BODY,
          fontSize: '0.8125rem',
          borderRadius: '6px',
          padding: '6px 10px',
        },
        arrow: { color: NS.bg2 },
      },
    },

    // ── LinearProgress — roadmap progress bar ────────────────────────
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '8px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,.08)',
          border: `1px solid rgba(255,255,255,.1)`,
          overflow: 'hidden',
        },
        bar: {
          background: NS.green, // default: "holds"
          borderRadius: '999px',
        },
      },
    },

    // ── Tabs (section nav) ────────────────────────────────────────────
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: FONT_BODY,
          fontSize: '0.875rem',
          fontWeight: 500,
          color: NS.ink,
          textTransform: 'none',
          minHeight: '4rem',
          padding: '0 0 0.25rem',
          '&.Mui-selected': { color: NS.gold },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: NS.gold,
          height: '2px',
        },
      },
    },

    // ── Dialog / Modal ────────────────────────────────────────────────
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: NS.bg2,
          border: `1px solid ${alpha(NS.pink, 0.28)}`,
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 30px 60px rgba(0,0,0,.5)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: { background: alpha(NS.bg0, 0.72) },
      },
    },

    // ── Snackbar / Alert ──────────────────────────────────────────────
    MuiAlert: {
      styleOverrides: {
        root: {
          fontFamily: FONT_BODY,
          borderRadius: '8px',
          border: `1px solid`,
        },
        standardSuccess: { background: alpha(NS.green, 0.10),  borderColor: alpha(NS.green, 0.26),  color: NS.green  },
        standardWarning: { background: alpha(NS.orange, 0.10), borderColor: alpha(NS.orange, 0.26), color: NS.orange },
        standardInfo:    { background: alpha(NS.cyan, 0.10),   borderColor: alpha(NS.cyan, 0.26),   color: NS.cyan   },
        standardError:   { background: alpha(NS.pink, 0.10),   borderColor: alpha(NS.pink, 0.26),   color: NS.pink   },
      },
    },
  },
});

export default theme;
