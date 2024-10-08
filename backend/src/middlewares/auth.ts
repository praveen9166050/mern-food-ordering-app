import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import CustomError from "../utils/CustomError";
import jwt from "jsonwebtoken";
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      userId: string,
      auth0Id: string
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {authorization} = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new CustomError(401, "Unauthorized");
    }
    const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub as string;
    const user = await User.findOne({auth0Id});
    if (!user) {
      throw new CustomError(401, "Unauthorized");
    }
    req.auth0Id = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    next(error);
  }
}