import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError";
import Models from "../models/models";
import { User, UserInput, UserOuput } from "../types/user";

const secret = process.env.SECRET_KEY || "";

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const { login, password } = req.body;
  if (!login || !password) {
    return next(ApiError.forbidden("Username & password are mandatory"));
  }
  const user: any = await Models.User.findOne({ where: { login } });
  if (!user || user.password !== password) {
    return next(ApiError.forbidden("Username or password is incorrect"));
  }
 else {
    const payload = { sub: user.id, isDeleted: user.isDeleted };
    const token = jwt.sign(payload, secret, { expiresIn: "72h" });
    return res.json({ token });
  }
}

export default authenticate;
