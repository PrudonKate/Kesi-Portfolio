import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>{user.email}</p>
        </div>
        
        <nav className="sidebar-nav">
          <button onClick={() => navigate('/admin/edit-hero')} className="nav-item">
            🏠 Edit Home/Hero
          </button>
          <button onClick={() => navigate('/admin/edit-about')} className="nav-item">
            👤 Edit About
          </button>
          <button onClick={() => navigate('/admin/edit-skills')} className="nav-item">
            ⚡ Edit Skills
          </button>
          <button onClick={() => navigate('/admin/edit-projects')} className="nav-item">
            📁 Edit Projects
          </button>
          <button onClick={() => navigate('/')} className="nav-item">
            👁️ View Site
          </button>
          <button onClick={handleLogout} className="nav-item logout">
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <div className="welcome-section">
          <h1>Welcome to Your Admin Dashboard</h1>
          <p>Select a section from the sidebar to start editing your portfolio content.</p>
          
          <div className="dashboard-cards">
            <div className="dash-card" onClick={() => navigate('/admin/edit-hero')}>
              <h3>🏠 Home Section</h3>
              <p>Edit hero text, title, and call-to-action</p>
            </div>
            
            <div className="dash-card" onClick={() => navigate('/admin/edit-about')}>
              <h3>👤 About Section</h3>
              <p>Update your bio and about cards</p>
            </div>
            
            <div className="dash-card" onClick={() => navigate('/admin/edit-skills')}>
              <h3>⚡ Skills Section</h3>
              <p>Manage your skills and capabilities</p>
            </div>
            
            <div className="dash-card" onClick={() => navigate('/admin/edit-projects')}>
              <h3>📁 Projects Section</h3>
              <p>Add, edit, or remove projects</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
