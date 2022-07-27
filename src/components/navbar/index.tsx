import { NavLink } from "react-router-dom";

export default function Navbar() {

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
          <button>Logout</button>
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