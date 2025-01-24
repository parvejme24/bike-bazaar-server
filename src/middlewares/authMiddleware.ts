import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secretConfig } from "../config/secret";

// Middleware to authenticate the user by checking the JWT token
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, token not provided" });
  }

  try {
    const decoded = jwt.verify(token, secretConfig.ACCESS_TOKEN);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
