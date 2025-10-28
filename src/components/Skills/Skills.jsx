import React from "react";
import "./Skills.css";

const Skills = () => {
  return (
      <section className="skills-section" id="skills">
        <h1 className="skills-title">My Tech Stack</h1>
        <p className="skills-description">
          I specialize in front-end web development, creating responsive and visually engaging
          websites using HTML, CSS, Tailwind CSS, JavaScript, Python, and React. With Vite for fast
          builds and Git for version control, I deliver everything from static sites to single-page
          applications focused on performance, accessibility, and great user experience.
        </p>

        <div className="tech-grid">
          <div className="tech-item">
            <div className="tech-icon">
              <img
                className="tech-logo"
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
                alt="HTML"
              />
            </div>
            <span className="tech-label">HTML</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon">
              <img
                className="tech-logo"
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
                alt="CSS"
              />
            </div>
            <span className="tech-label">CSS</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon">
              <img
                className="tech-logo"
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                alt="JavaScript"
              />
            </div>
            <span className="tech-label">JavaScript</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon">
              <img
                className="tech-logo"
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                alt="React"
              />
            </div>
            <span className="tech-label">React</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon">
              <img
                className="tech-logo"
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg"
                alt="Tailwind CSS"
              />
            </div>
            <span className="tech-label">Tailwind CSS</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon">
              <img
                className="tech-logo"
                src="https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg"
                alt="Vite"
              />
            </div>
            <span className="tech-label">Vite</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon">
              <img
                className="tech-logo"
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg"
                alt="Git"
              />
            </div>
            <span className="tech-label">Git</span>
          </div>
          <div className="tech-item">
            <div className="tech-icon">
              <img
                className="tech-logo"
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
                alt="Python"
              />
            </div>
            <span className="tech-label">Python</span>
          </div>
        </div>
        

        {/* Creative Skills section (between Tech Stack and What I Can Do) */}
        <section className="creative">
          <h2 className="cap-title">Creative Skills</h2>
          <p className="cap-desc">
            I also create compelling visuals and engaging videos, ranging from eye-catching social media graphics and professional logos to polished video reels and dynamic motion graphics. My work blends creativity and technical skill to help brands communicate their story effectively across digital platforms.
          </p>
        
        </section>

        <section className="capabilities">
          <h2 className="cap-title">What I Can Do</h2>
          <p className="cap-desc">
            I create responsive, visually appealing, and user-friendly websites that combine great
            design with smooth functionality — turning ideas into fast, engaging digital products.
          </p>
          <div className="cap-grid">
            <div className="cap-card">
              <div className="cap-icon">🧾</div>
              <h3>Static Website Development</h3>
              <p>Simple, fast-loading sites perfect for portfolios, landing pages, or profiles.</p>
            </div>
            <div className="cap-card">
              <div className="cap-icon">📱</div>
              <h3>Single-Page Applications</h3>
              <p>Modern, app-like experiences built for speed and smooth navigation.</p>
            </div>
            <div className="cap-card">
              <div className="cap-icon">↗️</div>
              <h3>Website Redesign & Optimization</h3>
              <p>Revamping existing sites for better performance, visuals, and usability.</p>
            </div>
            <div className="cap-card">
              <div className="cap-icon">👩🏻‍💻</div>
              <h3>Virtual Assistant</h3>
              <p>Providing virtual support and automation to enhance business operations.</p>
            </div>
            <div className="cap-card">
              <div className="cap-icon">🎨</div>
              <h3>Graphic Design & Brand Identity</h3>
              <p>Creating unique, memorable designs that reflect your brand's essence.</p>
            </div>
            <div className="cap-card">
              <div className="cap-icon">🎥</div>
              <h3>Video Editing & Production</h3>
              <p>From social media content to feature films, I create compelling visual stories.</p>
            </div>
          </div>
        </section>
      </section>
  );
};

export default Skills;