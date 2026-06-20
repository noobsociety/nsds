import type { Config } from 'tailwindcss';

type TailwindPreset = Omit<Config, 'content'>;

// Package preset: consumers provide their own `content` globs.
const nsdsPreset: TailwindPreset = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ns: {
          bg: {
            0: 'var(--ns-bg-0)',
            1: 'var(--ns-bg-1)',
            2: 'var(--ns-bg-2)',
            glass: 'var(--ns-glass)',
          },
          ink: {
            DEFAULT: 'var(--ns-ink)',
            dim: 'var(--ns-ink-dim)',
            faint: 'var(--ns-ink-faint)',
          },
          gold: {
            DEFAULT: 'var(--ns-gold)',
            pale: 'var(--ns-gold-pale)',
            deep: 'var(--ns-gold-deep)',
            shadow: 'var(--ns-gold-shadow)',
            fg: 'var(--ns-gold-btn-fg)',
          },
          green: 'var(--ns-green)',
          cyan: 'var(--ns-cyan)',
          orange: 'var(--ns-orange)',
          pink: 'var(--ns-pink)',
          purple: 'var(--ns-purple)',
          accent: 'var(--ns-accent)',
          line: 'var(--ns-line)',
        },
      },
      fontFamily: {
        body: 'var(--ns-font-body)',
        pixel: 'var(--ns-font-pixel)',
      },
      fontSize: {
        'ns-xs': ['var(--ns-text-xs)', { lineHeight: 'var(--ns-leading-normal)' }],
        'ns-sm': ['var(--ns-text-sm)', { lineHeight: 'var(--ns-leading-normal)' }],
        'ns-base': ['var(--ns-text-base)', { lineHeight: 'var(--ns-leading-normal)' }],
        'ns-lg': ['var(--ns-text-lg)', { lineHeight: 'var(--ns-leading-snug)' }],
        'ns-xl': ['var(--ns-text-xl)', { lineHeight: 'var(--ns-leading-snug)' }],
        'ns-2xl': ['var(--ns-text-2xl)', { lineHeight: 'var(--ns-leading-tight)' }],
        'ns-3xl': ['var(--ns-text-3xl)', { lineHeight: 'var(--ns-leading-tight)' }],
        'ns-4xl': ['var(--ns-text-4xl)', { lineHeight: 'var(--ns-leading-tight)' }],
      },
      fontWeight: {
        'ns-normal': 'var(--ns-weight-normal)',
        'ns-medium': 'var(--ns-weight-medium)',
        'ns-semibold': 'var(--ns-weight-semibold)',
        'ns-bold': 'var(--ns-weight-bold)',
      },
      lineHeight: {
        'ns-tight': 'var(--ns-leading-tight)',
        'ns-snug': 'var(--ns-leading-snug)',
        'ns-normal': 'var(--ns-leading-normal)',
        'ns-relaxed': 'var(--ns-leading-relaxed)',
      },
      spacing: {
        'ns-1': 'var(--ns-space-1)',
        'ns-2': 'var(--ns-space-2)',
        'ns-3': 'var(--ns-space-3)',
        'ns-4': 'var(--ns-space-4)',
        'ns-5': 'var(--ns-space-5)',
        'ns-6': 'var(--ns-space-6)',
        'ns-8': 'var(--ns-space-8)',
        'ns-10': 'var(--ns-space-10)',
        'ns-12': 'var(--ns-space-12)',
        'ns-16': 'var(--ns-space-16)',
        'ns-20': 'var(--ns-space-20)',
      },
      maxWidth: {
        'ns-container': 'var(--ns-container)',
      },
      height: {
        'ns-header': 'var(--ns-header-h)',
      },
      borderRadius: {
        'ns-sm': 'var(--ns-radius-sm)',
        'ns-md': 'var(--ns-radius-md)',
        'ns-lg': 'var(--ns-radius-lg)',
        'ns-xl': 'var(--ns-radius-xl)',
        'ns-full': 'var(--ns-radius-full)',
      },
      boxShadow: {
        'ns-card-hover': 'var(--ns-shadow-card-hover)',
        'ns-btn': 'var(--ns-shadow-btn)',
      },
      transitionDuration: {
        'ns-fast': 'var(--ns-dur-fast)',
        'ns-base': 'var(--ns-dur-base)',
        'ns-slow': 'var(--ns-dur-slow)',
      },
      transitionTimingFunction: {
        'ns-out': 'var(--ns-ease-out)',
        'ns-spring': 'var(--ns-ease-spring)',
      },
      ringColor: {
        'ns-focus': 'var(--ns-focus-ring)',
      },
    },
  },
  plugins: [],
};

export = nsdsPreset;
