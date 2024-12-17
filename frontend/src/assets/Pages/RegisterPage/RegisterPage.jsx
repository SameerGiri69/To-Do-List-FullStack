import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./RegisterPage.css";
import { useAuth } from "../../Context/useAuth";
// Validation schema using Yup
const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  userName: Yup.string().required("Username is required"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { registerUser } = useAuth();
  const handleLogin = (form) => {
    console.log("Form Submitted:", form);
    setFormSubmitted(true);
    registerUser(form.userName, form.email, form.password);
  };

  return (
    <section className="form-container">
      <div className="form-wrapper">
        <h1 className="form-title">Register Account</h1>
        <form className="form" onSubmit={handleSubmit(handleLogin)}>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          {/* Username Input */}
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
              {...register("userName")}
            />
            {errors.userName && (
              <p className="error-message">{errors.userName.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Sign Up
          </button>

          {formSubmitted && (
            <p className="success-message">Form submitted successfully!</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
