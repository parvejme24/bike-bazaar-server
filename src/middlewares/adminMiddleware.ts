import { Request, Response, NextFunction } from "express";

// middleware to check if the user is an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied, admin role required" });
  }
  next();
};
