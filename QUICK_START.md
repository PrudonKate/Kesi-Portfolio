# Quick Start Guide

## 🚀 Get Your Portfolio Running in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- React & React Router
- Supabase Client
- EmailJS (for contact form)
- All other dependencies

### Step 2: Set Up Supabase

1. **Create Account**: Go to [supabase.com](https://supabase.com) and sign up
2. **New Project**: Click "New Project" and fill in details
3. **Get Credentials**: Go to Settings → API and copy:
   - Project URL
   - anon/public key

### Step 3: Configure Your Project

Open `src/config/supabase.js` and paste your credentials:

```javascript
const supabaseUrl = 'https://xxxxx.supabase.co';
const supabaseAnonKey = 'eyJhbGc...your-key-here';
```

### Step 4: Create Database Table

In Supabase Dashboard → SQL Editor, paste and run:

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

### Step 5: Create Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click **New Bucket**
3. Name it: `portfolio-images`
4. Make it **Public**
5. Click **Create**

### Step 6: Set Storage Policies

In Storage → Policies → portfolio-images, add:

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');
```

### Step 7: Run Your Portfolio

```bash
npm run dev
```

Visit: `http://localhost:5173`

### Step 8: Create Admin Account

1. Go to: `http://localhost:5173/admin/signup`
2. Enter your email and password
3. Click "Sign Up"
4. Login at: `http://localhost:5173/admin/login`

### Step 9: Customize Your Content

1. Access dashboard: `/admin/dashboard`
2. Edit sections:
   - 🏠 Hero Section - Your intro and profile
   - 👤 About Section - Your bio and cards
   - ⚡ Skills Section - Your capabilities
   - 📁 Projects Section - Your work

### Step 10: Deploy (Optional)

#### Deploy to Vercel:
```bash
npm run build
# Then connect your GitHub repo to Vercel
```

#### Deploy to Netlify:
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── styles/         # CSS files
│   ├── config/         # Configuration files
│   └── utils/          # Helper functions
├── public/             # Static assets
└── package.json        # Dependencies
```

## 🎨 Customization Tips

### Change Colors
Edit gradient colors in CSS files:
- Hero: `src/components/Hero/Hero.css`
- Admin: `src/styles/AdminLogin.css`

### Add Sections
1. Create new page in `src/pages/`
2. Add route in `src/main.jsx`
3. Add to navbar in `src/components/Navbar/`

### Update Images
- Upload through admin panel
- Or place in `public/` folder
- Reference as `/filename.jpg`

## 🔧 Common Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## 📚 Documentation

- Full Setup: `SUPABASE_SETUP_GUIDE.md`
- Admin Guide: `ADMIN_SETUP_GUIDE.md`
- Project Summary: `PROJECT_SUMMARY.md`

## 🆘 Need Help?

### Can't connect to Supabase?
- Check your URL and key are correct
- Verify project is active in Supabase dashboard

### Images not uploading?
- Ensure storage bucket is created and public
- Check storage policies are set

### Can't save content?
- Verify database table is created
- Check you're logged in
- Review browser console for errors

## 🎉 You're All Set!

Your portfolio is ready to customize. Start by:
1. Uploading your profile photo
2. Updating your bio and skills
3. Adding your projects
4. Customizing colors and text

**Happy building! 🚀**
