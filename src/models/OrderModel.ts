import mongoose, { Schema, Document } from "mongoose";

// Define the product structure within an order
interface OrderProduct {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

// Define the main Order interface
interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: OrderProduct[];
  totalPrice: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Order schema
const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Order model
const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
