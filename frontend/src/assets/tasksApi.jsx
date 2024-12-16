import axios from "axios";
import React from "react";

const api = "http://localhost:5203/api/task/";
const xx = "http://localhost:5203/api/task/set-iscompleted/2002";
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
  debugger;
  const res = await axios.post(api + `set-iscompleted/${taskId}`, {
    withCredentials: true,
  });
};
