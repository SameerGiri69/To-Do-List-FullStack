import React, { useEffect } from "react";
import * as Yup from "yup";
import "./LoginPage.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../Context/useAuth";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router";

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { loginUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const res = isLoggedIn();
    if (res === true) {
      navigate("home");
    }
    return;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validation) });

  const handleLogin = async (form) => {
    loginUser(form.email, form.password);
  };

  return (
    <section className="section-container">
      <div className="main-wrapper">
        <div className="form-container">
          <div className="form-content">
            <h1 className="form-title">Sign in to your account</h1>
            <form className="form-content" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-input"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error-text">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="form-input"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error-text">{errors.password.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="forgot-password-link">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="submit-button">
                Sign in
              </button>
              <p className="additional-text">
                Don’t have an account yet?{" "}
                <a href="#" className="sign-up-link">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
