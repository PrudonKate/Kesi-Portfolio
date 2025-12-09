import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import "./AboutMe.css";

const AboutMe = () => {
  const [aboutData, setAboutData] = useState({
    bio: 'Loading...',
    education: [],
    certifications: [],
    goals: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', 'about')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading about data:', error);
        // Use default data if no data in database
        setAboutData({
          bio: `Hi! I'm Kate Carmel Prudon, an aspiring frontend developer passionate about crafting 
            beautiful and functional websites and applications. I love transforming ideas into 
            functional designs using HTML, CSS, JavaScript, React, and Tailwind CSS.`,
          education: [
            { icon: '🎓', title: 'Bachelor Degree', description: 'Computer Science - University Name' }
          ],
          certifications: [
            { icon: '📜', title: 'Web Development', description: 'Certification details here' }
          ],
          goals: [
            { icon: '🎯', title: 'Career Goal', description: 'Your career goals and aspirations' }
          ]
        });
        return;
      }
      
      if (data && data.content) {
        setAboutData(data.content);
      }
    } catch (error) {
      console.error('Error loading about data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="about-me" id="about">
      <h1 className="about-me-title">ABOUT ME</h1>
      
      <div className="about-me-description">
        <p>{aboutData.bio}</p>
      </div>

      {/* Education Section */}
      <div className="about-section">
        <h2 className="section-title">Education</h2>
        <div className="about-cards">
          {aboutData.education && aboutData.education.map((item, index) => (
            <div key={index} className="about-card">
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="about-section">
        <h2 className="section-title">Certifications</h2>
        <div className="about-cards">
          {aboutData.certifications && aboutData.certifications.map((item, index) => (
            <div key={index} className="about-card">
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Section */}
      <div className="about-section">
        <h2 className="section-title">Goals</h2>
        <div className="about-cards">
          {aboutData.goals && aboutData.goals.map((item, index) => (
            <div key={index} className="about-card">
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
