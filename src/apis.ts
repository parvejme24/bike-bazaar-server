import express, { Router, Request, Response } from "express";
import authRouter from "./routes/AuthRoutes";

const router: Router = express.Router();

router.use("/auth", authRouter);

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

export default router;
