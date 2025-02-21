import { Router } from 'express';
import {
  createBike,
  getBikes,
  getBikeById,
  updateBike,
  deleteBike,
} from './product.controller';

const productRouter = Router();

productRouter.post('/products', createBike);
productRouter.get('/products', getBikes);
productRouter.get('/products/:productId', getBikeById);
productRouter.put('/products:productId', updateBike);
productRouter.delete('/products/:productId', deleteBike);

export default productRouter;
