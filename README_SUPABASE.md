# Portfolio with Supabase Admin Panel

A modern, fully customizable portfolio website with a complete admin panel powered by Supabase.

## ✨ Features

### Frontend
- 🎨 Modern, playful design with glassmorphism effects
- 🌊 Gradient backgrounds and smooth animations
- 📱 Fully responsive on all devices
- ⚡ Fast and optimized with Vite + React
- 🎯 Clean, organized code structure

### Admin Panel
- 🔐 Secure authentication with Supabase
- 📝 Content management for all sections
- 📸 Image upload with Supabase Storage
- 💾 PostgreSQL database for reliability
- 🎨 Beautiful UI matching portfolio design

### Sections
- 🏠 Hero - Introduction and profile
- 👤 About - Bio and highlight cards
- ⚡ Skills - Technical capabilities
- 💼 Experience - Work history timeline
- 📁 Projects - Portfolio showcase
- 📧 Contact - Get in touch form

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get credentials from Settings → API
4. Update `src/config/supabase.js`:

```javascript
const supabaseUrl = 'YOUR_PROJECT_URL';
const supabaseAnonKey = 'YOUR_ANON_KEY';
```

### 3. Create Database Table

In Supabase SQL Editor:

```sql
CREATE TABLE content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON content FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated insert/update"
  ON content FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
```

### 4. Create Storage Bucket

1. Go to Storage in Supabase
2. Create bucket: `portfolio-images` (public)
3. Set policies (see SUPABASE_SETUP_GUIDE.md)

### 5. Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:5173`

### 6. Create Admin Account

Go to: `http://localhost:5173/admin/signup`

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── Hero/           # Hero section
│   │   ├── Navbar/         # Navigation
│   │   ├── Footer/         # Footer
│   │   └── Layout/         # Page layout
│   ├── pages/
│   │   ├── About.jsx       # About page
│   │   ├── Skills.jsx      # Skills page
│   │   ├── Experience.jsx  # Experience page
│   │   ├── Projects.jsx    # Projects page
│   │   ├── Contact.jsx     # Contact page
│   │   ├── AdminLogin.jsx  # Admin login
│   │   ├── AdminSignup.jsx # Admin signup
│   │   ├── AdminDashboard.jsx
│   │   ├── EditHero.jsx
│   │   ├── EditAbout.jsx
│   │   ├── EditSkills.jsx
│   │   └── EditProjects.jsx
│   ├── styles/             # CSS files
│   ├── config/
│   │   ├── supabase.js     # Supabase config
│   │   └── emailjs.js      # Email config
│   ├── utils/
│   │   └── imageUpload.js  # Image utilities
│   └── assets/             # Images, icons
├── public/                 # Static files
├── QUICK_START.md          # Quick setup guide
├── SUPABASE_SETUP_GUIDE.md # Detailed setup
└── package.json
```

## 🎨 Customization

### Colors
Edit gradient colors in CSS files:
- Hero: `src/components/Hero/Hero.css`
- Admin: `src/styles/AdminLogin.css`

### Content
Use the admin panel at `/admin/dashboard` to:
- Update text and descriptions
- Upload images
- Add/remove sections
- Manage projects and skills

### Layout
Modify components in `src/components/` and pages in `src/pages/`

## 🔐 Security

### Authentication
- Supabase Auth with email/password
- Protected admin routes
- Session management

### Database
- Row Level Security (RLS) enabled
- Public read, authenticated write
- PostgreSQL security features

### Storage
- Public read for images
- Authenticated write only
- File type and size validation

## 📦 Tech Stack

- **Frontend**: React 19, React Router
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Styling**: CSS with modern features
- **Email**: EmailJS

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

### Deploy to Netlify
1. Build project: `npm run build`
2. Drag `dist` folder to Netlify
3. Or connect GitHub repo
4. Add environment variables

## 📚 Documentation

- **Quick Start**: `QUICK_START.md`
- **Supabase Setup**: `SUPABASE_SETUP_GUIDE.md`
- **Migration Guide**: `SUPABASE_MIGRATION_SUMMARY.md`
- **Project Summary**: `PROJECT_SUMMARY.md`

## 🆘 Troubleshooting

### Can't connect to Supabase?
- Verify credentials in `src/config/supabase.js`
- Check project is active in Supabase dashboard

### Images not uploading?
- Ensure storage bucket exists and is public
- Check storage policies are set
- Verify file size < 5MB

### Can't save content?
- Confirm database table is created
- Check RLS policies are set
- Ensure you're logged in

### Build errors?
- Run `npm install` to ensure all dependencies
- Check for console errors
- Verify all imports are correct

## 🤝 Contributing

Feel free to fork and customize for your own portfolio!

## 📄 License

MIT License - feel free to use for your own portfolio

## 🎉 Credits

Built with:
- React
- Supabase
- Vite
- EmailJS

---

**Made with ❤️ for developers who want a beautiful, customizable portfolio**

For detailed setup instructions, see `QUICK_START.md` or `SUPABASE_SETUP_GUIDE.md`
