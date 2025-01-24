import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getAllUsers,
  getUserByUserId,
} from "../controllers/AuthController";
import { authenticateUser } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/adminMiddleware";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.put("/profile/:userId", authenticateUser, updateUserProfile);
authRouter.get("/users", authenticateUser, isAdmin, getAllUsers);
authRouter.get("/user/:userId", authenticateUser, getUserByUserId);

export default authRouter;
