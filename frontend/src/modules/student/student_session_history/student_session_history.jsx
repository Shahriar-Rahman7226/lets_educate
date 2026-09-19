import React from "react";
import "./student_session_history.css";
import { FaBookOpen, FaBoxOpen, FaArrowRight } from "react-icons/fa";

const sessions = [
  {
    id: "SES-2026-001",
    type: "Session Tutoring",
    status: "Ongoing",
  },
  {
    id: "SES-2026-002",
    type: "Package Tutoring",
    status: "Appointed",
  },
  {
    id: "SES-2026-003",
    type: "Session Tutoring",
    status: "Completed",
  },
];

const TutoringSessions = () => {
  const handleSessionClick = (session) => {
    console.log("Selected session:", session);
  };

  return (
    <section className="tutoring-sessions-section">
      <div className="tutoring-sessions-header">
        <h2>My Tutoring Sessions</h2>
        <p>View and manage your tutoring sessions</p>
      </div>

      <div className="tutoring-sessions-list">
        {sessions.map((session) => (
          <button
            className="tutoring-session-tile"
            key={session.id}
            onClick={() => handleSessionClick(session)}
          >
            <div className="session-tile-shine"></div>

            <div className="session-tile-icon">
              {session.type === "Package Tutoring" ? (
                <FaBoxOpen />
              ) : (
                <FaBookOpen />
              )}
            </div>

            <div className="session-tile-content">
              <span className="session-id-label">SESSION ID</span>

              <h3>{session.id}</h3>

              <div className="session-tile-details">
                <div className="session-detail">
                  <span className="detail-label">Tutoring Type</span>
                  <span className="detail-value">{session.type}</span>
                </div>

                <div className="session-detail">
                  <span className="detail-label">Status</span>

                  <span
                    className={`session-status ${session.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {session.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="session-tile-arrow">
              <FaArrowRight />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TutoringSessions;
