import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant";
import CustomError from "../utils/CustomError";
import { v2 as cloudinary } from 'cloudinary';

export const createMyRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existingrestaurant = await Restaurant.findOne({user: req.userId});
    if (existingrestaurant) {
      throw new CustomError(409, "Restaurant for this user already exists");
    }
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI);
    const restaurant = await Restaurant.create({
      ...req.body, 
      user: req.userId, 
      imageUrl: uploadResponse.url
    });
    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: restaurant.toObject()
    });
  } catch (error) {
    next(error);
  }
}