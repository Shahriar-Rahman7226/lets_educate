import React from "react";
import { useNavigate } from "react-router-dom";
import Hero_banner from "../../../assets/images/hero_banner.png";
import "./hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <section className="hero">
      <img src={Hero_banner} alt="Hero Banner" className="hero-banner" />

      <div className="hero-overlay">
        {/* Overlay Text */}
        <div className="hero-text">
          <h1>Empowering Education Everywhere</h1>
          <p>Join our platform and start your learning or teaching journey today!</p>
        </div>

        {/* Buttons */}
        <div className="hero-buttons">
          <button onClick={handleSignup} className="hero-btn tutor-button">
            Become a Tutor
          </button>
          <button onClick={handleSignup} className="hero-btn student-button">
            Become a Student
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
