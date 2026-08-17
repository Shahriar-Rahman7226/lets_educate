import React from "react";
import "./user_navbar.css";
import logo from "../../../assets/logo/logo.png";
import { FaBell } from "react-icons/fa";
import { Link, useLocation , useNavigate} from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamically decide home link based on current role path
  let homeLink = "/"; // default fallback

  if (location.pathname.startsWith("/admin")) {
    homeLink = "/admin";
  } else if (location.pathname.startsWith("/tutor")) {
    homeLink = "/tutor";
  } else if (location.pathname.startsWith("/student")) {
    homeLink = "/student";
  }

  return (
    <>
      <nav className="admin_navbar">
        <div className="admin_navbar_left">
          <Link to={homeLink}>
            <img src={logo} alt="Logo" className="admin_navbar_logo" />
          </Link>
        </div>

        <div className="admin_navbar_center">
          <span className="admin_welcome_text">Welcome Shahriar!</span>
        </div>

        <div className="admin_navbar_right">
          <FaBell className="admin_navbar_icon" title="Notifications" />
          <button
            className="admin_signin_btn"
            onClick={() => navigate("/signin")}
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div className="admin_navbar_spacer"></div>
    </>
  );
};

export default AdminNavbar;
