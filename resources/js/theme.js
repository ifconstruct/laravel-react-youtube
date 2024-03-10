import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
/*
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
        contrastText: '#fff',
    },
    secondary: {
      main: '#19857b',
        contrastText: '#000',
    },
    error: {
      main: red.A400,
    },
  },
});
*/
const theme = createTheme({
    palette: {
        mode: 'light',
    },
});



export default theme;
