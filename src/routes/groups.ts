import { Request, Response, Router } from "express";

import groupController from "../controllers/group.controller";

const router = Router();

router.get("/", groupController.getAll);
router.post("/", groupController.create);

export default router;
