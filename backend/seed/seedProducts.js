import supabase from "../config/supabase.js";
import { toProductRow } from "../models/mappers.js";
import products from "./products.js";

// INFO: Inserts the starter catalog. With { force: true } existing products are replaced.
const seedProducts = async ({ force = false } = {}) => {
  const { count, error: countError } = await supabase
    .from("products")
    .select("id", { head: true, count: "exact" });
  if (countError) throw countError;

  if (count > 0 && !force) return 0;

  if (force) {
    // INFO: PostgREST requires a filter on delete; this matches every row
    const { error } = await supabase.from("products").delete().not("id", "is", null);
    if (error) throw error;
  }

  const { error } = await supabase.from("products").insert(products.map(toProductRow));
  if (error) throw error;

  return products.length;
};

export default seedProducts;
