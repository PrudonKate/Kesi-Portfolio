import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/AdminEdit.css';

const EditAbout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    bio: 'Your bio text here...',
    cards: [
      { icon: '🎓', title: 'Education', description: 'Your education details' },
      { icon: '💼', title: 'Experience', description: 'Your experience details' },
      { icon: '🎯', title: 'Goals', description: 'Your goals' }
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
      const docRef = doc(db, 'content', 'about');
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
      await setDoc(doc(db, 'content', 'about'), formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes');
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...formData.cards];
    newCards[index][field] = value;
    setFormData({ ...formData, cards: newCards });
  };

  const addCard = () => {
    setFormData({
      ...formData,
      cards: [...formData.cards, { icon: '✨', title: 'New Card', description: 'Description' }]
    });
  };

  const removeCard = (index) => {
    const newCards = formData.cards.filter((_, i) => i !== index);
    setFormData({ ...formData, cards: newCards });
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
          <button onClick={() => navigate('/admin/edit-about')} className="nav-item active">👤 Edit About</button>
          <button onClick={() => navigate('/admin/edit-skills')} className="nav-item">⚡ Edit Skills</button>
          <button onClick={() => navigate('/admin/edit-projects')} className="nav-item">📁 Edit Projects</button>
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

            <div className="cards-section">
              <div className="section-header">
                <h3>About Cards</h3>
                <button type="button" onClick={addCard} className="add-btn">+ Add Card</button>
              </div>

              {formData.cards.map((card, index) => (
                <div key={index} className="card-editor">
                  <div className="card-header">
                    <h4>Card {index + 1}</h4>
                    <button type="button" onClick={() => removeCard(index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Icon (emoji)</label>
                      <input
                        type="text"
                        value={card.icon}
                        onChange={(e) => handleCardChange(index, 'icon', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={card.description}
                      onChange={(e) => handleCardChange(index, 'description', e.target.value)}
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
