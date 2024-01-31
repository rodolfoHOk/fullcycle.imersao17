'use client';

import { createTheme } from '@mui/material';
import { roboto } from './roboto';

export const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
