import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  ticket_url?: string;
  created_at?: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  thumbnail_url: string;
  caption: string;
  category: 'performance' | 'photoshoot' | 'RabOline';
  width?: number;
  height?: number;
  created_at?: string;
}

export interface Video {
  id: number;
  youtube_id: string;
  title: string;
  thumbnail_url: string;
  created_at?: string;
}

export interface Profile {
  id: number;
  stage_name: string;
  real_name: string;
  dob: string;
  height: string;
  team: string;
  hobbies: string;
  debut: string;
  total_show: string;
  bio: string;
  fun_facts: string[];
  hashtags: string[];
  singles: { title: string; year: number }[];
  career_timeline: { date: string; event: string }[];
  updated_at?: string;
}
