import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db";

const app = express();

connectDB();

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 8080}`);
});
