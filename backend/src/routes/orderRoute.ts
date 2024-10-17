import express from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSession } from "../controllers/orderController";

const router = express.Router();

router.post(
  '/checkout/create-checkout-session',
  jwtCheck,
  jwtParse,
  createCheckoutSession
);

export default router;