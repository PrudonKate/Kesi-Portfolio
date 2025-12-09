import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import '../styles/Experience.css';

const Experience = () => {
  const [experienceData, setExperienceData] = useState({
    title: 'Work Experience',
    subtitle: 'My professional journey and roles',
    experiences: []
  });

  useEffect(() => {
    loadExperienceData();
  }, []);

  const loadExperienceData = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', 'experience')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading experience data:', error);
        // Use default data
        setExperienceData({
          title: 'Work Experience',
          subtitle: 'My professional journey and roles',
          experiences: [
            {
              company: 'Company Name',
              position: 'Position Title',
              period: '2023 - Present',
              description: 'Description of your role and responsibilities.',
              skills: ['React', 'JavaScript', 'CSS']
            }
          ]
        });
        return;
      }
      
      if (data && data.content) {
        setExperienceData(data.content);
      }
    } catch (error) {
      console.error('Error loading experience data:', error);
    }
  };

  const experiences = experienceData.experiences;

  return (
    <section className="experience-section">
      <div className="experience-container">
        <h1 className="experience-title">{experienceData.title}</h1>
        <p className="experience-subtitle">{experienceData.subtitle}</p>

        <div className="timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{exp.position}</h3>
                <h4>{exp.company}</h4>
                <p className="period">{exp.period}</p>
                <p className="description">{exp.description}</p>
                <div className="skills-tags">
                  {exp.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
