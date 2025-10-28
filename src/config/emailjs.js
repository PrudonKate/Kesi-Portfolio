// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/

export const emailjsConfig = {
  // Your EmailJS service ID
  serviceId: 'service_hxgaulj',
  
  // Your EmailJS template ID
  templateId: 'template_fz4dbne',
  
  // Your EmailJS public key (User ID)
  publicKey: 'OI5Eox8-Cj_WjGKqz'
};

// Template parameters mapping
export const templateParams = {
  from_name: 'name',
  from_email: 'email', 
  subject: 'subject',
  message: 'message',
  to_name: 'Kesi', // Your name
  reply_to: 'email'
};