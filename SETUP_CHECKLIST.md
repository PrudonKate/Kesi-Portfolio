# Setup Checklist

Use this checklist to set up your portfolio step by step.

## ✅ Pre-Setup

- [ ] Node.js installed (v18 or higher)
- [ ] npm or yarn installed
- [ ] Code editor ready (VS Code recommended)
- [ ] Git installed (optional, for version control)

## 📦 Step 1: Install Dependencies (2 minutes)

```bash
npm install
```

**Verify:**
- [ ] No error messages
- [ ] `node_modules` folder created
- [ ] All packages installed successfully

## 🔐 Step 2: Create Supabase Account (3 minutes)

1. [ ] Go to [supabase.com](https://supabase.com)
2. [ ] Sign up with email or GitHub
3. [ ] Verify your email
4. [ ] Access dashboard

## 🚀 Step 3: Create Supabase Project (2 minutes)

1. [ ] Click "New Project"
2. [ ] Fill in project details:
   - [ ] Name: `my-portfolio` (or your choice)
   - [ ] Database Password: (save this securely!)
   - [ ] Region: (choose closest to you)
3. [ ] Click "Create new project"
4. [ ] Wait for project to initialize (~2 minutes)

## 🔑 Step 4: Get Credentials (1 minute)

1. [ ] Go to Settings → API
2. [ ] Copy **Project URL**
3. [ ] Copy **anon/public key**
4. [ ] Keep these safe (you'll need them next)

## ⚙️ Step 5: Configure Your Project (1 minute)

1. [ ] Open `src/config/supabase.js`
2. [ ] Replace `YOUR_SUPABASE_URL` with your Project URL
3. [ ] Replace `YOUR_SUPABASE_ANON_KEY` with your anon key
4. [ ] Save the file

**Example:**
```javascript
const supabaseUrl = 'https://abcdefgh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## 🗄️ Step 6: Create Database Table (2 minutes)

1. [ ] In Supabase Dashboard, go to **SQL Editor**
2. [ ] Click **New Query**
3. [ ] Copy and paste this SQL:

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

CREATE INDEX idx_content_section ON content(section);
```

4. [ ] Click **Run** (or press Ctrl+Enter)
5. [ ] Verify "Success" message appears

## 📁 Step 7: Create Storage Bucket (2 minutes)

1. [ ] In Supabase Dashboard, go to **Storage**
2. [ ] Click **New Bucket**
3. [ ] Enter name: `portfolio-images`
4. [ ] Check **Public bucket**
5. [ ] Click **Create bucket**
6. [ ] Verify bucket appears in list

## 🔒 Step 8: Set Storage Policies (2 minutes)

1. [ ] Click on `portfolio-images` bucket
2. [ ] Go to **Policies** tab
3. [ ] Click **New Policy**
4. [ ] For each policy below, click **Create policy** → **Custom** → paste SQL:

**Policy 1: Public Read**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');
```

**Policy 3: Authenticated Update**
```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images');
```

**Policy 4: Authenticated Delete**
```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');
```

5. [ ] Verify all 4 policies are created

## 🎯 Step 9: Start Development Server (1 minute)

```bash
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] See message: "Local: http://localhost:5173"
- [ ] Open browser to that URL
- [ ] Portfolio loads successfully

## 👤 Step 10: Create Admin Account (2 minutes)

1. [ ] Go to `http://localhost:5173/admin/signup`
2. [ ] Enter your email
3. [ ] Enter password (min 6 characters)
4. [ ] Confirm password
5. [ ] Click "Sign Up"
6. [ ] Check email for confirmation (if enabled)
7. [ ] Verify account created

## 🔓 Step 11: Test Login (1 minute)

1. [ ] Go to `http://localhost:5173/admin/login`
2. [ ] Enter your email
3. [ ] Enter your password
4. [ ] Click "Login"
5. [ ] Verify you're redirected to dashboard

## 🎨 Step 12: Test Admin Panel (3 minutes)

### Test Hero Section
1. [ ] Click "Edit Home/Hero"
2. [ ] Change the title
3. [ ] Click "Save Changes"
4. [ ] See success message
5. [ ] Go to home page
6. [ ] Verify changes appear

### Test Image Upload
1. [ ] Go back to "Edit Home/Hero"
2. [ ] Click "Choose File" under Profile Image
3. [ ] Select an image (< 5MB)
4. [ ] Wait for upload
5. [ ] See image preview
6. [ ] Click "Save Changes"
7. [ ] Verify image appears on home page

### Test About Section
1. [ ] Click "Edit About"
2. [ ] Update bio text
3. [ ] Edit a card
4. [ ] Click "Save Changes"
5. [ ] Verify changes saved

## 🎉 Step 13: Customize Your Portfolio (Ongoing)

Now you can:
- [ ] Upload your profile photo
- [ ] Update your bio and description
- [ ] Add your skills
- [ ] Add your projects
- [ ] Customize colors and styles
- [ ] Add your experience
- [ ] Update contact information

## 📝 Optional: Email Configuration

If you want the contact form to work:

1. [ ] Go to [EmailJS](https://www.emailjs.com/)
2. [ ] Create account
3. [ ] Set up email service
4. [ ] Get credentials
5. [ ] Update `src/config/emailjs.js`

## 🚀 Optional: Deploy to Production

### Vercel Deployment
1. [ ] Push code to GitHub
2. [ ] Go to [vercel.com](https://vercel.com)
3. [ ] Import your repository
4. [ ] Add environment variables:
   - [ ] `VITE_SUPABASE_URL`
   - [ ] `VITE_SUPABASE_ANON_KEY`
5. [ ] Deploy
6. [ ] Test live site

### Netlify Deployment
1. [ ] Run `npm run build`
2. [ ] Go to [netlify.com](https://netlify.com)
3. [ ] Drag `dist` folder to deploy
4. [ ] Or connect GitHub repo
5. [ ] Add environment variables
6. [ ] Deploy
7. [ ] Test live site

## ✅ Final Verification

- [ ] Portfolio loads on localhost
- [ ] Admin login works
- [ ] Can edit content
- [ ] Can upload images
- [ ] Changes appear on public pages
- [ ] All sections display correctly
- [ ] Responsive on mobile
- [ ] No console errors

## 🆘 Troubleshooting

If something doesn't work:

1. [ ] Check browser console for errors
2. [ ] Verify Supabase credentials are correct
3. [ ] Ensure database table exists
4. [ ] Confirm storage bucket is created
5. [ ] Check all policies are set
6. [ ] Review `SUPABASE_SETUP_GUIDE.md`
7. [ ] Check Supabase dashboard logs

## 📚 Documentation Reference

- **Quick Start**: `QUICK_START.md`
- **Detailed Setup**: `SUPABASE_SETUP_GUIDE.md`
- **Architecture**: `ARCHITECTURE.md`
- **Migration Info**: `SUPABASE_MIGRATION_SUMMARY.md`

## 🎊 Congratulations!

If you've checked all the boxes, your portfolio is ready!

**Next Steps:**
1. Customize your content
2. Add your projects
3. Update your skills
4. Make it uniquely yours
5. Deploy to production
6. Share with the world!

---

**Need help?** Check the documentation files or visit [supabase.com/docs](https://supabase.com/docs)

**Happy building! 🚀**
