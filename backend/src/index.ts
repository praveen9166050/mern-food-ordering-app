import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute";
import myRestaurantroute from "./routes/myRestaurantRoute";
import restaurantRoute from "./routes/restaurantRoute";
import orderRoute from "./routes/orderRoute";
import errorHandler from "./middlewares/errorHandler";
import CustomError from "./utils/CustomError";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(cors());
app.use('/api/order/checkout/webhook', express.raw({type: "*/*"}));
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    message: "Health Ok!"
  });
});
app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantroute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/order', orderRoute);
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new CustomError(404, "Route does not exist"));
});
app.use(errorHandler);

const port = process.env.PORT || 7000;
mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
})
.catch((err) => {
  console.log("Error:", err);
});