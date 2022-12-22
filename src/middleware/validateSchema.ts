import { NextFunction, Request, Response } from "express";

function errorResponse(schemaErrors: any) {
  const errors = schemaErrors.map((error: any) => {
    const { path, message } = error;
    return { path, message };
  });
  return {
    status: "failed",
    errors,
  };
}

function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error) {
      res.status(400).json(errorResponse(error.details));
    }
 else {
      next();
    }
  };
}

export default validateSchema;
