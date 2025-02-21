import { Router } from 'express';
import { createOrder, calculateRevenue } from './order.controller';

const orderRouter = Router();

orderRouter.post('/orders', createOrder);
orderRouter.get('/revenue', calculateRevenue);

export default orderRouter;
