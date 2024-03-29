import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import Product from './models/productModals.js';
import uploadRouter from './routes/uploadRoutes.js';
import orderRouter from './routes/orderRoutes.js';
// import bankRouter fro m './routes/bankRoutes.js';
import cors from 'cors';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db'); 
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', orderRouter);
// app.use('/api/bank', bankRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
