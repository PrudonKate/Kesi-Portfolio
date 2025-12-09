import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import About from './pages/About.jsx'
import Skills from './pages/Skills.jsx'
import Experience from './pages/Experience.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Layout from './components/Layout/Layout.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminSignup from './pages/AdminSignup.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EditHero from './pages/EditHero.jsx'
import EditAbout from './pages/EditAbout.jsx'
import EditSkills from './pages/EditSkills.jsx'
import EditExperience from './pages/EditExperience.jsx'
import EditProjects from './pages/EditProjects.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Admin Routes - No Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit-hero" element={<EditHero />} />
        <Route path="/admin/edit-about" element={<EditAbout />} />
        <Route path="/admin/edit-skills" element={<EditSkills />} />
        <Route path="/admin/edit-experience" element={<EditExperience />} />
        <Route path="/admin/edit-projects" element={<EditProjects />} />

        {/* Public Routes - With Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/Home" element={<App />} />

          <Route path="/about" element={<About />} />
          <Route path="/About" element={<About />} />

          <Route path="/skills" element={<Skills />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/Experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Contact" element={<Contact />} />
          {/* Fallback for any unmatched route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
