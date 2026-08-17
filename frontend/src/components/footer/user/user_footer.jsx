import React, { useState } from "react";
import "./user_footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const AdminFooter = () => {
  const [review, setReview] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!review.trim()) {
      return;
    }

    // Review submission logic can be added here
    setReview("");
  };

  return (
    <footer className="admin_footer">

      {/* ===== MAIN SECTION ===== */}
      <div className="admin_footer_container">

        {/* Left Column */}
        <div className="admin_footer_left">

          {/* Contact Support */}
          <div className="admin_footer_contact">
            <h4>Contact Support</h4>

            <p>
              Email:{" "}
              <a href="mailto:adminsupport@yourcompany.com">
                adminsupport@yourcompany.com
              </a>
            </p>

            <p>Phone: +880 123 456 789</p>
          </div>

          {/* Admin Resources */}
          <div className="admin_footer_links">
            <h4>Admin Resources</h4>

            <ul>
              <li>
                <a href="/about">About Let's Educate</a>
              </li>

              <li>
                <a href="/admin/help">Help Center</a>
              </li>

              <li>
                <a href="/admin/terms">Terms of Use</a>
              </li>

              <li>
                <a href="/admin/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column */}
        <div className="admin_footer_right">

          {/* Write a Review */}
          <div className="admin_footer_review">

            <h4>Write a Review</h4>

            <form onSubmit={handleReviewSubmit}>
              <div className="admin_footer_review_input">
                <input
                  type="text"
                  placeholder="Share your experience..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />

                <button type="submit">
                  Submit
                </button>
              </div>
            </form>

          </div>

          {/* Social Links */}
          <div className="admin_footer_social">

            <h4 className="admin_footer_social_heading">
              Connect With Us
            </h4>

            <div className="admin_footer_socials">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* ===== COPYRIGHT ===== */}
      <div className="admin_footer_bottom">
        <p>
          &copy; {new Date().getFullYear()} Let's Educate. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default AdminFooter;