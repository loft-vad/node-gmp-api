import { NextFunction, Request, Response } from "express";
import { User, UserOuput } from "../types/user";
import ApiError from "../error/ApiError";
import Models from "../models/models";
import logger from "../utils/logger";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    function getAutoSuggestUsers(loginSubstring: string, limit: number, users: any[]) {
      let sortedUsers = users.sort((a, b) => (a.login > b.login ? 1 : b.login > a.login ? -1 : 0));
      sortedUsers = sortedUsers.filter(({ login }) => {
        return login.includes(loginSubstring);
      });
      return sortedUsers.slice(0, limit);
    }
    if (req.query.login && req.query.limit) {
      try {
        let limit = 0;
        let loginSubstring = "";

        if (req.query.limit) {
          limit = +req.query.limit;
        }

        if (req.query.login) {
          loginSubstring = req.query.login.toString();
          console.log("loginSubstring: ", loginSubstring);
        }

        if (limit < 1) {
          res.status(400).json({
            status: "failed",
            message: "Can't select less then 1 user",
          });
        }

        const users = await Models.User.findAll();

        return res.json(getAutoSuggestUsers(loginSubstring, limit, users));
      }
 catch (error) {
        next(ApiError.badRequest(error));
      }
    }
 else {
      const users = await Models.User.findAll();
      return res.json(users);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest("Id is not passed"));
    }
    const user = await Models.User.findOne({ where: { id } }); //, include: [{ model: Models.Group, as: "group" }]
    if (!user) {
      return next(ApiError.badRequest("User not found :("));
    }
    return res.json(user);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    logger.info(req);
    try {
      const { id, login, password, age, isDeleted } = req.body;
      const user = await Models.User.create({ id, login, password, age, isDeleted });
      return res.json(user);
    }
 catch (error) {
      next(ApiError.badRequest(error));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    logger.info(req);
    try {
      const { id, login, password, age, isDeleted } = req.body;
      const [result, user] = await Models.User.update(
        { id, login, password, age, isDeleted },
        {
          returning: true,
          where: {
            id,
          },
        },
      );
      if (!result) {
        return next(ApiError.badRequest("User not found, update is not possible :("));
      }
      return res.json(user);
    }
 catch (error) {
      next(ApiError.badRequest(error));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    logger.info(req);
    try {
      const { id } = req.body;
      const [result, user] = await Models.User.update(
        { isDeleted: true },
        {
          returning: true,
          where: {
            id,
          },
        },
      );
      if (!result) {
        return next(ApiError.badRequest("User not found, not possible to delete :("));
      }
      return res.json(user);
    }
 catch (error) {
      next(ApiError.badRequest(error));
    }
  }
}

export default new UserController();
