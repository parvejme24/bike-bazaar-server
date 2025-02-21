import mongoose, { Document, Schema, Model } from "mongoose";
import { IProduct } from "./ProductModel";
import { IUser } from "./UserModel";

// order item interface
interface IOrderItem {
  product: IProduct;
  quantity: number;
  price: number;
}

// order interface
export interface IOrder extends Document {
  user: IUser;
  items: IOrderItem[];
  totalPrice: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  estimatedDelivery: Date;
  paymentStatus: "Pending" | "Completed" | "Failed";
}

// order schema
const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
    estimatedDelivery: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// order model
const OrderModel: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
export default OrderModel;
