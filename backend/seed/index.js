import "dotenv/config";
import { checkConnection } from "../config/supabase.js";
import seedProducts from "./seedProducts.js";

// INFO: Usage: npm run seed            -> seed only if the products table is empty
//              npm run seed -- --force -> replace all products with the starter catalog
const force = process.argv.includes("--force");

try {
  await checkConnection();
  const inserted = await seedProducts({ force });
  console.log(
    inserted
      ? `Seeded ${inserted} products.`
      : "Products already exist. Use `npm run seed -- --force` to reset."
  );
} catch (error) {
  console.error("Seeding failed:", error.message);
  process.exitCode = 1;
}
