import * as React from 'react';

import Container from '@mui/material/Container';

import AppMenu from '../Menus/AppMenu';
import Navbar from './Navbar';

import { StyledEngineProvider } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import defaultTheme from '../../utils/mui-theme';
import ThemeProvider from '@mui/system/ThemeProvider';

import useControllers from '../../utils/api';
import { authContext } from '../../utils/context/contexts';
import { LOGOUT } from '../../utils/context/actions';

const ColorModeContext = React.createContext({
  toggleColorMode: () => {
    ('');
  },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((mode) => (mode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        ...defaultTheme,
        palette: {
          ...defaultTheme.palette,
          mode,
        },
      }),
    [mode]
  );

  const { state, dispatch } = React.useContext(authContext);
  const { logout } = useControllers();
  const useLogout = logout.init(state.auth);

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Container
            maxWidth={false}
            className="h-[100vh] min-w-[100vw] flex flex-col p-0 overflow-x-hidden"
            sx={{ bgcolor: 'background.default' }}
          >
            <Navbar
              menu={
                <AppMenu
                  logout={() =>
                    useLogout.mutate(undefined, {
                      onSuccess: () => dispatch({ type: LOGOUT }),
                    })
                  }
                  mode={mode}
                  toggleMode={colorMode.toggleColorMode}
                />
              }
            />
            <main className="container m-auto">{children}</main>
            <footer className="mt-auto pl-2">
              <a
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="App-link text-react-blue text-[calc(5px+1vmin)] hover:underline"
              >
                Powered by React
              </a>
            </footer>
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
}
