import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://plcfwsolwwhxzumrdgpg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_3-L963OU5G6diNjMdjIjUA_-3mdXMLr';

export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;


