import express from "express";
import { loginAdmin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/admin", loginAdmin);

export default userRouter;
