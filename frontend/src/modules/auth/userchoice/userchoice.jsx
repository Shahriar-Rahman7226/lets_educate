import React from "react";
import { useNavigate } from "react-router-dom";
import "./userchoice.css";
import logo from "../../../assets/logo/logo.png";

const ChooseRole = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="role-selection-page">
      <div className="role-card-container">
        {/* Logo Section */}
        <div className="logo-wrapper">
          <img src={logo} alt="Let's Educate Logo" className="role-logo" />
        </div>

        {/* Header Titles */}
        <h2 className="role-title">Join Let's Educate</h2>
        <p className="role-subtitle">
          Where Knowledge Finds Its Purpose. Please choose how you want to get started:
        </p>

        {/* Option Cards */}
        <div className="roles-grid">
          {/* Student Card */}
          <div 
            className="role-box" 
            onClick={() => handleRoleSelect("student")}
            role="button"
            tabIndex={0}
          >
            <div className="role-badge">For Learners</div>
            <div className="role-icon-wrapper">🎓</div>
            <h3>Become a Student</h3>
            <p>
              Find expert tutors, request personalized tuition, and take your learning to the next level.
            </p>
            <button className="role-action-btn">
              Continue as Student &rarr;
            </button>
          </div>

          {/* Tutor Card */}
          <div 
            className="role-box" 
            onClick={() => handleRoleSelect("tutor")}
            role="button"
            tabIndex={0}
          >
            <div className="role-badge highlight">For Educators</div>
            <div className="role-icon-wrapper">👨‍🏫</div>
            <h3>Become a Tutor</h3>
            <p>
              Share your expertise, connect with students in need, and build your teaching career.
            </p>
            <button className="role-action-btn">
              Continue as Tutor &rarr;
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <p className="signin-prompt">
          Already have an account? <a href="/signin" className="signin-link">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default ChooseRole;