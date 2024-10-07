import express from "express";
import { createCurrentUser } from "../controllers/myUserController";

const router = express.Router();

router.post('/', createCurrentUser);

export default router;