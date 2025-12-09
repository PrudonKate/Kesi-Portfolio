# Admin Panel Setup Guide

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "my-portfolio-admin")
4. Follow the setup wizard

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Enable **Email/Password** sign-in method
4. Click "Add user" to create your admin account:
   - Email: your-admin@email.com
   - Password: your-secure-password

### Step 3: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode**
4. Choose a location closest to you
5. Click "Enable"

### Step 4: Set Firestore Rules

Go to **Firestore Database > Rules** and paste this:

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

Click "Publish"

### Step 5: Get Firebase Config

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (</>)
4. Register your app (name: "Portfolio Admin")
5. Copy the `firebaseConfig` object

### Step 6: Update Your Code

Open `src/config/firebase.js` and replace with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 🚀 Deployment to Vercel

### Environment Variables

In your Vercel project settings, add these environment variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then update `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 📝 How to Use

### Access Admin Panel

1. Go to: `https://your-domain.vercel.app/admin/login`
2. Login with your Firebase admin credentials
3. You'll be redirected to the dashboard

### Edit Content

- **Home/Hero**: Edit main landing page content
- **About**: Update bio and about cards
- **Skills**: Manage skills and capabilities
- **Projects**: Add/edit/remove projects

### Admin Routes

- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard
- `/admin/edit-hero` - Edit hero section
- `/admin/edit-about` - Edit about section
- `/admin/edit-skills` - Edit skills section
- `/admin/edit-projects` - Edit projects section

## 🔒 Security Notes

1. **Never commit** your Firebase config with real credentials to GitHub
2. Use environment variables in production
3. Keep your admin password secure
4. Only authorized users should have Firebase Authentication access
5. Firestore rules ensure only authenticated users can write data

## 🎨 Customization

You can customize the admin panel by editing:
- `src/styles/AdminDashboard.css` - Dashboard styling
- `src/styles/AdminEdit.css` - Edit pages styling
- `src/styles/AdminLogin.css` - Login page styling

## 📱 Mobile Responsive

The admin panel is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🐛 Troubleshooting

**Can't login?**
- Check Firebase Authentication is enabled
- Verify user exists in Firebase Console
- Check browser console for errors

**Changes not saving?**
- Check Firestore rules are set correctly
- Verify you're logged in
- Check browser console for errors

**Page not found?**
- Clear browser cache
- Redeploy to Vercel
- Check routes in `src/main.jsx`
