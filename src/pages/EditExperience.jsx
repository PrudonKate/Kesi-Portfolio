import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import '../styles/AdminEdit.css';

const EditExperience = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/admin/login');
  };

  const loadData = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', 'experience')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setFormData({ ...formData, ...data.content });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('content')
        .upsert({
          section: 'experience',
          content: formData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'section'
        });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes');
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index][field] = value;
    setFormData({ ...formData, experiences: newExperiences });
  };

  const handleSkillsChange = (index, value) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index].skills = value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, experiences: newExperiences });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, {
        company: 'New Company',
        position: 'Position',
        period: '2024 - Present',
        description: 'Description',
        skills: ['Skill1']
      }]
    });
  };

  const removeExperience = (index) => {
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExperiences });
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Portfolio</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/admin/dashboard')} className="nav-item">
            ← Back to Dashboard
          </button>
          <button onClick={() => navigate('/admin/edit-hero')} className="nav-item">
            🏠 Edit Home/Hero
          </button>
          <button onClick={() => navigate('/admin/edit-about')} className="nav-item">
            👤 Edit About
          </button>
          <button onClick={() => navigate('/admin/edit-skills')} className="nav-item">
            ⚡ Edit Skills
          </button>
          <button onClick={() => navigate('/admin/edit-experience')} className="nav-item active">
            💼 Edit Experience
          </button>
          <button onClick={() => navigate('/admin/edit-projects')} className="nav-item">
            📁 Edit Projects
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="edit-section">
          <h1>Edit Experience Section</h1>
          {success && <div className="success-message">✓ Changes saved successfully!</div>}
          
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label>Section Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                required
              />
            </div>

            <div className="cards-section">
              <div className="section-header">
                <h3>Work Experience</h3>
                <button type="button" onClick={addExperience} className="add-btn">+ Add Experience</button>
              </div>

              {formData.experiences.map((exp, index) => (
                <div key={index} className="card-editor">
                  <div className="card-header">
                    <h4>Experience {index + 1}</h4>
                    <button type="button" onClick={() => removeExperience(index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Position/Title</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Period (e.g., 2023 - Present)</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                      placeholder="2023 - Present"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Skills/Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={exp.skills.join(', ')}
                      onChange={(e) => handleSkillsChange(index, e.target.value)}
                      placeholder="React, JavaScript, CSS"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading} className="save-btn">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditExperience;
