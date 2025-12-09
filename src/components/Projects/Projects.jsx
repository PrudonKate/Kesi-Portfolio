import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import "./Projects.css";

const Projects = () => {
  const [projectsData, setProjectsData] = useState({
    title: 'My Projects',
    projects: []
  });
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'System Development', 'Front End', 'Graphic Design', 'Virtual Assistant', 'Video Editor'];

  useEffect(() => {
    loadProjectsData();
  }, []);

  const loadProjectsData = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', 'projects')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading projects data:', error);
        // Use default data
        setProjectsData({
          title: 'My Projects',
          projects: [
            {
              name: 'Project Name',
              description: 'Project description',
              image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&q=60',
              tags: ['HTML', 'CSS'],
              link: '#'
            }
          ]
        });
        return;
      }
      
      if (data && data.content) {
        setProjectsData(data.content);
      }
    } catch (error) {
      console.error('Error loading projects data:', error);
    }
  };

  const filteredProjects = activeCategory === 'All' 
    ? projectsData.projects 
    : projectsData.projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="projects-section">
      <h1 className="projects-title">{projectsData.title}</h1>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#2D6A4F', fontSize: '1.1rem', padding: '2rem' }}>
            No projects found in this category. Please add projects in the admin panel.
          </p>
        ) : (
          filteredProjects.map((project, index) => (
          <article key={index} className="project-card">
            <div className="project-thumb" aria-hidden="true">
              <img src={project.image} alt={`${project.name} preview`} />
            </div>
            <div className="project-body">
              <h2 className="project-name">{project.name}</h2>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
              <a
                className="view-project-btn"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.name}`}
              >
                View Project
              </a>
            </div>
          </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
