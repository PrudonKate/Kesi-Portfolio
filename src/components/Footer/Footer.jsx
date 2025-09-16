import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <h2 className="footer-name">Kate Carmel Prudon</h2>
          <p className="footer-role">
           Frontend Developer and Design & Video Enthusiast, passionate about crafting clean, responsive, and modern experiences with creativity at the core.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </div>

        {/* Right - Socials */}
        <div className="footer-socials">
          <h3>Connect</h3>
          <div className="social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:example@email.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Kate Carmel Prudon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
