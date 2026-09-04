import React, { useState } from "react";
import "./student_session_booking.css";

import {
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaLayerGroup,
  FaInfoCircle,
  FaChevronRight,
} from "react-icons/fa";

const StudentSessionBooking = () => {
  const [activeTab, setActiveTab] = useState("session");

  const [sessionForm, setSessionForm] = useState({
    classLevel: "",
    subjects: "",
    numberOfSessions: "",
    endDate: "",
    preferableDays: "",
    preferableTime: "",
    description: "",
  });

  const [packageForm, setPackageForm] = useState({
    classLevel: "",
    subjects: "",
    numberOfSessions: "",
    preferableDays: "",
    preferableTime: "",
    description: "",
  });

  const classOptions = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "O Level",
    "A Level",
    "HSC",
    "University",
    "Other",
  ];

  const handleSessionChange = (e) => {
    const { name, value } = e.target;

    setSessionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePackageChange = (e) => {
    const { name, value } = e.target;

    setPackageForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    console.log("Session-wise booking request:", sessionForm);
  };

  const handlePackageSubmit = (e) => {
    e.preventDefault();
    console.log("Package booking request:", packageForm);
  };

  return (
    <div className="student-session-booking-page">
      <section className="student-session-booking-section">
        <div className="booking-header">
          <div className="booking-header-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <h1>Create Your Learning Plan</h1>
            <p>
              Choose session-wise tutoring or a monthly package that matches
              your learning needs.
            </p>
          </div>
        </div>

        {/* ================= BOOKING TABS ================= */}
        <div className="booking-tabs">
          <button
            type="button"
            className={`booking-tab ${
              activeTab === "session" ? "active" : ""
            }`}
            onClick={() => setActiveTab("session")}
          >
            <FaCalendarAlt />
            <span>Session-wise Booking</span>
          </button>

          <button
            type="button"
            className={`booking-tab ${
              activeTab === "package" ? "active" : ""
            }`}
            onClick={() => setActiveTab("package")}
          >
            <FaLayerGroup />
            <span>Package Booking</span>
          </button>
        </div>

        {/* ================= SESSION-WISE BOOKING ================= */}
        {activeTab === "session" && (
          <form
            className="booking-form-card"
            onSubmit={handleSessionSubmit}
          >
            <div className="form-card-heading">
              <div>
                <span className="form-eyebrow">INDIVIDUAL SESSIONS</span>
                <h2>Session-wise Tutoring</h2>
                <p>
                  Request the number of individual tutoring sessions you need
                  according to your schedule.
                </p>
              </div>
            </div>

            <div className="form-grid">
              {/* Class */}
              <div className="form-group">
                <label htmlFor="session-class">
                  Select Class <span>*</span>
                </label>

                <div className="input-with-icon">
                  <FaBook />
                  <select
                    id="session-class"
                    name="classLevel"
                    value={sessionForm.classLevel}
                    onChange={handleSessionChange}
                    required
                  >
                    <option value="">Select your class</option>

                    {classOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Sessions */}
              <div className="form-group">
                <label htmlFor="session-count">
                  Number of Sessions <span>*</span>
                </label>

                <div className="input-with-icon">
                  <FaCalendarAlt />
                  <input
                    id="session-count"
                    type="number"
                    name="numberOfSessions"
                    min="1"
                    placeholder="e.g. 8"
                    value={sessionForm.numberOfSessions}
                    onChange={handleSessionChange}
                    required
                  />
                </div>
              </div>

              {/* Subjects */}
              <div className="form-group form-group-full">
                <label htmlFor="session-subjects">
                  Subjects <span>*</span>
                </label>

                <input
                  id="session-subjects"
                  type="text"
                  name="subjects"
                  placeholder="e.g. Mathematics, Physics"
                  onChange={handleSessionChange}
                  required
                />
              </div>

              {/* End Date */}
              <div className="form-group">
                <label htmlFor="session-end-date">
                  Preferred Completion Date <span>*</span>
                </label>

                <div className="input-with-icon">
                  <FaCalendarAlt />
                  <input
                    id="session-end-date"
                    type="date"
                    name="endDate"
                    value={sessionForm.endDate}
                    onChange={handleSessionChange}
                    required
                  />
                </div>

                <small className="field-help">
                  Select the date by which you would preferably like to
                  complete all requested sessions.
                </small>
              </div>

              {/* Preferred Time */}
              <div className="form-group">
                <label htmlFor="session-time">
                  Preferable Timing <span>*</span>
                </label>

                <div className="input-with-icon">
                  <FaClock />
                  <input
                    id="session-time"
                    type="text"
                    name="preferableTime"
                    placeholder="e.g. 5:00 PM - 7:00 PM"
                    value={sessionForm.preferableTime}
                    onChange={handleSessionChange}
                    required
                  />
                </div>
              </div>

              {/* Preferred Days */}
              <div className="form-group form-group-full">
                <label htmlFor="session-days">
                  Preferable Days <span>*</span>
                </label>

                <input
                  id="session-days"
                  type="text"
                  name="preferableDays"
                  placeholder="e.g. Friday, Saturday"
                  onChange={handleSessionChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group form-group-full">
                <label htmlFor="session-description">
                  Additional Requirements
                </label>

                <textarea
                  id="session-description"
                  name="description"
                  rows="6"
                  placeholder="Tell us more about your learning goals, preferred teaching style, weak topics, exam preparation needs or any other requirements."
                  value={sessionForm.description}
                  onChange={handleSessionChange}
                />
              </div>
            </div>

            <BookingGuidelineNote />

            <div className="form-submit-area">
              <button type="submit" className="booking-submit-btn">
                Submit Booking Request
                <FaChevronRight />
              </button>
            </div>
          </form>
        )}

        {/* ================= PACKAGE BOOKING ================= */}
        {activeTab === "package" && (
          <form
            className="booking-form-card"
            onSubmit={handlePackageSubmit}
          >
            <div className="form-card-heading">
              <div>
                <span className="form-eyebrow">MONTHLY PACKAGE</span>
                <h2>Package Tutoring</h2>
                <p>
                  Request a recurring monthly tutoring package based on your
                  preferred schedule and learning requirements.
                </p>
              </div>
            </div>

            <div className="form-grid">
              {/* Class */}
              <div className="form-group">
                <label htmlFor="package-class">
                  Select Class <span>*</span>
                </label>

                <div className="input-with-icon">
                  <FaBook />
                  <select
                    id="package-class"
                    name="classLevel"
                    value={packageForm.classLevel}
                    onChange={handlePackageChange}
                    required
                  >
                    <option value="">Select your class</option>

                    {classOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Sessions */}
              <div className="form-group">
                <label htmlFor="package-count">
                  Sessions Per Month <span>*</span>
                </label>

                <div className="input-with-icon">
                  <FaCalendarAlt />
                  <input
                    id="package-count"
                    type="number"
                    name="numberOfSessions"
                    min="1"
                    placeholder="e.g. 12"
                    value={packageForm.numberOfSessions}
                    onChange={handlePackageChange}
                    required
                  />
                </div>
              </div>

              {/* Subjects */}
              <div className="form-group form-group-full">
                <label htmlFor="package-subjects">
                  Subjects <span>*</span>
                </label>

                <input
                  id="package-subjects"
                  type="text"
                  name="subjects"
                  // list="package-subject-suggestions"
                  placeholder="e.g. Mathematics, Physics"
                  // value={packageForm.subjects}
                  onChange={handlePackageChange}
                  required
                />
              </div>

              {/* Preferred Time */}
              <div className="form-group">
                <label htmlFor="package-time">
                  Preferable Timing <span>*</span>
                </label>

                <div className="input-with-icon">
                  <FaClock />
                  <input
                    id="package-time"
                    type="text"
                    name="preferableTime"
                    placeholder="e.g. 5:00 PM - 7:00 PM"
                    value={packageForm.preferableTime}
                    onChange={handlePackageChange}
                    required
                  />
                </div>
              </div>

              {/* Preferred Days */}
              <div className="form-group">
                <label htmlFor="package-days">
                  Preferable Days <span>*</span>
                </label>

                <input
                  id="package-days"
                  type="text"
                  name="preferableDays"
                  placeholder="e.g. Friday, Saturday"
                  onChange={handlePackageChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group form-group-full">
                <label htmlFor="package-description">
                  Additional Requirements
                </label>

                <textarea
                  id="package-description"
                  name="description"
                  rows="6"
                  placeholder="Tell us about your learning goals, preferred teaching style, syllabus coverage, exam preparation or any other requirements."
                  value={packageForm.description}
                  onChange={handlePackageChange}
                />
              </div>
            </div>

            <BookingGuidelineNote />

            <div className="form-submit-area">
              <button type="submit" className="booking-submit-btn">
                Submit Package Request
                <FaChevronRight />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

const BookingGuidelineNote = () => {
  return (
    <div className="guideline-note">
      <div className="guideline-note-icon">
        <FaInfoCircle />
      </div>

      <div>
        <strong>Before submitting your request</strong>
        <p>
          Please read the guidelines from the{" "}
          <strong>Guidelines &amp; Instructions</strong> section carefully
          before booking sessions. Your request will be reviewed according to
          the platform's booking guidelines and tutor availability.
        </p>
      </div>
    </div>
  );
};

export default StudentSessionBooking;