import express from "express";
import { createMyRestaurant, getMyRestaurant, getMyRestaurantOrders, updateMyRestaurant, updateOrderStatus } from "../controllers/myRestaurantController";
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

router.get('/order', jwtCheck, jwtParse, getMyRestaurantOrders);

router.get('/order/:orderId/status', jwtCheck, jwtParse, updateOrderStatus);

router.get('/', jwtCheck, jwtParse, getMyRestaurant);

router.post(
  '/', 
  upload.single("imageFile"), 
  validateMyRestaurantRequest, 
  jwtCheck, 
  jwtParse, 
  createMyRestaurant
);

router.put(
  '/', 
  upload.single("imageFile"), 
  validateMyRestaurantRequest, 
  jwtCheck, 
  jwtParse, 
  updateMyRestaurant
);

export default router;