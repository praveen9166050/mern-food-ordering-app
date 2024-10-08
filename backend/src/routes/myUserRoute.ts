import express from "express";
import { createCurrentUser } from "../controllers/myUserController";
import { jwtCheck } from "../middlewares/auth";

const router = express.Router();

router.post('/', jwtCheck, createCurrentUser);

export default router;