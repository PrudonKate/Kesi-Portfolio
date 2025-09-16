import React from "react";
import "./AboutMeMain.css";

const AboutMe = () => {
  return (
    <section className="about">
      <h1 className="about-title">ABOUT ME</h1>
      <p className="about-text">
        I’m an aspiring frontend developer passionate about creating clean,
        responsive, and visually appealing websites. I enjoy turning ideas into
        functional, interactive experiences using HTML, CSS, JavaScript, React,
        and CSS frameworks.
      </p>

      <div className="about-cards">
        <div className="about-card">
          <div className="icon">💻</div>
          <h3>Clean &amp; Semantic Code</h3>
          <p>
            Writing well-structured, semantic HTML and React components for
            maintainable codebases.
          </p>
        </div>

        <div className="about-card">
          <div className="icon">🎨</div>
          <h3>Modern UI Styling</h3>
          <p>
            Crafting visually appealing interfaces using responsive design
            principles and modern CSS.
          </p>
        </div>

        <div className="about-card">
          <div className="icon">⚡</div>
          <h3>Interactive Components</h3>
          <p>
            Building dynamic, user-friendly components with React and UI
            libraries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
