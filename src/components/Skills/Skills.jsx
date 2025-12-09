import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../config/supabase";
import "./Skills.css";

const Skills = () => {


  const [skillsData, setSkillsData] = useState({
    title: 'My Tech Stack',
    subheader: '',
    description: '',
    skills: [],
    capabilities: []
  });

  useEffect(() => {
    loadSkillsData();
  }, []);

  const loadSkillsData = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', 'skills')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading skills data:', error);
        return;
      }
      
      if (data && data.content) {
        setSkillsData(data.content);
      }
    } catch (error) {
      console.error('Error loading skills data:', error);
    }
  };



  const logos = skillsData.skills.map(skill => ({
    src: skill.logo,
    label: skill.name
  }));

  const logos2 = skillsData.skills2 ? skillsData.skills2.map(skill => ({
    src: skill.logo,
    label: skill.name
  })) : [];

  return (
      <section className="skills-section" id="skills">
        <h1 className="skills-title">{skillsData.title}</h1>
        {skillsData.subheader && <h2 className="skills-subheader">{skillsData.subheader}</h2>}
        {skillsData.description && <p className="skills-description">{skillsData.description}</p>}
        
        {/* Auto-scrolling logos */}
        {logos.length > 0 && (
          <div className="tech-scroll" aria-label="Scrollable list of technology logos">
            <div className="tech-track">
              {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, i) => (
                <div className="tech-item" key={`${logo.label}-${i}`}>
                  <div className="tech-icon">
                    <img className="tech-logo" src={logo.src} alt={logo.label} />
                  </div>
                  <span className="tech-label">{logo.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Second Skills Section */}
        {(skillsData.subheader2 || skillsData.description2 || (skillsData.skills2 && skillsData.skills2.length > 0)) && (
          <div className="skills-section-2">
            {skillsData.subheader2 && <h2 className="skills-subheader">{skillsData.subheader2}</h2>}
            {skillsData.description2 && <p className="skills-description">{skillsData.description2}</p>}
            
            {logos2.length > 0 && (
              <div className="tech-scroll" aria-label="Scrollable list of technology logos">
                <div className="tech-track">
                  {[...logos2, ...logos2, ...logos2, ...logos2, ...logos2, ...logos2, ...logos2, ...logos2].map((logo, i) => (
                    <div className="tech-item" key={`${logo.label}-2-${i}`}>
                      <div className="tech-icon">
                        <img className="tech-logo" src={logo.src} alt={logo.label} />
                      </div>
                      <span className="tech-label">{logo.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {skillsData.capabilities && skillsData.capabilities.length > 0 && (
          <section className="capabilities">
            <h2 className="cap-title">{skillsData.capabilitiesTitle || 'What I Can Do'}</h2>
            {skillsData.capabilitiesDescription && (
              <p className="cap-desc">{skillsData.capabilitiesDescription}</p>
            )}
            <div className="cap-grid">
              {skillsData.capabilities.map((cap, index) => (
                <div key={index} className="cap-card">
                  <div className="cap-icon">{cap.icon}</div>
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
  );
};

export default Skills;
