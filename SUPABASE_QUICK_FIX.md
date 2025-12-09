# Quick Fix for Admin Page Not Saving

## The Problem
Your admin page can't save because the database table doesn't exist yet.

## Solution: Create the Database Table

### Step 1: Go to Supabase SQL Editor

1. Open your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run This SQL

Copy and paste this entire code block and click **Run**:

```sql
-- Create the content table
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON content;
DROP POLICY IF EXISTS "Allow authenticated insert/update" ON content;

-- Create policies
CREATE POLICY "Allow public read access"
  ON content FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow authenticated insert/update"
  ON content FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create index
CREATE INDEX IF NOT EXISTS idx_content_section ON content(section);

-- Insert default data for testing
INSERT INTO content (section, content) 
VALUES ('hero', '{
  "title": "Hi, I''m Kate Carmel Prudon",
  "subtitle": "Frontend Developer | Design & Video Enthusiast",
  "description": "Designing and developing with creativity at the core.",
  "ctaText": "Download CV →",
  "ctaLink": "/KATE PRUDON RESUME.pdf",
  "profileImage": ""
}'::jsonb)
ON CONFLICT (section) DO NOTHING;
```

### Step 3: Verify Table Was Created

After running the SQL:
1. Go to **Table Editor** in the left sidebar
2. You should see a table called **content**
3. Click on it - you should see 1 row with section = 'hero'

### Step 4: Test Saving

1. Go back to your portfolio: `http://localhost:5173/admin/login`
2. Login
3. Go to **Edit Hero Section**
4. Change the title to something like "Test Title"
5. Click **Save Changes**
6. You should see "✓ Changes saved successfully!"

### Step 5: Verify It Worked

Go back to Supabase → **Table Editor** → **content**
- The hero row should now have your updated title

---

## If You Still Get Errors:

### Error: "relation 'content' does not exist"
- The table wasn't created
- Run the SQL again
- Make sure you clicked **Run** (or pressed Ctrl+Enter)

### Error: "permission denied"
- RLS policies aren't set correctly
- Run the SQL again to recreate policies

### Error: "Invalid API key"
- Your Supabase key is wrong
- Go to Settings → API
- Copy the **anon/public** key
- Update `src/config/supabase.js`

---

## Quick Verification Checklist

- [ ] Supabase project is active
- [ ] SQL was run successfully (no errors)
- [ ] Table "content" exists in Table Editor
- [ ] You're logged into admin panel
- [ ] Browser console shows no errors (F12)

---

## Still Not Working?

Check browser console (F12 → Console tab) and tell me:
1. What error messages you see (if any)
2. What happens when you click "Save Changes"
3. Does the button say "Saving..." or nothing happens?

This will help me identify the exact issue!
