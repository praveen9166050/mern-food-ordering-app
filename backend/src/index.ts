import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello!"
  });
});

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