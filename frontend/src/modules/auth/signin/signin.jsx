import React, { useState } from "react";
import "./signin.css";
import logo from "../../../assets/logo/logo.png"; 
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing in with:", formData);
    // Connect this later to your backend API
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
                    onClick={() => navigate("/signup")}
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
