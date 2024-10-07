import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import CustomError from "../utils/CustomError";

export const createCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {auth0Id} = req.body;
    const existingUser = await User.findOne({auth0Id});
    if (existingUser) {
      // throw new CustomError(400, "User already exists");
      res.status(200).json({});
      return;
    }
    const user = await User.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      user: user.toObject()
    });
  } catch (error) {
    next(error);
  }
}