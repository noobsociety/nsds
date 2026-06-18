import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './theme.js';

export function NSThemeProvider({ children }) {
  return React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(CssBaseline),
    children,
  );
}
