import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { uploadImage, validateImage } from '../utils/imageUpload';
import '../styles/AdminEdit.css';

const EditHero = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "Hi, I'm Kate Carmel Prudon",
    subtitle: 'Frontend Developer | Design & Video Enthusiast',
    description: 'Designing and developing with creativity at the core.',
    ctaText: 'Download CV →',
    ctaLink: '/KATE PRUDON RESUME.pdf',
    profileImage: ''
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
        .eq('section', 'hero')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setFormData({ ...formData, ...data.content });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !validateImage(file)) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file, 'portfolio-images', 'profile');
      setFormData({ ...formData, profileImage: imageUrl });
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Error uploading image. Please try again.');
      console.error(error);
    } finally {
      setUploading(false);
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
          section: 'hero',
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <button onClick={() => navigate('/admin/edit-hero')} className="nav-item active">
            🏠 Edit Home/Hero
          </button>
          <button onClick={() => navigate('/admin/edit-about')} className="nav-item">
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
          <h1>Edit Hero Section</h1>
          {success && <div className="success-message">✓ Changes saved successfully!</div>}
          
          <form onSubmit={handleSubmit} className="edit-form">
            {/* Image Upload */}
            <div className="image-upload-section">
              <label>Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <p>Uploading image...</p>}
              {formData.profileImage && (
                <div className="image-preview">
                  <img src={formData.profileImage} alt="Profile preview" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Hero Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>CTA Button Text</label>
              <input
                type="text"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CTA Button Link</label>
              <input
                type="text"
                name="ctaLink"
                value={formData.ctaLink}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading || uploading} className="save-btn">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditHero;
