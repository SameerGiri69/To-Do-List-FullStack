import React, { useEffect, useState } from "react";
import {
  deleteUserTask,
  getUserTasks,
  setIsCompletedApi,
} from "../../tasksApi";
import "./TaskList.css";
import { useToast } from "react-toastify";
import { useLocation } from "react-router";
const dummyTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is the description for Task 1.",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is the description for Task 2.",
    isCompleted: true,
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is the description for Task 3.",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Task 4",
    description: "This is the description for Task 4.",
    isCompleted: true,
  },
  {
    id: 5,
    title: "Task 5",
    description: "This is the description for Task 5.",
    isCompleted: false,
  },
];

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getUserTasks();

      if (Array.isArray(response)) {
        setTasks(response);
      } else {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [isCompleted, location.state?.refresh]);
  const handleIsCompleted = async (taskId) => {
    await setIsCompletedApi(taskId);
    setIsCompleted((prev) => !prev);
  };
  const handleDelete = async (taskId) => {
    const res = await deleteUserTask(taskId);
    setIsCompleted((prev) => !prev);
    console.log(res);
  };
  // setTasks((prevtasks) => ({...prevtasks, userTasks}))
  return (
    <>
      {tasks.length > 0 ? (
        <div className="task-container">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h1 className="task-title">{task.title}</h1>
              <p className="task-description">{task.description}</p>
              <button
                onClick={() => handleIsCompleted(task.id)}
                className={`task-status ${
                  task.isCompleted ? "completed" : "pending"
                }`}
              >
                Status: {task.isCompleted ? "Completed" : "Pending"}
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="no-tasks-heading">No Tasks for today 😴</h1>
      )}
    </>
  );
};

export default TaskList;
