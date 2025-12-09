# Supabase Setup Guide

## Overview
Your portfolio now uses Supabase for authentication, database, and storage. This guide will help you set up everything you need.

## Why Supabase?
- ✅ **Open Source** - Full control over your data
- ✅ **PostgreSQL** - Powerful relational database
- ✅ **Real-time** - Live updates out of the box
- ✅ **Storage** - Built-in file storage with CDN
- ✅ **Authentication** - Secure user management
- ✅ **Free Tier** - Generous free plan for personal projects

## Setup Instructions

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: Your portfolio name
   - **Database Password**: Strong password (save this!)
   - **Region**: Choose closest to your users
5. Wait for project to be created (~2 minutes)

### 2. Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 3. Update Configuration

Open `src/config/supabase.js` and replace:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 4. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 5. Create Database Tables

In Supabase Dashboard, go to **SQL Editor** and run this:

```sql
-- Create content table for portfolio sections
CREATE TABLE content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON content
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert/update"
  ON content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_content_section ON content(section);
```

### 6. Set Up Storage

1. In Supabase Dashboard, go to **Storage**
2. Click **New Bucket**
3. Create a bucket named: `portfolio-images`
4. Make it **Public** (check the public checkbox)
5. Click **Create Bucket**

### 7. Configure Storage Policies

In **Storage** → **Policies** → `portfolio-images`:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images');
```

### 8. Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (should be enabled by default)
3. Optional: Configure email templates in **Email Templates**
4. Optional: Disable email confirmation for testing:
   - Go to **Authentication** → **Settings**
   - Uncheck "Enable email confirmations"

## Usage

### Creating Your Admin Account

1. Navigate to `/admin/signup`
2. Enter your email and password
3. If email confirmation is enabled, check your email
4. Login at `/admin/login`

### Admin Routes

- `/admin/login` - Login page
- `/admin/signup` - Create new admin account
- `/admin/dashboard` - Main dashboard
- `/admin/edit-hero` - Edit home/hero section
- `/admin/edit-about` - Edit about section
- `/admin/edit-skills` - Edit skills section
- `/admin/edit-projects` - Edit projects section

## Database Schema

### Content Table Structure

```javascript
{
  id: 'uuid',
  section: 'hero' | 'about' | 'skills' | 'projects',
  content: {
    // Section-specific data stored as JSON
    // Example for hero:
    title: 'string',
    subtitle: 'string',
    description: 'string',
    profileImage: 'string (URL)',
    ctaText: 'string',
    ctaLink: 'string'
  },
  created_at: 'timestamp',
  updated_at: 'timestamp'
}
```

## Storage Structure

```
portfolio-images/
├── profile/
│   └── timestamp_randomid.jpg
├── projects/
│   └── timestamp_randomid.png
└── images/
    └── timestamp_randomid.webp
```

## Security Best Practices

### Row Level Security (RLS)
- ✅ Enabled on all tables
- ✅ Public can read content
- ✅ Only authenticated users can write

### Storage Policies
- ✅ Public can view images
- ✅ Only authenticated users can upload/delete

### API Keys
- ✅ Use `anon` key for client-side (safe to expose)
- ⚠️ Never expose `service_role` key
- ✅ Use environment variables in production

## Environment Variables (Production)

Create `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Update `src/config/supabase.js`:

```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## Troubleshooting

### Can't upload images?
- ✅ Check storage bucket exists and is public
- ✅ Verify storage policies are set correctly
- ✅ Check file size (max 50MB by default)
- ✅ Ensure you're authenticated

### Can't save content?
- ✅ Verify content table exists
- ✅ Check RLS policies are set
- ✅ Ensure you're logged in
- ✅ Check browser console for errors

### Authentication not working?
- ✅ Verify email provider is enabled
- ✅ Check credentials are correct
- ✅ Look for errors in browser console
- ✅ Check Supabase dashboard logs

### Database queries failing?
- ✅ Check table structure matches schema
- ✅ Verify RLS policies allow the operation
- ✅ Check SQL Editor for query errors
- ✅ Review Supabase logs in dashboard

## Useful Supabase Features

### Real-time Subscriptions
Listen to database changes in real-time:

```javascript
const subscription = supabase
  .channel('content-changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'content' },
    (payload) => console.log('Change received!', payload)
  )
  .subscribe();
```

### Database Functions
Create custom functions in SQL Editor for complex operations.

### Edge Functions
Deploy serverless functions for backend logic.

### Backups
- Automatic daily backups on paid plans
- Manual backups available in dashboard

## Migration from Firebase

If you had Firebase before:

1. Export data from Firebase
2. Transform to Supabase schema
3. Import using SQL or API
4. Update image URLs
5. Test thoroughly

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## Support

- [Supabase Discord](https://discord.supabase.com)
- [GitHub Discussions](https://github.com/supabase/supabase/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)

---

**Your portfolio is now powered by Supabase! 🚀**
