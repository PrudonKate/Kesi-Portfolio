import React, { useEffect, useRef, useState } from "react";
import "./Skills.css";

const Skills = () => {
  const scrollRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(0);

  // Auto-scroll loop for infinite movement
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = -1.1; // pixels per frame (clear motion)
    const step = () => {
      if (!pausedRef.current && !dragging) {
        el.scrollLeft += speed;
        const max = el.scrollWidth / 2; // width of one track (duplicated once)
        if (el.scrollLeft >= max) {
          el.scrollLeft -= max; // wrap forward seamlessly
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += max; // wrap backward seamlessly
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dragging]);

  const onMouseEnter = () => { pausedRef.current = true; };
  const onMouseLeave = () => { pausedRef.current = false; };

  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    setDragging(true);
    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const el = scrollRef.current;
    if (!el) return;
    const delta = e.clientX - startXRef.current;
    el.scrollLeft = startScrollLeftRef.current - delta;
    const max = el.scrollWidth / 2;
    if (el.scrollLeft >= max) {
      el.scrollLeft -= max;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += max;
    }
  };
  const endDrag = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    setDragging(false);
    el.releasePointerCapture?.(e.pointerId);
  };

  const logos = [
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", label: "HTML" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", label: "CSS" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", label: "JavaScript" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", label: "React" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind CSS" },
    { src: "https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg", label: "Vite" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", label: "Git" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", label: "Python" },
  ];

  return (
      <section className="skills-section" id="skills">
        <h1 className="skills-title">My Tech Stack</h1>
        <p className="skills-description">
          I specialize in front-end web development, creating responsive and visually engaging
          websites using HTML, CSS, Tailwind CSS, JavaScript, Python, and React. With Vite for fast
          builds and Git for version control, I deliver everything from static sites to single-page
          applications focused on performance, accessibility, and great user experience.
        </p>
        {/* Auto-scrolling, hover-paused, draggable logos row */}
        <div
          className={`tech-scroll ${dragging ? "dragging" : ""}`}
          ref={scrollRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          tabIndex={0}
          aria-label="Scrollable list of technology logos"
        >
          <div className="tech-track">
            {[...logos, ...logos].map((logo, i) => (
              <div className="tech-item" key={`${logo.label}-${i}`}>
                <div className="tech-icon">
                  <img className="tech-logo" src={logo.src} alt={logo.label} />
                </div>
                <span className="tech-label">{logo.label}</span>
              </div>
            ))}
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