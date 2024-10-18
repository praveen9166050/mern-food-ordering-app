import express from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSession, stripeWebhookHandler } from "../controllers/orderController";

const router = express.Router();

router.post(
  '/checkout/create-checkout-session',
  jwtCheck,
  jwtParse,
  createCheckoutSession
);

router.post('/checkout/webhook', stripeWebhookHandler);

export default router;