import React, { useEffect, useState } from "react";
import { getUserTasks, setIsCompletedApi } from "../../tasksApi";
import "./TaskList.css";
import { useToast } from "react-toastify";
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
  }, [isCompleted]);
  const handleIsCompleted = async (taskId) => {
    debugger;
    await setIsCompletedApi(taskId);
    setIsCompleted((prev) => !prev);
  };
  // setTasks((prevtasks) => ({...prevtasks, userTasks}))
  return (
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
        </div>
      ))}
    </div>
  );
};

export default TaskList;
