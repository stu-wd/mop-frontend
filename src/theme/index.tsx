import { createTheme } from '@mui/material/styles';

export const darkMode = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#272739',
      paper: '#314A63',
    },
    primary: {
      light: '#EAF4CE',
      main: '#BEDE67',
      dark: '#215A24',
    },
    secondary: {
      light: '#EDF1F5',
      main: '#314A63',
      dark: '#272739',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1b263c',
          color: '#FFFFFF',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: '#AAAAAA',
        },
      },
    },
  },
});

export const lightMode = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F8F9FE',
      paper: '#FFFFFF',
    },
    primary: {
      light: '#EDF1F5',
      main: '#314A63',
      dark: '#272739',
    },
    secondary: {
      light: '#EAF4CE',
      main: '#BEDE67',
      dark: '#215A24',
    },
    text: {
      primary: '#48505A',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1b263c',
          color: '#FFFFFF',
        },
      },
    },
  },
});
