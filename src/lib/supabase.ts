import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Person = {
  id: string;
  name: string;
  created_at: string;
};

export type Gift = {
  id: string;
  person_id: string;
  title: string;
  gifted_by: string | null;
  created_at: string;
};
