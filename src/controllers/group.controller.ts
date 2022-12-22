import { NextFunction, Request, Response } from "express";
import Models from "../models/models";
import ApiError from "../error/ApiError";

class GroupController {
  async getAll(req: Request, res: Response) {
    console.log(req);
    const groups = await Models.Group.findAll();
    return res.json(groups);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const group = await Models.Group.create({ name });
      return res.json(group);
    }
 catch (error: any) {
      next(ApiError.badRequest(error.message));
    }
  }
  // async addUsersToGroup(groupId, userIds) {

  // }
}

export default new GroupController();
