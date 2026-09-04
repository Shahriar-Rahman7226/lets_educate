import React from "react";
import "./student_dashboard.css";
import StudentImage from "../../../assets/images/student.webp";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaCoins,
  FaBullhorn,
  FaLongArrowAltRight,
  FaBookOpen,
  FaHistory,
  FaClipboardList,
  FaUserCog,
  FaUsers,
} from "react-icons/fa";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const studentData = {
    first_name: "Shahriar",
    last_name: "Rahman Rafi",
    full_name: "Shahriar Omar Rafi",
    student_id: "S1234567",
    nationality: "Bangladeshi",
    email: "shahriar.rafi@example.com",
    phone_number: "+8801789456123",
    additional_phone_number: "+8801629456119",
    curriculum: "Cambridge",
    dob: "07 September 2002",
    profile_image: StudentImage,
    completed_sessions: 2,
    wallet_balance: 120,
  };

  const dashboardTiles = [
    {
      title: "Book Session",
      description: "Find a tutor and book a new learning session.",
      icon: <FaPlus />,
      className: "create-session-tile",
      action: () => navigate("/student_session_booking"),
    },
    {
      title: "Session History",
      description: "View your previous, upcoming and cancelled sessions.",
      icon: <FaHistory />,
      className: "session-history-tile",
      action: () => navigate("/student_session_history"),
    },
    {
      title: "Learning Resources",
      description: "Explore study materials and useful learning resources.",
      icon: <FaBookOpen />,
      className: "learning-resources-tile",
      action: () => navigate("/curriculum_details"),
    },
    {
      title: "Our Tutors",
      description: "Browse tutors and find the right tutor for you.",
      icon: <FaUsers />,
      className: "tutors-tile",
      action: () => navigate("/tutors"),
    },
    {
      title: "Guidelines & Instructions",
      description: "Learn how sessions and the platform work.",
      icon: <FaClipboardList />,
      className: "guidelines-tile",
      action: () => navigate("/student_instruction"),
    },
    {
      title: "Account Management",
      description: "Manage your profile and account information.",
      icon: <FaUserCog />,
      className: "account-tile",
      action: () => navigate("/student_account"),
    },
  ];

  return (
    <div className="student-dashboard-page">
      <section className="student-dashboard-section">

        {/* ================= STUDENT INFORMATION ================= */}
        <div className="student-info-container">
          <div className="student-image">
            <img
              src={studentData.profile_image}
              alt="Student Profile"
            />
          </div>

          <div className="student-details">
            <h3>Student Information</h3>

            <p>
              <strong>Name:</strong>{" "}
              {studentData.full_name}
            </p>

            <p>
              <strong>Student ID:</strong>{" "}
              {studentData.student_id}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {studentData.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {studentData.phone_number},{" "}
              {studentData.additional_phone_number}
            </p>

            <p>
              <strong>Nationality:</strong>{" "}
              {studentData.nationality}
            </p>

            <p>
              <strong>Curriculum:</strong>{" "}
              {studentData.curriculum}
            </p>

            <p>
              <strong>Date of Birth:</strong>{" "}
              {studentData.dob}
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
                  ${studentData.wallet_balance}
                </h3>
              </div>
            </div>

            <div className="wallet-actions">
              <button
                className="add-wallet-btn"
                onClick={() => navigate("/student_add_money")}
              >
                <FaPlus />
                Add Money
              </button>

              <button
                className="payment-history-btn"
                onClick={() =>
                  navigate("/student_payment_history")
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
              Complete 5 sessions and receive a{" "}
              <strong>10% discount</strong> on your next class!
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
                <p>{tile.description}</p>
              </div>

              <FaLongArrowAltRight className="tile-arrow" />
            </button>
          ))}
        </div>

      </section>
    </div>
  );
};

export default StudentDashboard;