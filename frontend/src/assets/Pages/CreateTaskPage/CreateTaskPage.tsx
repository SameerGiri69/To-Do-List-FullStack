import React from "react";
import { useState } from "react";
import "./CreateTaskPage.css";
import { createUserTask } from "../../tasksApi";
const CreateTaskPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    console.log("Submitted Data:", formData);
    createUserTask(formData);
    setFormData({ title: "", description: "" });
  };
  return (
    <div className="form-container">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
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

        {/* Description Input */}
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

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
