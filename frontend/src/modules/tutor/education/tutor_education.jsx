import React, { useState } from "react";
import "./tutor_education.css";
import logo from "../../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import {
  CURRICULUM_OPTIONS,
  CURRENT_EDUCATION_LEVEL_OPTIONS,
} from "../../../assets/external/choice_tuple";

const TutorEducation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Secondary Education (Mandatory)
    secondary_curriculum: "",
    secondary_institute_name: "",
    secondary_result: "",
    secondary_certificate: null,
    secondary_passing_year: "",

    // Higher Secondary Education (Mandatory)
    higher_secondary_curriculum: "",
    higher_secondary_institute_name: "",
    higher_secondary_result: "",
    higher_secondary_certificate: null,
    higher_secondary_passing_year: "",

    // Bachelors Education (Mandatory)
    bachelors_institute_name: "",
    bachelors_field_of_study: "",
    bachelors_id: null,
    bachelors_result: "",
    bachelors_certificate: null,
    bachelors_passing_year: "",

    // Masters Education (Optional)
    masters_institute_name: "",
    masters_field_of_study: "",
    masters_id: null,
    masters_result: "",
    masters_certificate: null,
    masters_passing_year: "",

    // Current Academic Standing (Mandatory)
    current_education_level: "",
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

  // Helper check to verify that all mandatory fields are filled
  const isFormValid =
    formData.secondary_curriculum.trim() !== "" &&
    formData.secondary_institute_name.trim() !== "" &&
    formData.secondary_result.trim() !== "" &&
    formData.secondary_certificate !== null &&
    formData.secondary_passing_year !== "" &&
    formData.higher_secondary_curriculum.trim() !== "" &&
    formData.higher_secondary_institute_name.trim() !== "" &&
    formData.higher_secondary_result.trim() !== "" &&
    formData.higher_secondary_certificate !== null &&
    formData.higher_secondary_passing_year !== "" &&
    formData.bachelors_institute_name.trim() !== "" &&
    formData.bachelors_field_of_study.trim() !== "" &&
    formData.bachelors_id !== null &&
    formData.bachelors_result.trim() !== "" &&
    formData.bachelors_certificate !== null &&
    formData.bachelors_passing_year !== "" &&
    formData.current_education_level.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mandatory dropdown selections check
    if (!formData.current_education_level) {
      alert("Please select your current education level.");
      return;
    }

    if (!formData.secondary_curriculum) {
      alert("Please select your secondary education curriculum.");
      return;
    }

    if (!formData.higher_secondary_curriculum) {
      alert("Please select your higher secondary education curriculum.");
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
      const response = await api.post("user_profile/tutor-education/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Education details saved successfully:", response.data);
      alert("Educational information submitted successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Error submitting educational information:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to submit educational details. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="tutoreducation-page">
      <div className="tutoreducation-card">
        <img
          src={logo}
          alt="Slight Edge Academics Logo"
          className="tutoreducation-logo"
        />

        <h1 className="tutoreducation-title">Educational Information</h1>
        <p className="tutoreducation-subtitle">
          Complete your educational profile to continue with Lets Educate.
        </p>

        <form className="tutoreducation-form" onSubmit={handleSubmit}>
          {/* ===================== Current Education Level ===================== */}
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="current_education_level">
                Current Education Level <span className="required">*</span>
              </label>
              <select
                name="current_education_level"
                id="current_education_level"
                value={formData.current_education_level}
                onChange={handleChange}
                required
              >
                {CURRENT_EDUCATION_LEVEL_OPTIONS.map((opt) => (
                  <option key={typeof opt === "object" ? opt.value : opt} value={typeof opt === "object" ? opt.value : opt}>
                    {(typeof opt === "object" ? opt.label : opt) || "Select Current Level"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ===================== Secondary Education ===================== */}
          <h2 className="section-title">Secondary Education</h2>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="secondary_institute_name">
                Institute Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="secondary_institute_name"
                id="secondary_institute_name"
                value={formData.secondary_institute_name}
                onChange={handleChange}
                placeholder="Enter school name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="secondary_curriculum">
                Curriculum <span className="required">*</span>
              </label>
              <select
                name="secondary_curriculum"
                id="secondary_curriculum"
                value={formData.secondary_curriculum}
                onChange={handleChange}
                required
              >
                {CURRICULUM_OPTIONS.map((opt) => (
                  <option key={typeof opt === "object" ? opt.value : opt} value={typeof opt === "object" ? opt.value : opt}>
                    {(typeof opt === "object" ? opt.label : opt) || "Select Curriculum"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="secondary_result">
                Result <span className="required">*</span>
              </label>
              <input
                type="text"
                name="secondary_result"
                id="secondary_result"
                value={formData.secondary_result}
                onChange={handleChange}
                placeholder="e.g., GPA 5.00 or 5 A*"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="secondary_passing_year">
                Passing Year <span className="required">*</span>
              </label>
              <input
                type="number"
                name="secondary_passing_year"
                id="secondary_passing_year"
                value={formData.secondary_passing_year}
                onChange={handleChange}
                placeholder="e.g., 2018"
                min="1990"
                max="2030"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="secondary_certificate">
                Upload Certificate <span className="required">*</span>
              </label>
              <input
                type="file"
                name="secondary_certificate"
                id="secondary_certificate"
                accept=".pdf,image/*"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ===================== Higher Secondary Education ===================== */}
          <h2 className="section-title">Higher Secondary Education</h2>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="higher_secondary_institute_name">
                Institute Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="higher_secondary_institute_name"
                id="higher_secondary_institute_name"
                value={formData.higher_secondary_institute_name}
                onChange={handleChange}
                placeholder="Enter college name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="higher_secondary_curriculum">
                Curriculum <span className="required">*</span>
              </label>
              <select
                name="higher_secondary_curriculum"
                id="higher_secondary_curriculum"
                value={formData.higher_secondary_curriculum}
                onChange={handleChange}
                required
              >
                {CURRICULUM_OPTIONS.map((opt) => (
                  <option key={typeof opt === "object" ? opt.value : opt} value={typeof opt === "object" ? opt.value : opt}>
                    {(typeof opt === "object" ? opt.label : opt) || "Select Curriculum"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="higher_secondary_result">
                Result <span className="required">*</span>
              </label>
              <input
                type="text"
                name="higher_secondary_result"
                id="higher_secondary_result"
                value={formData.higher_secondary_result}
                onChange={handleChange}
                placeholder="e.g., GPA 5.00 or 3 A*"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="higher_secondary_passing_year">
                Passing Year <span className="required">*</span>
              </label>
              <input
                type="number"
                name="higher_secondary_passing_year"
                id="higher_secondary_passing_year"
                value={formData.higher_secondary_passing_year}
                onChange={handleChange}
                placeholder="e.g., 2020"
                min="1990"
                max="2030"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="higher_secondary_certificate">
                Upload Certificate <span className="required">*</span>
              </label>
              <input
                type="file"
                name="higher_secondary_certificate"
                id="higher_secondary_certificate"
                accept=".pdf,image/*"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ===================== Bachelors ===================== */}
          <h2 className="section-title">Bachelors Degree</h2>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="bachelors_institute_name">
                Institute Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="bachelors_institute_name"
                id="bachelors_institute_name"
                value={formData.bachelors_institute_name}
                onChange={handleChange}
                placeholder="Enter university name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="bachelors_field_of_study">
                Field of Study <span className="required">*</span>
              </label>
              <input
                type="text"
                name="bachelors_field_of_study"
                id="bachelors_field_of_study"
                value={formData.bachelors_field_of_study}
                onChange={handleChange}
                placeholder="e.g., Computer Science, Economics, BBA"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="bachelors_result">
                Result / CGPA <span className="required">*</span>
              </label>
              <input
                type="text"
                name="bachelors_result"
                id="bachelors_result"
                value={formData.bachelors_result}
                onChange={handleChange}
                placeholder="e.g., CGPA 3.80 / 4.00"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="bachelors_passing_year">
                Passing / Expected Graduation Year <span className="required">*</span>
              </label>
              <input
                type="number"
                name="bachelors_passing_year"
                id="bachelors_passing_year"
                value={formData.bachelors_passing_year}
                onChange={handleChange}
                placeholder="e.g., 2024"
                min="1990"
                max="2030"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="bachelors_id">
                Student ID Card <span className="required">*</span>
              </label>
              <input
                type="file"
                name="bachelors_id"
                id="bachelors_id"
                accept=".pdf,image/*"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="bachelors_certificate">
                Upload Certificate / Offer Letter <span className="required">*</span>
              </label>
              <input
                type="file"
                name="bachelors_certificate"
                id="bachelors_certificate"
                accept=".pdf,image/*"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ===================== Masters ===================== */}
          <h2 className="section-title">Masters Degree</h2>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="masters_institute_name">Institute Name</label>
              <input
                type="text"
                name="masters_institute_name"
                id="masters_institute_name"
                value={formData.masters_institute_name}
                onChange={handleChange}
                placeholder="Enter university name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="masters_field_of_study">Field of Study</label>
              <input
                type="text"
                name="masters_field_of_study"
                id="masters_field_of_study"
                value={formData.masters_field_of_study}
                onChange={handleChange}
                placeholder="e.g., Software Engineering, MBA, Physics"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="masters_result">Result / CGPA</label>
              <input
                type="text"
                name="masters_result"
                id="masters_result"
                value={formData.masters_result}
                onChange={handleChange}
                placeholder="e.g., CGPA 3.90 / 4.00"
              />
            </div>

            <div className="input-group">
              <label htmlFor="masters_passing_year">Passing / Expected Year</label>
              <input
                type="number"
                name="masters_passing_year"
                id="masters_passing_year"
                value={formData.masters_passing_year}
                onChange={handleChange}
                placeholder="e.g., 2026"
                min="1990"
                max="2030"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="masters_id">Student ID Card</label>
              <input
                type="file"
                name="masters_id"
                id="masters_id"
                accept=".pdf,image/*"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="masters_certificate">Upload Certificate / Offer Letter</label>
              <input
                type="file"
                name="masters_certificate"
                id="masters_certificate"
                accept=".pdf,image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="tutoreducation-button"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorEducation;