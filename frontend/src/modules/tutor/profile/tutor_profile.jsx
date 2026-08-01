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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Check if all required fields are populated
  const isFormValid =
    formData.govt_id !== null &&
    formData.overview.trim() !== "" &&
    formData.tutoring_experience.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    try {
      const response = await api.post(
        "user_profile/tutor-profile/",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile created successfully:", response.data);
      alert("Tutor profile created successfully!");
      navigate("/tutor_education");
    } catch (error) {
      console.error("Error submitting tutor profile:", error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to create profile. Please try again.";

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
          alt="Lets Educate Logo"
          className="tutorprofile-logo"
        />

        {/* Title */}
        <h1 className="tutorprofile-title">Tutor Profile Setup</h1>
        <p className="tutorprofile-subtitle">
          Complete your profile to begin tutoring with Lets Educate.
        </p>

        {/* Form */}
        <form className="tutorprofile-form" onSubmit={handleSubmit}>
          {/* Government ID */}
          <div className="input-group">
            <label htmlFor="govt_id">
              Government ID (NID/Passport){" "}
              <span className="required">*</span>
            </label>
            <input
              type="file"
              id="govt_id"
              name="govt_id"
              accept="image/*,.pdf"
              onChange={handleChange}
              required
            />
          </div>

          {/* Overview */}
          <div className="input-group">
            <label htmlFor="overview">
              Overview <span className="required">*</span>
            </label>
            <textarea
              id="overview"
              name="overview"
              placeholder="Write a short introduction about yourself..."
              value={formData.overview}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tutoring Experience */}
          <div className="input-group">
            <label htmlFor="tutoring_experience">
              Tutoring Experience <span className="required">*</span>
            </label>
            <input
              type="text"
              id="tutoring_experience"
              name="tutoring_experience"
              placeholder="e.g., 3 years teaching Mathematics"
              value={formData.tutoring_experience}
              onChange={handleChange}
              required
            />
          </div>

          {/* Facebook */}
          <div className="input-group">
            <label htmlFor="facebook">Facebook Profile</label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              placeholder="Enter your Facebook profile link"
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>

          {/* LinkedIn */}
          <div className="input-group">
            <label htmlFor="linkedin">LinkedIn Profile</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              placeholder="Enter your LinkedIn profile link"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="tutorprofile-button"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Continue to Education Details"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorProfile;