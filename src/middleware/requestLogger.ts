import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

async function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info("Method: " + req.method + " " + req.url);
  next();
}

export default requestLogger;
