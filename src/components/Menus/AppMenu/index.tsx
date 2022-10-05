import * as React from 'react';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { PaletteMode } from '@mui/material';

import useTheme from '@mui/material/styles/useTheme';
import { ActionsMenu, MenuAction } from '..';
import { authContext } from '../../../utils/context/contexts';

interface AppMenuProps {
  logout: () => void;
  mode: PaletteMode;
  toggleMode: () => void;
}
export default function AppMenu({ logout, mode, toggleMode }: AppMenuProps) {
  const { state } = React.useContext(authContext);

  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';
  const color = !darkMode ? 'primary.contrastText' : 'secondary.dark';

  return (
    <ActionsMenu icon={<MenuIcon sx={{ color: color }} />}>
      {state.auth !== '' ? (
        <MenuAction label="Logout" icon={<LogoutIcon />} action={logout} />
      ) : (
        <></>
      )}
      <MenuAction
        label="Toggle Dark Mode"
        icon={mode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
        action={toggleMode}
      />
    </ActionsMenu>
  );
}
