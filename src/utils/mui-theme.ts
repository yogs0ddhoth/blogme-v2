import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',
    },
    secondary: {
      main: '#263238',
    },
    info: {
      main: '#18ffff',
    },
    divider: '#f5f5f5',
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    // fontFamily: ,
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  // props: {
  //   MuiAppBar: {
  //     color: 'secondary',
  //   },
  // },  
})