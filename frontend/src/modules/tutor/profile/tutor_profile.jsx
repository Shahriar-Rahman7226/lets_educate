import React, { useState } from "react";
import "./tutor_profile.css";
import logo from "../../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";

const TutorProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    govt_id: null,
    overview: "",
    tutoring_experience: "",
    facebook: "",
    linkedin: "",
    additional_phone_number: "",
    resume: null,
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tutor Profile Data:", formData);
    // Connect this later to backend API
  };

  return (
    <div className="tutorprofile-page">
      <div className="tutorprofile-card">
        {/* Logo */}
        <img
          src={logo}
          alt="Slight Edge Academics Logo"
          className="tutorprofile-logo"
        />

        {/* Title */}
        <h1 className="tutorprofile-title">Tutor Profile Setup</h1>
        <p className="tutorprofile-subtitle">
          Complete your profile to begin tutoring with Lets Educate.
        </p>

        {/* Form */}
        <form className="tutorprofile-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="govt_id">Government ID (NID/Passport)</label>
            <input
              type="file"
              name="govt_id"
              id="govt_id"
              accept="image/*,.pdf"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="overview">Overview</label>
            <textarea
              name="overview"
              id="overview"
              placeholder="Write a short introduction about yourself..."
              value={formData.overview}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="tutoring_experience">Tutoring Experience</label>
            <input
              type="text"
              name="tutoring_experience"
              id="tutoring_experience"
              placeholder="e.g., 3 years teaching Mathematics"
              value={formData.tutoring_experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="facebook">Facebook Profile</label>
            <input
              type="url"
              name="facebook"
              id="facebook"
              placeholder="Enter your Facebook profile link"
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="linkedin">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedin"
              id="linkedin"
              placeholder="Enter your LinkedIn profile link"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="additional_phone_number">Additional Phone Number</label>
            <input
              type="tel"
              name="additional_phone_number"
              id="additional_phone_number"
              placeholder="Enter an alternative contact number"
              value={formData.additional_phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="resume">Resume / CV (PDF or Image)</label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="tutorprofile-button">
            Complete Profile
          </button>
        </form>

        <div className="signin-link">
          <p>
            Already completed your profile?{" "}
            <button onClick={() => navigate("/signin")}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;