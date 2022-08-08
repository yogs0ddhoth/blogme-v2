import { createTheme } from "@mui/material";
const rootElement = document.getElementById('root') as HTMLElement;

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#69f0ae',
    },
    info: {
      main: '#18ffff',
    },
    divider: '#f5f5f5',
  },
  typography: {
    // fontFamily: 'Lato',
  },
  shape: {
    borderRadius: 0,
  },
  spacing: 8, 
});
export default theme;