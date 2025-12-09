import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/AdminEdit.css';

const EditHero = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "Hi, I'm Kate Carmel Prudon",
    subtitle: 'Frontend Developer | Design & Video Enthusiast',
    description: 'Designing and developing with creativity at the core.',
    ctaText: 'Download CV →',
    ctaLink: '/KATE PRUDON RESUME.pdf'
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
      const docRef = doc(db, 'content', 'hero');
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
      await setDoc(doc(db, 'content', 'hero'), formData);
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
          <button onClick={() => navigate('/admin/dashboard')} className="nav-item">← Back to Dashboard</button>
          <button onClick={() => navigate('/admin/edit-hero')} className="nav-item active">🏠 Edit Home/Hero</button>
          <button onClick={() => navigate('/admin/edit-about')} className="nav-item">👤 Edit About</button>
          <button onClick={() => navigate('/admin/edit-skills')} className="nav-item">⚡ Edit Skills</button>
          <button onClick={() => navigate('/admin/edit-projects')} className="nav-item">📁 Edit Projects</button>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="edit-section">
          <h1>Edit Hero Section</h1>
          {success && <div className="success-message">✓ Changes saved successfully!</div>}
          
          <form onSubmit={handleSubmit} className="edit-form">
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

            <button type="submit" disabled={loading} className="save-btn">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditHero;
