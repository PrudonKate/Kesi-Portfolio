import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

// Run this once to initialize your database with default content
export const initializeDefaultContent = async () => {
  try {
    // Hero Section
    await setDoc(doc(db, 'content', 'hero'), {
      title: "Hi, I'm Kate Carmel Prudon",
      subtitle: 'Frontend Developer | Design & Video Enthusiast',
      description: 'Designing and developing with creativity at the core.',
      ctaText: 'Download CV →',
      ctaLink: '/KATE PRUDON RESUME.pdf'
    });

    // About Section
    await setDoc(doc(db, 'content', 'about'), {
      bio: 'I am a passionate frontend developer with a keen eye for design and a love for creating beautiful, functional web experiences. My journey in web development combines technical expertise with creative problem-solving.',
      cards: [
        {
          icon: '🎓',
          title: 'Education',
          description: 'Studied Computer Science and continuously learning new technologies'
        },
        {
          icon: '💼',
          title: 'Experience',
          description: 'Building responsive websites and web applications'
        },
        {
          icon: '🎯',
          title: 'Goals',
          description: 'Creating impactful digital experiences that make a difference'
        }
      ]
    });

    // Skills Section
    await setDoc(doc(db, 'content', 'skills'), {
      title: 'My Skills',
      description: 'Technologies and tools I work with to bring ideas to life',
      skills: [
        { name: 'React', logo: '/src/assets/react.svg' },
        { name: 'JavaScript', logo: '/src/assets/javascript.svg' },
        { name: 'HTML5', logo: '/src/assets/html5.svg' },
        { name: 'CSS3', logo: '/src/assets/css3.svg' },
        { name: 'Python', logo: '/src/assets/python.svg' }
      ],
      capabilities: [
        {
          icon: '💻',
          title: 'Web Development',
          description: 'Building responsive, modern websites with clean code'
        },
        {
          icon: '🎨',
          title: 'UI/UX Design',
          description: 'Creating beautiful and intuitive user interfaces'
        },
        {
          icon: '📱',
          title: 'Responsive Design',
          description: 'Ensuring great experiences across all devices'
        }
      ]
    });

    // Projects Section
    await setDoc(doc(db, 'content', 'projects'), {
      title: 'My Projects',
      projects: [
        {
          name: 'Portfolio Website',
          description: 'A modern, responsive portfolio showcasing my work and skills',
          image: '/src/assets/project1.jpg',
          tags: ['React', 'CSS', 'Firebase'],
          link: 'https://example.com'
        },
        {
          name: 'E-commerce Platform',
          description: 'Full-featured online shopping platform with cart and checkout',
          image: '/src/assets/project2.jpg',
          tags: ['React', 'Node.js', 'MongoDB'],
          link: 'https://example.com'
        }
      ]
    });

    console.log('✅ Default content initialized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error initializing content:', error);
    return false;
  }
};
