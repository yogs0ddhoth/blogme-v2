import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import { useLogout } from "../../../api/mutations";

export default function Navbar() {
  const logout = useLogout();

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
            onClick={() => logout.mutate()}
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