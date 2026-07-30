import React, { useState } from "react";
import "./signup.css";
import logo from "../../../assets/logo/logo.png"; 
import api from "../../../services/api";

const NATIONALITY_OPTIONS = [
  "", "Australia", "Bangladesh", "United States"
];

const GENDER_OPTIONS = ["", "Male", "Female", "Other"];

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    additional_phone_number: "",
    nationality: "",
    dob: "",
    address: "",
    gender: "",
    profile_image: null,
    password: "",
    confirm_password: "",
  });

  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if terms accepted
    if (!agreed) {
      alert("Please accept Terms & Conditions.");
      return;
    }

    // Check dropdown mandatory selections
    if (!formData.nationality) {
      alert("Please select your nationality.");
      return;
    }

    if (!formData.gender) {
      alert("Please select your gender.");
      return;
    }

    // Check passwords match
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    // Build FormData payload to handle both text fields and profile_image file upload
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await api.post("users/create-tutor/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form Submitted Successfully:", response.data);
      alert("Tutor account created successfully!");
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Failed to create account. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img src={logo} alt="Lets Educate Logo" className="signup-logo" />

        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join Let's Educate — Where Knowledge Finds Its Purpose.</p>

        <form className="signup-form" onSubmit={handleSubmit}>

          {/* Row 1: First & Last Name */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">
                First Name <span className="required">*</span>
              </label>
              <input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">
                Last Name <span className="required">*</span>
              </label>
              <input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Row 3: phone numbers */}
          <div className="form-row">
              <label htmlFor="phone_number">Phone Number<span className="required">*</span>
              </label>
              <input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="+8801XXXXXXXXX"
              />
          </div>


          {/* Row 4: Nationality */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nationality">
                Nationality <span className="required">*</span>
              </label>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              >
                {NATIONALITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt || "Select Nationality"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 5: Date of Birth */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 6: Address */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">
                Address <span className="required">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                rows={3}
                required
              />
            </div>
          </div>

           {/* Row 7: Profile Image */}
          <div className="form-group">
            <label htmlFor="profile_image">Profile Image<span className="required">*</span>
            </label>
            <div className="profile-image-box">
              <input
                id="profile_image"
                name="profile_image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
              <span className="file-label">
                {formData.profile_image
                  ? formData.profile_image.name
                  : "Choose File"}
              </span>
            </div>
          </div>

          {/* Row 8: Gender */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g || "Select Gender"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 8: Password & Confirm Password */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">
                Confirm Password <span className="required">*</span>
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          {/* Terms */}
          <div className="terms-section">
            <label className="terms-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                required
              />
              I agree to the{" "}
              <a href="#" className="terms-link">
                Terms & Conditions
              </a>{" "}
            </label>
            <p className="terms-summary">
              By signing up, you agree to our privacy and community policies.{" "}
              <a href="#" className="read-more-link">
                Read more
              </a>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`signup-button ${!agreed ? "disabled" : ""}`}
            disabled={!agreed}
          >
            Sign Up
          </button>

          <p className="signin-footer">
            Already have an account? <a className="signin-link" href="/signin">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;