import React from "react";
import { useAuth } from "../../Context/useAuth";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {isLoggedIn && user && <h1>Welcome {user.userName}</h1>}
      </div>
      <ul className="navbar-links">
        {isLoggedIn() ? (
          <>
            <li>
              <Link to="tasks">My Tasks</Link>
            </li>
            <li>
              <button className="navbar-button logout" onClick={logout}>
                Logout
              </button>
            </li>
            <li>
              <Link to="create-task">Add Task</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="login" className="hover:text-darkBlue">
                Login
              </Link>
            </li>
            <li>
              <Link to="register" className="hover:text-darkBlue">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
