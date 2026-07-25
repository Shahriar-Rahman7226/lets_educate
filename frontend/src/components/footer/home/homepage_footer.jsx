import React, { useState } from "react";
import "./homepage_footer.css";
import Logo from "../../../assets/logo/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      alert(`Thanks for reaching out!\nYour question: "${question}"`);
      setQuestion("");
    }
  };

  return (
    <footer className="footer">
      {/* ===== MAIN SECTION ===== */}
      <div className="footer-container">
        {/* Left Column */}
        <div className="footer-left">
          <div className="footer-logo-section">
            <img src={Logo} alt="Lets Educate Logo" className="footer-logo" />
            {/* <p className="footer-tagline">
              Empowering education with personalized learning and academic excellence.
            </p> */}
          </div>

          <div className="footer-info">
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Email: <a href="mailto:support@letseducate.com">support@letseducate.com</a></p>
              <p>Phone (Australia): +61 123 456 789</p>
              <p>Phone (USA): +1 987 654 3210</p>
              <p>Phone (Bangladesh): +880 176 543 2109</p>
            </div>

            <div className="footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-of-service">Terms of Service</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/about">Resources</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="footer-right">
          <h4 className="question-heading">Ask a Question</h4>
          <form onSubmit={handleSubmit} className="question-form">
            <textarea
              placeholder="Write your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              required
            />
            <button type="submit" className="question-btn">Submit Question</button>
          </form>
        </div>
      </div>

      {/* ===== SOCIAL SECTION ===== */}
      <div className="footer-social-section">
        <h4>Connect With Us</h4>
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          <a href="https://x.com" target="_blank" rel="noreferrer"><FaXTwitter /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
        </div>
      </div>

      {/* ===== COPYRIGHT ===== */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lets Educate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
