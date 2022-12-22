import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError";
import logger from "../utils/logger";

const secret = process.env.SECRET_KEY || "";

function checkToken(req: Request, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") return next();

  const token = req.headers["x-access-token"] + "" || "";

  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      logger.info(decoded);
      if (error) return next(ApiError.forbidden("Invalid token"));
      return next();
    });
  }
 else {
    return next(ApiError.unauthorized("Unauthorized access"));
  }
}

export default checkToken;
