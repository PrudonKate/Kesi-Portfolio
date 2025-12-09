import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { uploadImage, validateImage } from '../utils/imageUpload';
import '../styles/AdminEdit.css';

const EditSkills = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState({});
  const [formData, setFormData] = useState({
    title: 'My Skills',
    subheader: 'Technologies I Work With',
    description: 'Technologies and tools I work with',
    skills: [
      { name: 'React', logo: 'react-logo-url' },
      { name: 'JavaScript', logo: 'js-logo-url' }
    ],
    subheader2: '',
    description2: '',
    skills2: [],
    capabilitiesTitle: 'What I Can Do',
    capabilitiesDescription: '',
    capabilities: [
      { icon: '💻', title: 'Web Development', description: 'Building responsive websites' },
      { icon: '🎨', title: 'UI/UX Design', description: 'Creating beautiful interfaces' }
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
        .eq('section', 'skills')
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
          section: 'skills',
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

  const handleSkill2Change = (index, field, value) => {
    const newSkills = [...formData.skills2];
    newSkills[index][field] = value;
    setFormData({ ...formData, skills2: newSkills });
  };

  const addSkill2 = () => {
    setFormData({
      ...formData,
      skills2: [...formData.skills2, { name: 'New Skill', logo: 'logo-url' }]
    });
  };

  const removeSkill2 = (index) => {
    const newSkills = formData.skills2.filter((_, i) => i !== index);
    setFormData({ ...formData, skills2: newSkills });
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

  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validateImage(file)) return;

    setUploading({ ...uploading, [index]: true });
    try {
      const imageUrl = await uploadImage(file, 'portfolio-images', 'skills');
      handleSkillChange(index, 'logo', imageUrl);
      alert('Skill logo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading({ ...uploading, [index]: false });
    }
  };

  const handleImage2Upload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validateImage(file)) return;

    setUploading({ ...uploading, [`skill2-${index}`]: true });
    try {
      const imageUrl = await uploadImage(file, 'portfolio-images', 'skills');
      handleSkill2Change(index, 'logo', imageUrl);
      alert('Skill logo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading({ ...uploading, [`skill2-${index}`]: false });
    }
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
          <button onClick={() => navigate('/admin/edit-experience')} className="nav-item">💼 Edit Experience</button>
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
              <label>Subheader</label>
              <input
                type="text"
                value={formData.subheader || ''}
                onChange={(e) => setFormData({ ...formData, subheader: e.target.value })}
                placeholder="e.g., Technologies I Work With"
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
                    <label>Logo Image</label>
                    <div className="image-upload-section">
                      {skill.logo && (
                        <div className="image-preview">
                          <img src={skill.logo} alt={skill.name} style={{ width: '100px', height: '100px', objectFit: 'contain', border: '3px solid #ffffff', borderRadius: '12px', padding: '10px', backgroundColor: '#f8f9fa' }} />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        disabled={uploading[index]}
                        className="file-input"
                      />
                      {uploading[index] && <p className="upload-status">Uploading...</p>}
                      <small>Upload a skill logo (max 5MB, JPEG/PNG/GIF/WebP/SVG)</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e0e0e0' }} />

            <h2 style={{ color: '#1a3b2c', marginBottom: '1.5rem' }}>Second Skills Section</h2>

            <div className="form-group">
              <label>Subheader 2</label>
              <input
                type="text"
                value={formData.subheader2 || ''}
                onChange={(e) => setFormData({ ...formData, subheader2: e.target.value })}
                placeholder="e.g., Additional Skills"
              />
            </div>

            <div className="form-group">
              <label>Description 2</label>
              <textarea
                value={formData.description2 || ''}
                onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
                rows="2"
                placeholder="Description for second skills section"
              />
            </div>

            <div className="cards-section">
              <div className="section-header">
                <h3>Skills 2</h3>
                <button type="button" onClick={addSkill2} className="add-btn">+ Add Skill</button>
              </div>

              {formData.skills2 && formData.skills2.map((skill, index) => (
                <div key={index} className="card-editor">
                  <div className="card-header">
                    <h4>Skill {index + 1}</h4>
                    <button type="button" onClick={() => removeSkill2(index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-group">
                    <label>Skill Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleSkill2Change(index, 'name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Logo Image</label>
                    <div className="image-upload-section">
                      {skill.logo && (
                        <div className="image-preview">
                          <img src={skill.logo} alt={skill.name} style={{ width: '100px', height: '100px', objectFit: 'contain', border: '3px solid #ffffff', borderRadius: '12px', padding: '10px', backgroundColor: '#f8f9fa' }} />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImage2Upload(index, e)}
                        disabled={uploading[`skill2-${index}`]}
                        className="file-input"
                      />
                      {uploading[`skill2-${index}`] && <p className="upload-status">Uploading...</p>}
                      <small>Upload a skill logo (max 5MB, JPEG/PNG/GIF/WebP/SVG)</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e0e0e0' }} />

            <h2 style={{ color: '#1a3b2c', marginBottom: '1.5rem' }}>Capabilities Section</h2>

            <div className="form-group">
              <label>Capabilities Title</label>
              <input
                type="text"
                value={formData.capabilitiesTitle || 'What I Can Do'}
                onChange={(e) => setFormData({ ...formData, capabilitiesTitle: e.target.value })}
                placeholder="e.g., What I Can Do"
              />
            </div>

            <div className="form-group">
              <label>Capabilities Description</label>
              <textarea
                value={formData.capabilitiesDescription || ''}
                onChange={(e) => setFormData({ ...formData, capabilitiesDescription: e.target.value })}
                rows="2"
                placeholder="Optional description for capabilities section"
              />
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
