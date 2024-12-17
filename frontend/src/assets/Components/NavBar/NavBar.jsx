import React, { useState } from "react";
import { useAuth } from "../../Context/useAuth";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const [time, setTime] = useState();
  const [year, setyear] = useState();
  const [day, setDay] = useState();
  const [month, setMonth] = useState();

  setInterval(() => {
    const date = new Date();

    const year = date.getFullYear();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const time = date.toLocaleTimeString();
    setTime(time);
    setyear(year);
    setDay(day);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = monthNames[monthIndex];
    setMonth(monthName);
  }, 1000);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {isLoggedIn && user && <h1>Welcome {user.userName}</h1>}
      </div>
      {isLoggedIn && user && (
        <div className="navbar-datetime">
          <span className="navbar-date">{`${month}  ${day}`}</span>
          <span className="navbar-time">{time}</span>
        </div>
      )}

      <ul className="navbar-links">
        {isLoggedIn() ? (
          <>
            <li>
              <Link className="navbar-button tasks" to="home">
                Home
              </Link>
            </li>
            <li>
              <Link className="navbar-button tasks" to="tasks">
                My Tasks
              </Link>
            </li>
            <li>
              <Link className="navbar-button add" to="create-task">
                Add Task
              </Link>
            </li>
            <button className="navbar-button logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to="" className="hover:text-darkBlue">
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
