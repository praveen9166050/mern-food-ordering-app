import express from "express";
import { createCurrentUser, getCurrentUser, updateCurrentUser } from "../controllers/myUserController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validator";

const router = express.Router();

router.get('/', jwtCheck, jwtParse, getCurrentUser);
router.post('/', jwtCheck, createCurrentUser);
router.put('/', jwtCheck, jwtParse, validateMyUserRequest, updateCurrentUser);

export default router;