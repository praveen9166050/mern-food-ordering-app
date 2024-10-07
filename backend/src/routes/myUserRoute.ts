import express from "express";
import { createCurrentUser } from "../controllers/myUserController";

const router = express.Router();

router.get('/', createCurrentUser);

export default router;