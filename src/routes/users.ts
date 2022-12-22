import { Router } from "express";
import middlewares from "../middleware/index";

import { userSchema } from "../schemas/user.schema";
import { User } from "../types/user";
import logger from "../utils/logger";
import bodyParser from "body-parser";
import ApiError from "../error/ApiError";
import UserController from "../controllers/user.controller";

const router = Router();

// get all users
// get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstringin the login property:getAutoSuggestUsers(loginSubstring, limit)
router.get("/", UserController.getAll);

// get user by id
router.get("/:id", UserController.getById);

// create user
router.post("/", middlewares.validateSchema(userSchema), UserController.create);

// update User
router.put("/", middlewares.validateSchema(userSchema), UserController.update);

// remove user (soft delete–user gets marked with isDeleted flag, but not removed from the collection).
router.delete("/", UserController.delete);

export default router;
