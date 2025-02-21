import { Schema, model, Types } from 'mongoose';

const OrderSchema = new Schema(
  {
    email: { type: String, required: true },
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Order = model('Order', OrderSchema);
