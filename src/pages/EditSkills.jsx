import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/AdminEdit.css';

const EditSkills = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: 'My Skills',
    description: 'Technologies and tools I work with',
    skills: [
      { name: 'React', logo: 'react-logo-url' },
      { name: 'JavaScript', logo: 'js-logo-url' }
    ],
    capabilities: [
      { icon: '💻', title: 'Web Development', description: 'Building responsive websites' },
      { icon: '🎨', title: 'UI/UX Design', description: 'Creating beautiful interfaces' }
    ]
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/admin/login');
    });
    loadData();
    return () => unsubscribe();
  }, [navigate]);

  const loadData = async () => {
    try {
      const docRef = doc(db, 'content', 'skills');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
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
      await setDoc(doc(db, 'content', 'skills'), formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: 'New Skill', logo: 'logo-url' }]
    });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleCapabilityChange = (index, field, value) => {
    const newCaps = [...formData.capabilities];
    newCaps[index][field] = value;
    setFormData({ ...formData, capabilities: newCaps });
  };

  const addCapability = () => {
    setFormData({
      ...formData,
      capabilities: [...formData.capabilities, { icon: '✨', title: 'New Capability', description: 'Description' }]
    });
  };

  const removeCapability = (index) => {
    const newCaps = formData.capabilities.filter((_, i) => i !== index);
    setFormData({ ...formData, capabilities: newCaps });
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/admin/dashboard')} className="nav-item">← Back to Dashboard</button>
          <button onClick={() => navigate('/admin/edit-hero')} className="nav-item">🏠 Edit Home/Hero</button>
          <button onClick={() => navigate('/admin/edit-about')} className="nav-item">👤 Edit About</button>
          <button onClick={() => navigate('/admin/edit-skills')} className="nav-item active">⚡ Edit Skills</button>
          <button onClick={() => navigate('/admin/edit-projects')} className="nav-item">📁 Edit Projects</button>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="edit-section">
          <h1>Edit Skills Section</h1>
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
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="2"
                required
              />
            </div>

            <div className="cards-section">
              <div className="section-header">
                <h3>Skills</h3>
                <button type="button" onClick={addSkill} className="add-btn">+ Add Skill</button>
              </div>

              {formData.skills.map((skill, index) => (
                <div key={index} className="card-editor">
                  <div className="card-header">
                    <h4>Skill {index + 1}</h4>
                    <button type="button" onClick={() => removeSkill(index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Skill Name</label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Logo URL</label>
                      <input
                        type="text"
                        value={skill.logo}
                        onChange={(e) => handleSkillChange(index, 'logo', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cards-section">
              <div className="section-header">
                <h3>Capabilities</h3>
                <button type="button" onClick={addCapability} className="add-btn">+ Add Capability</button>
              </div>

              {formData.capabilities.map((cap, index) => (
                <div key={index} className="card-editor">
                  <div className="card-header">
                    <h4>Capability {index + 1}</h4>
                    <button type="button" onClick={() => removeCapability(index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Icon (emoji)</label>
                      <input
                        type="text"
                        value={cap.icon}
                        onChange={(e) => handleCapabilityChange(index, 'icon', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={cap.title}
                        onChange={(e) => handleCapabilityChange(index, 'title', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={cap.description}
                      onChange={(e) => handleCapabilityChange(index, 'description', e.target.value)}
                      rows="2"
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

export default EditSkills;
