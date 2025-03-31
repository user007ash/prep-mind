
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
// Default values for development (replace these with your actual Supabase project values)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcHRhYXB1c3BwdWJlc3ZjbmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1MDQwMDAsImV4cCI6MTk5ODA4MDAwMH0.EXAMPLE_KEY';

// Log warning if environment variables are missing
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are missing! Using fallback values. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file for proper functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
