import PropTypes from "prop-types";
import { redirect, useNavigate } from "react-router";
import { loginAPI, logOutAPI } from "../authService";
import { toast } from "react-toastify";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the User Context
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    //initialized user and token for api calls
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token && Object.keys(JSON.parse(user)).length !== 0) {
      setUser(JSON.parse(user));
      setToken(token);
      // attached token to the header of  every api call we make
      axios.defaults.headers.common["Cookie"] = "Cookie" + token;
      console.log(document.cookie);
    }
    setIsReady(true);
  }, []);

  const loginUser = async (email, password) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token);
          setUser(userObj);
          toast.success("Login Success!");
          redirect("tasks");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };
  const logout = () => {
    const res = logOutAPI();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log(res.data);
    setUser(null);
    setToken("");
  };
  const isLoggedIn = () => {
    return !!user;
  };
  return (
    <UserContext.Provider value={{ loginUser, user, isLoggedIn, logout }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

// PropTypes validation
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useAuth = () => React.useContext(UserContext);
