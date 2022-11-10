import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator
} from 'express-joi-validation'

// const validator = createValidator()

// const querySchema = Joi.object({
//   name: Joi.string().required()
// })

// interface HelloRequestSchema extends ValidatedRequestSchema {
//   [ContainerTypes.Query]: {
//     name: string
//   }
// }

// app.get(
//   '/hello',
//   validator.query(querySchema),
//   (req: ValidatedRequest<HelloRequestSchema>, res) => {
//     // Woohoo, type safety and intellisense for req.query!
//     res.end(`Hello ${req.query.name}!`)
//   }
// )


function errorResponse(schemaErrors: any) {
  const errors = schemaErrors.map((error: any) => {
    let {path, message } = error;
    return { path, message};
  });
  return {
    status: 'failed',
    errors,
  }
}

function validateSchema(schema: any) {
  console.log('schema: ', schema);
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });
    console.log(error)
    if(error.isJoi) {
      res.status(400).json(errorResponse(error.details))
    } else {
      next();
    }
  }
}

// const validate = (schema) => (req: Request, res: Response, next: NextFunction) => {

// }

export default validateSchema;