// import React, { useState } from "react";
import "./tutor_dashboard.css";
import TutorImage from "../../../assets/images/student.webp";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaCoins,
  FaBullhorn,
  FaLongArrowAltRight,
  FaBookOpen,
  FaHistory,
  FaClipboardList,
  FaUserCog,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";

const TutorDashboard = () => {
  const navigate = useNavigate();

  const tutorData = {
    first_name: "Shahriar",
    last_name: "Rahman Rafi",
    full_name: "Shahriar Rahman Rafi",
    tutor_id: "T1234567",
    nationality: "Bangladeshi",
    email: "shahriar.rafi@example.com",
    phone_number: "+8801789456123",
    additional_phone_number: "+8801629456119",
    curriculum: "Cambridge",
    dob: "07 September 2002",
    profile_image: TutorImage,

    completed_sessions: 24,
    wallet_balance: 850,
  };

  const dashboardTiles = [
    {
      title: "Available Sessions",
      description:
        "Browse available tutoring sessions and apply for the ones that suit you.",
      icon: <FaSearch />,
      className: "available-sessions-tile",
      action: () => navigate("/available_sessions"),
    },

    {
      title: "Session History",
      description:
        "View your previous, upcoming and cancelled tutoring sessions.",
      icon: <FaHistory />,
      className: "session-history-tile",
      action: () => navigate("/tutor_session_history"),
    },

    {
      title: "Session Materials",
      description:
        "Provide students with homework, classwork, notes and other learning materials.",
      icon: <FaFileAlt />,
      className: "session-materials-tile",
      action: () => navigate("/tutor_session_materials"),
    },

    {
      title: "My Students",
      description:
        "View your students and access their learning and session information.",
      icon: <FaUsers />,
      className: "students-tile",
      action: () => navigate("/tutor_students"),
    },

    {
      title: "Guidelines & Instructions",
      description:
        "Learn how sessions, applications and tutoring on the platform work.",
      icon: <FaClipboardList />,
      className: "guidelines-tile",
      action: () => navigate("/tutor_instruction"),
    },

    {
      title: "Account Management",
      description:
        "Manage your profile, personal information and account settings.",
      icon: <FaUserCog />,
      className: "account-tile",
      action: () => navigate("/tutor_account"),
    },
  ];

  return (
    <div className="tutor-dashboard-page">
      <section className="tutor-dashboard-section">

        {/* ================= TUTOR INFORMATION ================= */}
        <div className="tutor-info-container">
          <div className="tutor-image">
            <img
              src={tutorData.profile_image}
              alt="Tutor Profile"
            />
          </div>

          <div className="tutor-details">
            <h3>Tutor Information</h3>

            <p>
              <strong>Name:</strong>{" "}
              {tutorData.full_name}
            </p>

            <p>
              <strong>Tutor ID:</strong>{" "}
              {tutorData.tutor_id}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {tutorData.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {tutorData.phone_number},{" "}
              {tutorData.additional_phone_number}
            </p>

            <p>
              <strong>Nationality:</strong>{" "}
              {tutorData.nationality}
            </p>

            <p>
              <strong>Curriculum:</strong>{" "}
              {tutorData.curriculum}
            </p>

            <p>
              <strong>Date of Birth:</strong>{" "}
              {tutorData.dob}
            </p>
          </div>
        </div>

        {/* ================= WALLET ================= */}
        <div className="wallet-section">

          <div className="wallet-reflection"></div>

          <div className="wallet-header">

            <div className="wallet-balance-area">

              <div className="wallet-icon">
                <FaCoins />
              </div>

              <div>
                <p className="wallet-small-label">
                  Current Wallet Balance
                </p>

                <h3 className="wallet-amount">
                  ${tutorData.wallet_balance}
                </h3>
              </div>

            </div>

            <div className="wallet-actions">

              <button
                className="payment-history-btn"
                onClick={() =>
                  navigate("/tutor_payment_history")
                }
              >
                Payment History
                <FaLongArrowAltRight />
              </button>

            </div>

          </div>

          <div className="wallet-motivation">
            <FaBullhorn />

            <span>
              Complete more sessions and build your
              <strong> tutoring reputation</strong> to attract more students!
            </span>
          </div>

        </div>

        {/* ================= DASHBOARD TILES ================= */}
        <div className="dashboard-tiles-section">

          {dashboardTiles.map((tile) => (

            <button
              key={tile.title}
              className={`dashboard-tile ${tile.className}`}
              onClick={tile.action}
            >

              <div className="tile-glass-shine"></div>

              <div className="tile-icon">
                {tile.icon}
              </div>

              <div className="tile-content">

                <h3>{tile.title}</h3>

                <p>
                  {tile.description}
                </p>

              </div>

              <FaLongArrowAltRight className="tile-arrow" />

            </button>

          ))}

        </div>

      </section>
    </div>
  );
};

export default TutorDashboard;