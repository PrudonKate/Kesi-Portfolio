import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/AdminEdit.css';

const EditProjects = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: 'My Projects',
    projects: [
      {
        name: 'Project Name',
        description: 'Project description',
        image: 'image-url',
        tags: ['React', 'CSS'],
        link: 'https://project-link.com'
      }
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
      const docRef = doc(db, 'content', 'projects');
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
      await setDoc(doc(db, 'content', 'projects'), formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const handleTagsChange = (index, value) => {
    const newProjects = [...formData.projects];
    newProjects[index].tags = value.split(',').map(tag => tag.trim());
    setFormData({ ...formData, projects: newProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, {
        name: 'New Project',
        description: 'Description',
        image: 'image-url',
        tags: ['Tag1'],
        link: 'https://example.com'
      }]
    });
  };

  const removeProject = (index) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
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
          <button onClick={() => navigate('/admin/edit-skills')} className="nav-item">⚡ Edit Skills</button>
          <button onClick={() => navigate('/admin/edit-projects')} className="nav-item active">📁 Edit Projects</button>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="edit-section">
          <h1>Edit Projects Section</h1>
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

            <div className="cards-section">
              <div className="section-header">
                <h3>Projects</h3>
                <button type="button" onClick={addProject} className="add-btn">+ Add Project</button>
              </div>

              {formData.projects.map((project, index) => (
                <div key={index} className="card-editor project-editor">
                  <div className="card-header">
                    <h4>Project {index + 1}</h4>
                    <button type="button" onClick={() => removeProject(index)} className="remove-btn">Remove</button>
                  </div>
                  
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={project.image}
                      onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={project.tags.join(', ')}
                      onChange={(e) => handleTagsChange(index, e.target.value)}
                      placeholder="React, CSS, JavaScript"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Project Link</label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
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

export default EditProjects;
