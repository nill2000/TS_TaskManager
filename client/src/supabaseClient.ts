import { createClient } from "@supabase/supabase-js";

const postgresUrl = import.meta.env.VITE_POSTGRES_URL;
const postgresKey = import.meta.env.VITE_POSTGRES_KEY;

export const supabase = createClient(postgresUrl, postgresKey);
