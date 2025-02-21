import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import productRouter from './app/modules/product/product.route';
import orderRouter from './app/modules/order/order.route';
import userRouter from './app/modules/user/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Bike Store Server' });
});

export default app;
