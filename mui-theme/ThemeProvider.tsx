/**
 * ThemeProvider wrapper — drop into your app root.
 *
 * import { NSThemeProvider } from './ThemeProvider';
 * <NSThemeProvider>{children}</NSThemeProvider>
 */

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

export function NSThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
