import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase URL or Service Role Key missing in environment variables.');
}

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceKey || ''
);
