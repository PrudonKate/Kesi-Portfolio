import { createClient } from '@supabase/supabase-js';

// Your Supabase configuration
// Replace YOUR_SUPABASE_ANON_KEY with your actual anon/public key from Supabase dashboard
const supabaseUrl = 'https://mbruxxptyrmaakdmckzu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icnV4eHB0eXJtYWFrZG1ja3p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODUzNjIsImV4cCI6MjA4MDg2MTM2Mn0.P9Q2h3ayq9KgBzqII3XKFZb4re1YeZ1XTdA9VuTh18A'; // Get this from Supabase Settings → API

export const supabase = createClient(supabaseUrl, supabaseAnonKey);