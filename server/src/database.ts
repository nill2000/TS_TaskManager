import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = "https://rcmjriqpvljwivvkkscd.supabase.co";
const supabaseKey: string | undefined = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);
