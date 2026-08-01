import React, { useState } from "react";
import "./student_profile.css";
import logo from "../../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { CURRICULUM_OPTIONS } from "../../../assets/external/choice_tuple";

const StudentProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    institute_name: "",
    institute_id: null,
    curriculum: "",
    overview: "",
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
    formData.institute_name.trim() !== "" &&
    formData.institute_id !== null &&
    formData.curriculum.trim() !== "" &&
    formData.overview.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check mandatory dropdown selection
    if (!formData.curriculum) {
      alert("Please select your curriculum.");
      return;
    }

    if (!isFormValid) return;

    setIsSubmitting(true);

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await api.post("user_profile/student-profile/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile updated successfully:", response.data);
      alert("Student profile created successfully!");
      navigate("/student_dashboard");
    } catch (error) {
      console.error("Error submitting student profile:", error);
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
    <div className="studentprofile-page">
      <div className="studentprofile-card">
        {/* Logo */}
        <img
          src={logo}
          alt="Lets Educate Logo"
          className="studentprofile-logo"
        />

        {/* Title */}
        <h1 className="studentprofile-title">Student Profile Setup</h1>
        <p className="studentprofile-subtitle">
          Complete your profile to start learning with Lets Educate.
        </p>

        {/* Form */}
        <form className="studentprofile-form" onSubmit={handleSubmit}>
          {/* Institute Name - Required */}
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="institute_name">
                Institute Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="institute_name"
                id="institute_name"
                value={formData.institute_name}
                onChange={handleChange}
                placeholder="Enter school name"
                required
              />
            </div>
          </div>

          {/* Institute ID - Required */}
          <div className="input-group">
            <label htmlFor="institute_id">
              Institute ID <span className="required">*</span>
            </label>
            <input
              type="file"
              name="institute_id"
              id="institute_id"
              accept="image/*,.pdf"
              onChange={handleChange}
              required
            />
          </div>

          {/* Curriculum - Required */}
          <div className="input-group">
            <label htmlFor="curriculum">
              Curriculum <span className="required">*</span>
            </label>
            <select
              id="curriculum"
              name="curriculum"
              value={formData.curriculum}
              onChange={handleChange}
              required
            >
              {CURRICULUM_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt || "Select Curriculum"}
                </option>
              ))}
            </select>
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

export default StudentProfile;