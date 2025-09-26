import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://zhbwgkuzosayfadizxal.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoYndna3V6b3NheWZhZGl6eGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTg5NTMsImV4cCI6MjA3MzA5NDk1M30.3LLrqOeguCWFTDpeD8RGnhxQ3lOqFCSGusPeniSrrIA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

