# Admin Panel Setup Guide

## Overview
Your portfolio now includes a complete admin panel with modern design matching your portfolio's aesthetic. You can customize all content including text, images, and manage your portfolio sections.

## Features
✨ **Modern Design** - Glassmorphism and gradient effects matching your portfolio
🔐 **Authentication** - Secure login and signup with Firebase
📸 **Image Upload** - Upload and manage images directly to Firebase Storage
📝 **Content Management** - Edit Hero, About, Skills, Projects, and Experience sections
🎨 **Responsive** - Works beautifully on all devices

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Authentication** (Email/Password)
4. Enable **Firestore Database**
5. Enable **Storage**
6. Get your Firebase config from Project Settings

### 2. Update Firebase Config

Open `src/config/firebase.js` and replace with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Firebase Security Rules

#### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /content/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Install Dependencies

Make sure you have all Firebase packages:

```bash
npm install firebase
```

## Usage

### Creating Your Admin Account

1. Navigate to `/admin/signup`
2. Enter your email and password
3. Click "Sign Up"
4. You'll be redirected to the dashboard

### Logging In

1. Navigate to `/admin/login`
2. Enter your credentials
3. Access your dashboard

### Admin Routes

- `/admin/login` - Login page
- `/admin/signup` - Create new admin account
- `/admin/dashboard` - Main dashboard
- `/admin/edit-hero` - Edit home/hero section
- `/admin/edit-about` - Edit about section
- `/admin/edit-skills` - Edit skills section
- `/admin/edit-projects` - Edit projects section

## Editing Content

### Hero Section
- Upload profile image
- Edit title, subtitle, description
- Customize CTA button text and link

### About Section
- Update bio text
- Add/edit/remove about cards
- Customize icons and descriptions

### Skills Section
- Add/remove skills
- Update skill levels
- Organize by categories

### Projects Section
- Add new projects
- Upload project images
- Edit descriptions and links
- Manage project tags

## Image Upload

The admin panel supports image uploads with:
- **Accepted formats**: JPEG, PNG, GIF, WebP
- **Max file size**: 5MB
- **Auto-optimization**: Images are stored in Firebase Storage
- **CDN delivery**: Fast loading from Firebase CDN

## File Structure

```
src/
├── config/
│   ├── firebase.js          # Firebase configuration
│   └── emailjs.js           # Email configuration
├── pages/
│   ├── AdminLogin.jsx       # Login page
│   ├── AdminSignup.jsx      # Signup page
│   ├── AdminDashboard.jsx   # Main dashboard
│   ├── EditHero.jsx         # Edit hero section
│   ├── EditAbout.jsx        # Edit about section
│   ├── EditSkills.jsx       # Edit skills section
│   ├── EditProjects.jsx     # Edit projects section
│   └── Experience.jsx       # Experience page
├── styles/
│   ├── AdminLogin.css       # Login/Signup styles
│   ├── AdminDashboard.css   # Dashboard styles
│   ├── AdminEdit.css        # Edit pages styles
│   └── Experience.css       # Experience page styles
└── utils/
    └── imageUpload.js       # Image upload utilities
```

## Security Best Practices

1. **Never commit** your Firebase config with real credentials to public repos
2. Use **environment variables** for production
3. Enable **Firebase App Check** for additional security
4. Set up **proper Firestore security rules**
5. Regularly **review access logs** in Firebase Console

## Troubleshooting

### Images not uploading?
- Check Firebase Storage is enabled
- Verify storage rules allow authenticated writes
- Check file size (max 5MB)
- Ensure file format is supported

### Can't save changes?
- Verify Firestore is enabled
- Check Firestore security rules
- Ensure you're logged in
- Check browser console for errors

### Login not working?
- Verify Firebase Authentication is enabled
- Check Email/Password provider is enabled
- Ensure credentials are correct
- Check browser console for errors

## Support

For issues or questions:
1. Check Firebase Console for errors
2. Review browser console logs
3. Verify all Firebase services are enabled
4. Check security rules are properly set

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Update configuration
3. ✅ Create admin account
4. ✅ Start customizing your portfolio
5. 🎨 Make it yours!

---

**Note**: Keep your Firebase credentials secure and never share them publicly!
