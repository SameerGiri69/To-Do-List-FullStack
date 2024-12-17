import React from "react";
import { useState } from "react";
import "./CreateTaskPage.css";
import { createUserTask } from "../../tasksApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const CreateTaskPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    createUserTask(formData);
    setFormData({ title: "", description: "" });
    toast.success("Task added successfully");
    navigate("../tasks", { state: { refresh: Date.now() } });
  };
  return (
    <div className="form-container">
      <h2>Add a New Task</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows={4}
            required
          />
        </div>
        <button className="form-submit-btn" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
