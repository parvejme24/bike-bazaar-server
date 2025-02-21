import { Request, Response } from 'express';
import { Product } from '../product/product.model';
import { Order } from './order.model';

// Create an order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { product: productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product || product.quantity < quantity) {
      return res
        .status(400)
        .json({ message: 'Insufficient stock', success: false });
    }

    const totalPrice = product.price * quantity;
    const order = new Order({ ...req.body, totalPrice });
    await order.save();

    // Update product stock
    product.quantity -= quantity;
    product.inStock = product.quantity > 0;
    await product.save();

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Order creation failed', success: false, error: err });
  }
};

// Calculate total revenue
export const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: revenue[0],
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error calculating revenue',
      success: false,
      error: err,
    });
  }
};
