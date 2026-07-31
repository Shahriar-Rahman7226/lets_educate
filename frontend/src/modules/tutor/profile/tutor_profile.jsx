import React, { useState } from "react";
import "./tutor_profile.css";
import logo from "../../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Helper check to verify if all required fields are populated
  const isFormValid =
    formData.govt_id !== null &&
    formData.overview.trim() !== "" &&
    formData.tutoring_experience.trim() !== "" &&
    formData.resume !== null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await api.post("user_profile/tutor_profile/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile updated successfully:", response.data);
      alert("Tutor profile created successfully!");
      navigate("/tutor_education");
    } catch (error) {
      console.error("Error submitting tutor profile:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Government ID - Required */}
          <div className="input-group">
            <label htmlFor="govt_id">
              Government ID (NID/Passport) <span className="required">*</span>
            </label>
            <input
              type="file"
              name="govt_id"
              id="govt_id"
              accept="image/*,.pdf"
              onChange={handleChange}
              required
            />
          </div>

          {/* Overview - Required */}
          <div className="input-group">
            <label htmlFor="overview">
              Overview <span className="required">*</span>
            </label>
            <textarea
              name="overview"
              id="overview"
              placeholder="Write a short introduction about yourself..."
              value={formData.overview}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Tutoring Experience - Required */}
          <div className="input-group">
            <label htmlFor="tutoring_experience">
              Tutoring Experience <span className="required">*</span>
            </label>
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

          {/* Facebook Profile - Optional */}
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

          {/* LinkedIn Profile - Optional */}
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

          {/* Additional Phone Number - Optional */}
          <div className="input-group">
            <label htmlFor="additional_phone_number">
              Additional Phone Number
            </label>
            <input
              type="tel"
              name="additional_phone_number"
              id="additional_phone_number"
              placeholder="Enter an alternative contact number"
              value={formData.additional_phone_number}
              onChange={handleChange}
            />
          </div>

          {/* Resume - Required */}
          <div className="input-group">
            <label htmlFor="resume">
              Resume (PDF or Image) <span className="required">*</span>
            </label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="tutorprofile-button"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Continue to Education Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorProfile;