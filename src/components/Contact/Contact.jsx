import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { emailjsConfig, templateParams } from '../../config/emailjs';
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus({ type: 'error', message: 'Please fix the errors above' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Prepare template parameters
      const templateParameters = {
        [templateParams.from_name]: formData.name,
        [templateParams.from_email]: formData.email,
        [templateParams.subject]: formData.subject,
        [templateParams.message]: formData.message,
        [templateParams.to_name]: templateParams.to_name || 'Kesi',
        [templateParams.reply_to]: formData.email
      };

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParameters,
        emailjsConfig.publicKey
      );

      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or contact me directly.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-header">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">
          I craft high-quality, linkable content and build high-authority links to help you grow your rankings and improve your brand.
        </p>
      </div>

      <div className="contact-card">
        <aside className="contact-info" aria-label="Contact information">
          <h2>Contact Information</h2>
          <p className="info-desc">Contact me for collaboration or inquiries.</p>

          <ul className="info-list">
            <li>
              <span className="info-label">Phone</span>
              <span className="info-value">+00000000</span>
            </li>
            <li>
              <span className="info-label">Email</span>
              <span className="info-value">kclimprudon@gmail.com</span>
            </li>
            <li>
              <span className="info-label">Location</span>
              <span className="info-value">Manila, Philippines</span>
            </li>
          </ul>
        </aside>

        <form className="contact-form" aria-label="Send us a message" onSubmit={handleSubmit}>
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Your Name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="email">Your Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full">
              <label htmlFor="subject">Your Subject</label>
              <input 
                id="subject" 
                name="subject" 
                type="text" 
                placeholder="I want to hire you quickly"
                value={formData.subject}
                onChange={handleInputChange}
                className={errors.subject ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.subject && <span className="error-text">{errors.subject}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Write here your message" 
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="send-btn" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;