import React, { useState, useEffect } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./homepage_navbar.css";
import Logo from "../../../assets/logo/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-logo">
          <img src={Logo} alt="Central Mart Logo" />
        </div>

        <div className="navbar-center">
          {/* Curriculum Dropdown */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setShowCurriculum(true)}
            onMouseLeave={() => setShowCurriculum(false)}
          >
            <span className="nav-link dropdown-trigger">
              Curriculum 
            </span>

            <div className={`dropdown-menu ${showCurriculum ? "show" : ""}`}>
              <a href="/curriculum_level_details" className="dropdown-item">Class 6–8</a>
              <a href="/curriculum_level_details" className="dropdown-item">SSC</a>
              <a href="/curriculum_level_details" className="dropdown-item">HSC</a>
              <a href="/curriculum_level_details" className="dropdown-item">Admission</a>
              <a href="/curriculum_level_details" className="dropdown-item">O / A Levels</a>
            </div>
          </div>

          <a href="#" className="nav-link">Tutors</a>
          <a href="#" className="nav-link">FAQ</a>
          <a href="#" className="nav-link">About</a>
        </div>

        <div className="navbar-right">
          {/* <FaBell className="navbar-icon" title="Notifications" /> */}
          <button onClick={handleSignIn} className="homepage-signin-btn">
            Sign In
          </button>
        </div>
      </nav>

      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;
