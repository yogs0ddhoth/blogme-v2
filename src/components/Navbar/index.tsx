import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { ColorModeButton, LogoutButton } from '../../Buttons';

import { authContext } from '../../utils/context/contexts';
// import theme from '../../../utils/mui-theme';
import useTheme from '@mui/material/styles/useTheme';

import useControllers from '../../controllers/index';
import AppMenu from '../Menus/AppMenu';

interface NavTabProps {
  label?: string;
  icon?: JSX.Element;
  value: string;
  onClick: () => void;
  darkMode: boolean;
  className?: string;
}
const NavTab = (props: NavTabProps) => (
  <Tab
    {...props}
    onClick={props.onClick}
    sx={{ color: !props.darkMode ? 'primary.contrastText' : 'secondary.dark' }}
  />
);

interface NavbarProps {
  menu: JSX.Element;
}
export default function Navbar({ menu }: NavbarProps) {
  const { state, dispatch } = React.useContext(authContext);

  const { pathname } = useLocation();
  const [value, setValue] = React.useState(pathname);

  React.useEffect(() => setValue(pathname), [pathname]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) =>
    setValue(newValue);

  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  const navigate = useNavigate();
  const tabsColor = !darkMode ? 'secondary' : 'primary';

  return (
    <AppBar
      position="static"
      enableColorOnDark
      color={!darkMode ? 'primary' : 'secondary'}
    >
      <Toolbar className="">
        <div className="w-1/2 pl-4 flex flex-row">
          <Typography variant="h4">BLOGME</Typography>
          <Typography variant="caption" className="pl-1">
            v2
          </Typography>
        </div>

        <div className="w-1/2 flex flex-row justify-end items-center">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor={tabsColor}
            indicatorColor={tabsColor}
          >
            <NavTab
              value="/"
              label="Home"
              onClick={() => navigate('/')}
              darkMode={darkMode}
            />
            <NavTab
              value="/dashboard"
              label="Dashboard"
              onClick={() => navigate('/dashboard')}
              darkMode={darkMode}
            />
            {state.auth === '' ? (
              <NavTab
                value="/login"
                label="Login"
                onClick={() => navigate('/login')}
                darkMode={darkMode}
              />
            ) : (
              <></>
            )}
          </Tabs>

          {menu}
        </div>
      </Toolbar>
    </AppBar>
  );
}
