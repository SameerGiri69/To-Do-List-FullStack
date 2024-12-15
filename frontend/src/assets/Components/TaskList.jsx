import React, { useState } from "react";

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
  const [tasks, setTasks] = useState(dummyTasks);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
