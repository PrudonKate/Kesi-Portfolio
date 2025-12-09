import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import '../styles/AdminEdit.css';

const EditAbout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    bio: 'Your bio text here...',
    education: [
      { icon: '🎓', title: 'Education Title', description: 'Your education details' }
    ],
    certifications: [
      { icon: '📜', title: 'Certification Title', description: 'Your certification details' }
    ],
    goals: [
      { icon: '🎯', title: 'Goal Title', description: 'Your goals' }
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
        .eq('section', 'about')
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
          section: 'about',
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

  const handleItemChange = (section, index, field, value) => {
    const newItems = [...formData[section]];
    newItems[index][field] = value;
    setFormData({ ...formData, [section]: newItems });
  };

  const addItem = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], { icon: '✨', title: 'New Item', description: 'Description' }]
    });
  };

  const removeItem = (section, index) => {
    const newItems = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: newItems });
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/admin/dashboard')} className="nav-item">
            ← Back to Dashboard
          </button>
          <button onClick={() => navigate('/admin/edit-hero')} className="nav-item">
            🏠 Edit Home/Hero
          </button>
          <button onClick={() => navigate('/admin/edit-about')} className="nav-item active">
            👤 Edit About
          </button>
          <button onClick={() => navigate('/admin/edit-skills')} className="nav-item">
            ⚡ Edit Skills
          </button>
          <button onClick={() => navigate('/admin/edit-experience')} className="nav-item">
            💼 Edit Experience
          </button>
          <button onClick={() => navigate('/admin/edit-projects')} className="nav-item">
            📁 Edit Projects
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="edit-section">
          <h1>Edit About Section</h1>
          {success && <div className="success-message">✓ Changes saved successfully!</div>}
          
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label>Bio / About Text</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows="6"
                required
              />
            </div>

            {/* Education Section */}
            <div className="cards-section">
              <div className="section-header">
                <h3>Education</h3>
                <button type="button" onClick={() => addItem('education')} className="add-btn">+ Add Education</button>
              </div>

              {formData.education.map((item, index) => (
                <div key={index} className="card-editor">
                  <div className="card-header">
                    <h4>Education {index + 1}</h4>
                    <button type="button" onClick={() => removeItem('education', index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Icon (emoji)</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleItemChange('education', index, 'icon', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange('education', index, 'title', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange('education', index, 'description', e.target.value)}
                      rows="2"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications Section */}
            <div className="cards-section">
              <div className="section-header">
                <h3>Certifications</h3>
                <button type="button" onClick={() => addItem('certifications')} className="add-btn">+ Add Certification</button>
              </div>

              {formData.certifications.map((item, index) => (
                <div key={index} className="card-editor">
                  <div className="card-header">
                    <h4>Certification {index + 1}</h4>
                    <button type="button" onClick={() => removeItem('certifications', index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Icon (emoji)</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleItemChange('certifications', index, 'icon', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange('certifications', index, 'title', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange('certifications', index, 'description', e.target.value)}
                      rows="2"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Goals Section */}
            <div className="cards-section">
              <div className="section-header">
                <h3>Goals</h3>
                <button type="button" onClick={() => addItem('goals')} className="add-btn">+ Add Goal</button>
              </div>

              {formData.goals.map((item, index) => (
                <div key={index} className="card-editor">
                  <div className="card-header">
                    <h4>Goal {index + 1}</h4>
                    <button type="button" onClick={() => removeItem('goals', index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Icon (emoji)</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleItemChange('goals', index, 'icon', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange('goals', index, 'title', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange('goals', index, 'description', e.target.value)}
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

export default EditAbout;
