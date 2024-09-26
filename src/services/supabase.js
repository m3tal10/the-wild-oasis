import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://prpaiwvligqiramoyipx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycGFpd3ZsaWdxaXJhbW95aXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDkyMDUsImV4cCI6MjA0MjQ4NTIwNX0.c_eYjcw7yve3VG4ITXOJkkIJq2hUQDR5X8Y6zT6PZyo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
