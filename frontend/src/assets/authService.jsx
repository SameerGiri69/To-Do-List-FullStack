import React from "react";
import axios from "axios";

const api = "http://localhost:5203/api/";

export const loginAPI = async (email, password) => {
  try {
    const data = await axios.post(api + "account/login", {
      Email: email,
      Password: password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const logOutAPI = async () => {
   const res= axios.get(api + `account/logout`, { withCredentials: true });
   return res;
  };