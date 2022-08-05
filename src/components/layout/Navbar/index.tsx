import * as React from 'react';
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';

import { authContext } from '../../../utils/context/contexts';
import { useLogout } from "../../../api/mutations";
import { LOGOUT } from '../../../utils/context/actions';

export default function Navbar() {
  const {state, dispatch} = React.useContext(authContext);
  const logout = useLogout(dispatch);

  return (
    <nav>
      <ul className="flex flex-row justify-between">
        <li>
          <NavLink to="/"
            className={({isActive}) => isActive ? 'underline': ''}
          >
            Blogme
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard"
            className={({isActive}) => isActive ? 'underline': ''}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <Button variant="outlined"
            onClick={ () => logout.mutate() }
          >
            Logout
          </Button> 
        </li>
        <li>
          <NavLink to="/login"
            className={({isActive}) => isActive ? 'underline': ''}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}