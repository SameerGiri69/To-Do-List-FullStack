import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

const api = "http://localhost:5203/api/task/";
export const getUserTasks = async () => {
  const res = await axios.get(api + "get-tasks", { withCredentials: true });
  return res.data;
};
const data = {
  title: "",
  description: "",
};
export const createUserTask = async (task) => {
  const res = await axios.post(
    api + "create-task",
    { Title: task.title, Description: task.description },
    { withCredentials: true }
  );
};
export const setIsCompletedApi = async (taskId) => {
  const res = await axios.post(api + `set-iscompleted/${taskId}`, {
    withCredentials: true,
  });
};
export const deleteUserTask = async (taskId) => {
  const res = await axios.delete(api + `delete-task/${taskId}`, {
    withCredentials: true,
  });
  if (res.status === 400) {
    return Error(res.status);
  }
  return res.data;
};
export const getQuoteApi = async () => {
  const res = await axios.get("https://quotes-github-readme.vercel.app/api");
  return res.data;
};
