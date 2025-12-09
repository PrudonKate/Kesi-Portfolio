import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import "./Hero.css";
import profilePic from "../../assets/profile.jpg"; 

const TypingHeroText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="hero-title">
      {displayed}
      <span className="typing-cursor" />
    </h1>
  );
};

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "Hi, I'm Kate Carmel Prudon",
    subtitle: "Frontend Developer | Design & Video Enthusiast",
    description: "Designing and developing with creativity at the core.",
    ctaText: "Download CV →",
    ctaLink: "/KATE PRUDON RESUME.pdf",
    profileImage: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', 'hero')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading hero data:', error);
        return;
      }
      
      if (data && data.content) {
        setHeroData(data.content);
      }
    } catch (error) {
      console.error('Error loading hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <p>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <TypingHeroText text={heroData.title} />
          <h2>{heroData.subtitle}</h2>
          <p>{heroData.description}</p>
          <a
            href={heroData.ctaLink}
            className="view-work-link"
            download
            aria-label="Download my resume as PDF"
          >
            {heroData.ctaText}
          </a>
        </div>
        <div className="hero-img">
          <img 
            src={heroData.profileImage || profilePic} 
            alt="Profile" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
