import React from "react";
import axios from "axios";

const api = "http://localhost:5203/api/";

export const loginAPI = async (email, password) => {
  try {
    const data = await axios.post(
      api + "account/login",
      {
        UserName: email,
        Password: password,
      },
      { withCredentials: true }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const registerApi = async (UserName, Email, Password) => {
  try {
    const data = await axios.post(api + "account/register", {
      Email: Email,
      UserName: UserName,
      Password: Password,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const logOutAPI = async () => {
  const res = axios.post(api + `account/logout`, {}, { withCredentials: true });
  return res;
};
