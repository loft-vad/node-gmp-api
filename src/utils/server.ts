import express from "express";

import routes from "../routes";

import cors from "cors";
import middlewares from "../middleware/index";
import ApiError from "../error/ApiError";

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(middlewares.requestLogger);

  app.use("/api", routes); //middlewares.checkToken,
  app.post("/login", middlewares.authenticate);

  app.use(middlewares.errorHandling);

  app.all("*", (req, res, next) => {
    next(ApiError.badRequest("404"));
  });

  return app;
}

export default createServer;
