import React, { useState } from "react";
import "./tutor_education.css";
import logo from "../../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";

const TutorEducation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    secondary_institute_name: "",
    secondary_degree: "",
    secondary_id: null,
    secondary_result: "",
    secondary_certificate: null,
    secondary_passing_year: "",
    secondary_curriculum: "",
    currently_at_secondary: false,

    higher_secondary_institute_name: "",
    higher_secondary_degree: "",
    higher_secondary_id: null,
    higher_secondary_result: "",
    higher_secondary_certificate: null,
    higher_secondary_passing_year: "",
    higher_secondary_curriculum: "",
    currently_at_higher_secondary: false,

    bachelors_institute_name: "",
    bachelors_id: null,
    bachelors_result: "",
    bachelors_certificate: null,
    bachelors_passing_year: "",
    currently_at_bachelors: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tutor Education Data:", formData);
    // TODO: connect with backend API
  };

  return (
    <div className="tutoreducation-page">
      <div className="tutoreducation-card">
        <img src={logo} alt="Slight Edge Academics Logo" className="tutoreducation-logo" />

        <h1 className="tutoreducation-title">Educational Information</h1>
        <p className="tutoreducation-subtitle">
          Complete your educational profile to continue with Slight Edge Academics.
        </p>

        <form className="tutoreducation-form" onSubmit={handleSubmit}>
          {/* ===================== Secondary ===================== */}
          <h2 className="section-title">Secondary Education (SSC/O-Level)</h2>

          <div className="form-row">
            <div className="input-group">
              <label>Institute Name</label>
              <input
                type="text"
                name="secondary_institute_name"
                value={formData.secondary_institute_name}
                onChange={handleChange}
                placeholder="Enter secondary institute name"
                required
              />
            </div>

            <div className="input-group">
              <label>Degree</label>
              <input
                type="text"
                name="secondary_degree"
                value={formData.secondary_degree}
                onChange={handleChange}
                placeholder="e.g., SSC, O-Level"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Result</label>
              <input
                type="text"
                name="secondary_result"
                value={formData.secondary_result}
                onChange={handleChange}
                placeholder="e.g., GPA 5.00 or A*AA"
                required
              />
            </div>

            <div className="input-group">
              <label>Passing Year</label>
              <input
                type="date"
                name="secondary_passing_year"
                value={formData.secondary_passing_year}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Curriculum</label>
              <input
                type="text"
                name="secondary_curriculum"
                value={formData.secondary_curriculum}
                onChange={handleChange}
                placeholder="e.g., National, Edexcel, Cambridge"
              />
            </div>

            <div className="input-group checkbox-group">
              <label htmlFor="currently_at_secondary">
                Currently Studying
                <input
                  type="checkbox"
                  id="currently_at_secondary"
                  name="currently_at_secondary"
                  checked={formData.currently_at_secondary}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Upload ID</label>
              <input
                type="file"
                name="secondary_id"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Upload Certificate</label>
              <input
                type="file"
                name="secondary_certificate"
                accept=".pdf,image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ===================== Higher Secondary ===================== */}
          <h2 className="section-title">Higher Secondary Education (HSC/A-Level)</h2>

          <div className="form-row">
            <div className="input-group">
              <label>Institute Name</label>
              <input
                type="text"
                name="higher_secondary_institute_name"
                value={formData.higher_secondary_institute_name}
                onChange={handleChange}
                placeholder="Enter higher secondary institute name"
              />
            </div>

            <div className="input-group">
              <label>Degree</label>
              <input
                type="text"
                name="higher_secondary_degree"
                value={formData.higher_secondary_degree}
                onChange={handleChange}
                placeholder="e.g., HSC, A-Level"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Result</label>
              <input
                type="text"
                name="higher_secondary_result"
                value={formData.higher_secondary_result}
                onChange={handleChange}
                placeholder="e.g., GPA 5.00 or A*AA"
              />
            </div>

            <div className="input-group">
              <label>Passing Year</label>
              <input
                type="date"
                name="higher_secondary_passing_year"
                value={formData.higher_secondary_passing_year}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Curriculum</label>
              <input
                type="text"
                name="higher_secondary_curriculum"
                value={formData.higher_secondary_curriculum}
                onChange={handleChange}
                placeholder="e.g., National, Edexcel, Cambridge"
              />
            </div>

            <div className="input-group checkbox-group">
              <label htmlFor="currently_at_higher_secondary">
                Currently Studying
                <input
                  type="checkbox"
                  id="currently_at_higher_secondary"
                  name="currently_at_higher_secondary"
                  checked={formData.currently_at_higher_secondary}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Upload ID</label>
              <input
                type="file"
                name="higher_secondary_id"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Upload Certificate</label>
              <input
                type="file"
                name="higher_secondary_certificate"
                accept=".pdf,image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ===================== Bachelors ===================== */}
          <h2 className="section-title">Bachelors (If applicable)</h2>

          <div className="form-row">
            <div className="input-group">
              <label>Institute Name</label>
              <input
                type="text"
                name="bachelors_institute_name"
                value={formData.bachelors_institute_name}
                onChange={handleChange}
                placeholder="Enter university name"
              />
            </div>

            <div className="input-group">
              <label>Result</label>
              <input
                type="text"
                name="bachelors_result"
                value={formData.bachelors_result}
                onChange={handleChange}
                placeholder="e.g., CGPA 3.80 / 4.00"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Passing Year</label>
              <input
                type="date"
                name="bachelors_passing_year"
                value={formData.bachelors_passing_year}
                onChange={handleChange}
              />
            </div>

            <div className="input-group checkbox-group">
              <label htmlFor="currently_at_bachelors">
                Currently Studying
                <input
                  type="checkbox"
                  id="currently_at_bachelors"
                  name="currently_at_bachelors"
                  checked={formData.currently_at_bachelors}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Upload ID</label>
              <input
                type="file"
                name="bachelors_id"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Upload Certificate</label>
              <input
                type="file"
                name="bachelors_certificate"
                accept=".pdf,image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="tutoreducation-button">
            Save and Continue
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

export default TutorEducation;
