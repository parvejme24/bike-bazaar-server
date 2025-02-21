import { Request, Response } from 'express';
import { Product } from './product.model';

// create a new bike
export const createBike = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: savedProduct,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Validation failed', success: false, error: err });
  }
};

// get all bikes or search by query
export const getBikes = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const query = searchTerm
      ? {
          $or: [
            { name: searchTerm },
            { brand: searchTerm },
            { category: searchTerm },
          ],
        }
      : {};
    const products = await Product.find(query);
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      status: true,
      data: products,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving bikes', success: false, error: err });
  }
};

// get a specific bike
export const getBikeById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product)
      return res
        .status(404)
        .json({ message: 'Bike not found', success: false });
    res.status(200).json({
      message: 'Bike retrieved successfully',
      status: true,
      data: product,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving bike', success: false, error: err });
  }
};

// update a bike
export const updateBike = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true },
    );
    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: updatedProduct,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error updating bike', success: false, error: err });
  }
};

// delete a bike
export const deleteBike = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res
      .status(200)
      .json({ message: 'Bike deleted successfully', status: true, data: {} });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting bike', success: false, error: err });
  }
};
