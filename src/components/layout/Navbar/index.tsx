import * as React from 'react';
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogoutIcon from '@mui/icons-material/Logout';

import { authContext } from '../../../utils/context/contexts';
import { useLogout } from "../../../api/mutations";
import { LOGOUT } from '../../../utils/context/actions';
import { Link } from 'react-router-dom';
import theme from '../../../utils/mui-theme';

export default function Navbar() {
  const {state, dispatch} = React.useContext(authContext);

  const {pathname} = useLocation();
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event:React.SyntheticEvent, newValue:string) => setValue(newValue);
  
  const navigate = useNavigate();

  interface NavTabProps { label: string, value: string };
  const NavTab = (props:NavTabProps) => (
    <Tab {...props} onClick={() => navigate(props.value)}
      sx={{color:theme.palette.primary.contrastText}}
    />
  );

  const logout = useLogout(dispatch);

  return (
    <AppBar position='static'>
      <Toolbar className=''>
        <Typography className='w-1/2'>
          BLOGME
        </Typography>
        <div className='w-1/2 flex flex-row justify-end'>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='secondary'
            indicatorColor='secondary'
          >
            <NavTab value='/' label='Home'/>
            <NavTab value='/dashboard' label='Dashboard'/>
            {state.auth === null 
              ? (
                <NavTab value='/login' label='Login'/>
              ) : (
                <IconButton onClick={() => logout.mutate()} >
                  <LogoutIcon className='text-[#fff]' />
                </IconButton>
              )
            }
          </Tabs>
        </div>
      </Toolbar>
    </AppBar>
  )
}