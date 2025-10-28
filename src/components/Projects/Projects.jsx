import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h1 className="projects-title">My Projects</h1>

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
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
            </div>
            <a className="view-project-btn" href="#" aria-label="View Project 1">View Project</a>
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
            <a className="view-project-btn" href="#" aria-label="View Project 2">View Project</a>
          </div>
        </article>

      </div>
    </section>
  );
};

export default Projects;