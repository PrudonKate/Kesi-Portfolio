import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return null;

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Portfolio</h2>
          <p>Admin Panel</p>
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
          <button onClick={() => navigate('/admin/edit-experience')} className="nav-item">
            💼 Edit Experience
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

        <div className="user-badge">
          <div className="user-avatar">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <p>{user.email}</p>
          </div>
        </div>
      </aside>

      <main className="admin-content">
        <div className="welcome-section">
          <h1>Dashboard</h1>
          <p>Welcome back! Manage your portfolio content from here.</p>
        </div>
          
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

            <div className="dash-card" onClick={() => navigate('/admin/edit-experience')}>
              <h3>💼 Experience Section</h3>
              <p>Update your work history and roles</p>
            </div>
            
            <div className="dash-card" onClick={() => navigate('/admin/edit-projects')}>
              <h3>📁 Projects Section</h3>
              <p>Add, edit, or remove projects</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
