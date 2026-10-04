import express from "express";
import {
  placeOrder,
  verifyPayment,
  userOrders,
  allOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const orderRouter = express.Router();

// INFO: User routes
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/verify", userAuth, verifyPayment);
orderRouter.get("/user", userAuth, userOrders);

// INFO: Admin routes
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
