import React from "react";
import { useAuth } from "../../Context/useAuth";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MyApp</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="create-task">Add Task</Link>
        </li>
        <li>
          <Link to="tasks">Home</Link>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        {isLoggedIn() ? (
          <li>
            <button className="navbar-button logout" onClick={logout}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="login" className="hover:text-darkBlue">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
