import React, { useState, useEffect } from "react";
import "./Hero.css";
import profilePic from "../../assets/profile.jpg"; 

const heroText = "Hi, I’m Kate Carmel Prudon";

const TypingHeroText = () => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(heroText.slice(0, i + 1));
      i++;
      if (i === heroText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="hero-title">
      {displayed}
      <span className="typing-cursor" />
    </h1>
  );
};

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <TypingHeroText />
          <h2>Frontend Developer <span className="highlight">| Design & Video Enthusiast</span></h2>
          <p>Designing and developing with creativity at the core.</p>
          <a href="#work" className="view-work-link">View My Work→</a>
        </div>
        <div className="hero-img">
          <img src={profilePic} alt="KC Prudon" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
