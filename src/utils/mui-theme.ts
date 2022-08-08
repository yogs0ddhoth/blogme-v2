import { createTheme } from "@mui/material";

const theme = createTheme({
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