import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL?.trim();
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "product-images";

// INFO: Server-side client using the service role key. It bypasses Row Level
// Security, so it must only ever be used on the backend, never in a browser.
const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

// INFO: Fails fast with a helpful message if the project or schema is not set up
export const checkConnection = async () => {
  if (!supabase) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env");
  }

  const { error } = await supabase
    .from("products")
    .select("id", { head: true, count: "exact" });

  if (error) {
    const missingTable = ["42P01", "PGRST205"].includes(error.code);
    throw new Error(
      `Supabase: ${error.message || "connection failed"}` +
        (missingTable ? ". Run backend/supabase/schema.sql in the Supabase SQL Editor." : "")
    );
  }
};

export default supabase;
