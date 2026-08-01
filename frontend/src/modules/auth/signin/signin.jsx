import React, { useState } from "react";
import "./signin.css";
import logo from "../../../assets/logo/logo.png";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("authentication/login/", formData);
      const data = response.data;

      // Temporary: Check backend response
      console.log(data);

      // Save tokens to localStorage
      if (data.access) {
        localStorage.setItem("access_token", data.access);
      }
      if (data.refresh) {
        localStorage.setItem("refresh_token", data.refresh);
      }

      // Check role and redirect accordingly
      const role = data.user_role;
      const isProfileCompleted = data.is_profile_completed;
      const isEducationCompleted = data.is_education_completed;

      if (role === "TUTOR") {
        if (!isProfileCompleted) {
          navigate("/tutor_profile");
        } else if (!isEducationCompleted) {
          navigate("/tutor_education");
        } else {
          navigate("/tutor_dashboard");
        }
      } else if (role === "STUDENT") {
        if (!isProfileCompleted) {
          navigate("/student_profile");
        } else {
          navigate("/student_dashboard");
        }
      } else if (role === "ADMIN") {
        navigate("/admin_dashboard");
      } else {
        // Fallback default redirect if role is unknown
        navigate("/");
      }

    } catch (error) {
      console.error("Sign in error:", error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Invalid email or password. Please try again.";

      alert(errorMessage);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-box">
          {/* Logo */}
          <img
            src={logo}
            alt="Lets Educate Logo"
            className="signin-logo"
          />

          {/* Welcome message */}
          <h1 className="welcome-text">Welcome to Lets Educate</h1>

          {/* Sign in title */}
          <h2 className="signin-title">Sign In to Continue</h2>

          {/* Form */}
          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>

          {/* Footer Links */}
          <div className="signin-footer">
            <p>
              Haven’t registered yet?{" "}
              <button
                className="signup-link"
                onClick={() => navigate("/userchoice")}
              >
                Sign Up
              </button>
            </p>

            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;