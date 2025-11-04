import React from "react";
import "./Projects.css";
import glowssipImg from "../../assets/Glowssip.png";

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h1 className="projects-title">My Projects <span className="line">(Web Development/Mobile Development)</span></h1>

      <div className="projects-grid">
        <article className="project-card">
          <div className="project-thumb" aria-hidden="true">
             <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&q=60" alt="Project 2 preview" />
          </div>
          <div className="project-body">
            <h2 className="project-name">IN PROGRESS</h2>
            <p className="project-desc">
              AAAAAAA
            </p>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
            </div>
            <a
              className="view-project-btn"
              href="https://drive.google.com/drive/folders/YOUR_WEB_PROJECT_1_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Project 1 on Google Drive"
            >
              View Project
            </a>
          </div>
        </article>

        <article className="project-card">
          <div className="project-thumb" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&q=60" alt="Project 2 preview" />
          </div>
          <div className="project-body">
            <h2 className="project-name">IN PROGRESS</h2>
            <p className="project-desc">
              AAAAAAAA
            </p>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
            </div>
            <a
              className="view-project-btn"
              href="https://drive.google.com/drive/folders/YOUR_WEB_PROJECT_2_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Project 2 on Google Drive"
            >
              View Project
            </a>
          </div>
        </article>
      </div>

      <h1 className="projects-title">My Projects <span className="line">(Graphic Design)</span></h1>

      <div className="projects-grid">
        <article className="project-card">
          <div className="project-thumb" aria-hidden="true">
            <img src={glowssipImg} alt="Glowssip project preview" />
          </div>
          <div className="project-body">
            <h2 className="project-name">Glowssips Essentials</h2>
            <p className="project-desc">
              I design and recreate visuals for Glowssip to attract customers and promote skincare products effectively.            </p>
            <div className="project-tags">
              <span className="tag">Canva</span>
            </div>
            <a
              className="view-project-btn"
              href="https://www.canva.com/design/DAG3OVZc-sw/iBpBLM1_-6rQenOZ-PVazw/edit?utm_content=DAG3OVZc-sw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Graphic Project 1 on Google Drive"
            >
              View Project
            </a>
          </div>
        </article>

        <article className="project-card">
          <div className="project-thumb" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&q=60" alt="Project 2 preview" />
          </div>
          <div className="project-body">
            <h2 className="project-name">IN PROGRESS</h2>
            <p className="project-desc">
              AAAAAAAA
            </p>
            <div className="project-tags">
              <span className="tag">Photoshop</span>
            </div>
            <a
              className="view-project-btn"
              href="https://drive.google.com/drive/folders/YOUR_GRAPHIC_PROJECT_2_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Graphic Project 2 on Google Drive"
            >
              View Project
            </a>
          </div>
        </article>
      </div>

      <h1 className="projects-title">My Projects <span className="line">(Video Editing)</span></h1>
      
      <div className="projects-grid">
        <article className="project-card">
          <div className="project-thumb" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=60" alt="Project 1 preview" />
          </div>
          <div className="project-body">
            <h2 className="project-name">IN PROGRESS</h2>
            <p className="project-desc">
              AAAAAAA
            </p>
            <div className="project-tags">
              <span className="tag">Capcut</span>
              <span className="tag">Canva</span>
            </div>
            <a
              className="view-project-btn"
              href="https://drive.google.com/drive/folders/YOUR_VIDEO_PROJECT_1_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Video Project 1 on Google Drive"
            >
              View Project
            </a>
          </div>
        </article>

        <article className="project-card">
          <div className="project-thumb" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&q=60" alt="Project 2 preview" />
          </div>
          <div className="project-body">
            <h2 className="project-name">IN PROGRESS</h2>
            <p className="project-desc">
              AAAAAAAA
            </p>
            <div className="project-tags">
              <span className="tag">Capcut</span>
            </div>
            <a
              className="view-project-btn"
              href="https://drive.google.com/drive/folders/YOUR_VIDEO_PROJECT_2_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Video Project 2 on Google Drive"
            >
              View Project
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Projects;