import React from "react";
import { Link } from "react-router-dom";
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
            <li><Link to="/about">About</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right - Socials */}
        <div className="footer-socials">
          <h3>Connect</h3>
          <div className="social-icons" aria-label="Social links">
            {/* GitHub */}
            <a href="https://github.com/PrudonKate" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 8.98h3.96V21H3V8.98Zm7.47 0h3.79v1.64h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.65 4.78 6.09V21H19.9v-5.23c0-1.25-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76V21h-3.96V8.98Z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/prudonkc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-2.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/prudonkc" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.4V12h2.4V9.8c0-2.4 1.4-3.8 3.6-3.8 1 0 2 .18 2 .18v2.2h-1.1c-1.1 0-1.5.68-1.5 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12Z"/></svg>
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
