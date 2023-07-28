import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://znukyrfbtxqsznfckeht.supabase.co';
export const supabaseCabinImagesUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudWt5cmZidHhxc3puZmNrZWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0NDkzMDcsImV4cCI6MjAwNjAyNTMwN30.FXyo9dkiJQnHLiLWirDm3_eteq1Exo9LxBKNT8loQBk`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
