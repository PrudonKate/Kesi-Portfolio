import React from "react";
import "./AboutMe.css";
import profilePic from "../../assets/profile.jpg";

const AboutMe = () => {
  return (
    <section className="about-me" id="about">
      <h1 className="about-me-title">About Me</h1>
      
      <div className="about-me-content">
        <div className="profile-image">
          <img src={profilePic} alt="Kate Carmel Prudon" />
        </div>
        
        <div className="about-me-description">
          <p>
            Hi! I'm Kate Carmel Prudon, an aspiring frontend developer passionate about crafting 
            beautiful and functional websites and applications. I love transforming ideas into 
            functional designs using HTML, CSS, JavaScript, React, and Tailwind CSS. My goal is to 
            create experiences that are not only visually appealing but also intuitive to use.
          </p>
          
          <p>
            I'm constantly learning and exploring new tools and frameworks to improve my skills, 
            always looking to grow and evolve — whether that means mastering 
            new technologies or refining my design sensibilities. I believe in creating work that's 
            not only functional but also delightful to use.
          </p>
        </div>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <div className="icon">🧑‍💻</div>
          <h3>Clean & Semantic Code</h3>
          <p>
            Writing well-structured, semantic HTML and React components for
            maintainable codebases.
          </p>
        </div>

        <div className="about-card">
          <div className="icon">🖌️</div>
          <h3>Modern UI Styling</h3>
          <p>
            Crafting visually appealing interfaces using responsive design
            principles and modern CSS.
          </p>
        </div>

        <div className="about-card">
          <div className="icon">⚙️</div>
          <h3>Interactive Components</h3>
          <p>
            Building dynamic, user-friendly components with React and UI
            libraries.
          </p>
        </div>

        <div className="about-card">
          <div className="icon">🚀</div>
          <h3>Performance & Accessibility</h3>
          <p>
            Optimizing experiences for speed and inclusivity across devices and browsers.
          </p>
        </div>

        <div className="about-card">
          <div className="icon">🤝</div>
          <h3>Collaboration</h3>
          <p>
            Partnering with designers and developers to ship polished features quickly.
          </p>
        </div>

        <div className="about-card">
          <div className="icon">📚</div>
          <h3>Continuous Learning</h3>
          <p>
            Staying current with tools and best practices to level up projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;