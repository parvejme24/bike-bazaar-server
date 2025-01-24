import mongoose from "mongoose";
import { secretConfig } from "./secret";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(secretConfig.mongoDbUrl);
    console.log(
      `MongoDB connected successfully to the database: ${
        process.env.DB_NAME || "DefaultDB"
      } at host: ${connection.connection.host}`
    );
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
