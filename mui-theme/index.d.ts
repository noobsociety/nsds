import type { ReactElement, ReactNode } from 'react';
import type { Theme } from '@mui/material/styles';

export declare const NS: {
  readonly bg0: '#1a1a16';
  readonly bg1: '#272822';
  readonly bg2: '#32332b';
  readonly glass: 'rgba(30, 31, 26, 0.88)';
  readonly glass2: 'rgba(30, 31, 26, 0.60)';
  readonly line: 'rgba(255, 255, 255, 0.12)';
  readonly lineStr: 'rgba(255, 255, 255, 0.22)';
  readonly ink: '#f8f8f2';
  readonly inkDim: '#a8a28c';
  readonly inkFaint: '#75715e';
  readonly gold: '#e6db74';
  readonly goldPale: '#f4f099';
  readonly goldDeep: '#cabb50';
  readonly goldShadow: '#b5a83f';
  readonly goldBtnFg: '#1c1c17';
  readonly green: '#a6e22e';
  readonly greenDeep: '#7fb81e';
  readonly orange: '#fd971f';
  readonly orangeDeep: '#c96f00';
  readonly cyan: '#66d9e8';
  readonly cyanDeep: '#5bc8d7';
  readonly pink: '#f92672';
  readonly purple: '#ae81ff';
};

export type NSTokens = typeof NS;

declare module '@mui/material/styles' {
  interface Palette {
    ns: NSTokens;
  }

  interface PaletteOptions {
    ns?: NSTokens;
  }
}

export declare const theme: Theme;
export default theme;

export interface NSThemeProviderProps {
  children?: ReactNode;
}

export declare function NSThemeProvider(props: NSThemeProviderProps): ReactElement;
