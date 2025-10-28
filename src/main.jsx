import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import About from './pages/About.jsx'
import Skills from './pages/Skills.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Layout from './components/Layout/Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/Home" element={<App />} />

          <Route path="/about" element={<About />} />
          <Route path="/About" element={<About />} />

          <Route path="/skills" element={<Skills />} />
          <Route path="/Skills" element={<Skills />} />
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
