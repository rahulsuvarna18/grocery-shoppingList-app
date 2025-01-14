import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kevhumqcjphhvglflhgb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtldmh1bXFjanBoaHZnbGZsaGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NjY3MzMsImV4cCI6MjA1MjQ0MjczM30.vsdX1VUHl_71ZS337OIACPgaIfMXCswurfdY6CwwoEM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
