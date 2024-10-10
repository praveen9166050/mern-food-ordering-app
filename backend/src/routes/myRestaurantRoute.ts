import express from "express";
import { createMyRestaurant } from "../controllers/myRestaurantController";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyRestaurantRequest } from "../middlewares/validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1025 // 5MB
  }
});

router.post(
  '/', 
  upload.single("imageFile"), 
  validateMyRestaurantRequest, 
  jwtCheck, 
  jwtParse, 
  createMyRestaurant
);

export default router;