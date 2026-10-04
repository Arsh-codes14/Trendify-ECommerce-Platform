import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import supabase, { checkConnection } from "./config/supabase.js";
import { isRazorpayConfigured } from "./config/razorpay.js";
import seedProducts from "./seed/seedProducts.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// INFO: Create express app
const app = express();
const port = process.env.PORT || 4000;

// INFO: Middleware
app.use(express.json({ limit: "1mb" }));
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "public"), { maxAge: "7d" }));

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// INFO: Health check
app.get("/api/health", async (req, res) => {
  const dbConnected = await checkConnection().then(() => true, () => false);
  res
    .status(dbConnected ? 200 : 503)
    .json({ success: dbConnected, database: dbConnected ? "connected" : "disconnected" });
});

// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// INFO: Unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// INFO: Central error handler (e.g. malformed JSON, upload errors)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.expose ? err.message : "Something went wrong" });
});

// INFO: Connect to the database, seed the starter catalog if empty, then start the server
const startServer = async () => {
  try {
    await checkConnection();
    console.log("Connected to Supabase");

    // INFO: Card / UPI payments need the Razorpay columns (supabase/razorpay-migration.sql)
    if (isRazorpayConfigured) {
      const { error } = await supabase.from("orders").select("razorpay_order_id").limit(1);
      if (error) console.warn("Razorpay is configured but the database is missing its columns. Run backend/supabase/razorpay-migration.sql in the Supabase SQL Editor.");
      else console.log("Razorpay payments enabled");
    }

    const seeded = await seedProducts();
    if (seeded) console.log(`Database was empty: seeded ${seeded} starter products`);

    app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    console.error("Check the SUPABASE_* values in backend/.env (see backend/.env.example).");
    process.exit(1);
  }
};

startServer();

export default app;
