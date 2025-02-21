import mongoose, { Document, Schema, Model } from "mongoose";
import { IOrder } from "./OrderModel";
import { IUser } from "./UserModel";

// payment interface
export interface IPayment extends Document {
  order: IOrder;
  user: IUser;
  amount: number;
  method: "SurjoPay";
  status: "Pending" | "Completed" | "Failed";
  transactionId: string;
  paymentDate: Date;
}

// payment schema
const paymentSchema = new Schema<IPayment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["SurjoPay"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// payment model
const PaymentModel: Model<IPayment> = mongoose.model<IPayment>(
  "Payment",
  paymentSchema
);
export default PaymentModel;
