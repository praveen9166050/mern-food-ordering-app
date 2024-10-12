import { ErrorRequestHandler } from "express";
import CustomError from "../utils/CustomError";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("Error:", err);
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      message: err.message
    });
  } else {
    res.status(500).json({
      message: err.message || "Internal Server Error"
    });
  }
}

export default errorHandler;