import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="Home">
        <img src={logoImg} alt="Kesi logo" className="logo-img" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/skills">Skills</Link></li>
        <li><Link to="/projects">Projects</Link></li>
      </ul>
      <Link to="/contact" className="contact-btn">Contact Me</Link>
    </nav>
  );
};

export default Navbar;