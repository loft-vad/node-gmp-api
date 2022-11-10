import { Express, Request, Response } from 'express'
import validateSchema from './middleware/validateSchema'
import { userSchema } from './schemas/user.schema'
import { User } from './types/user';
import logger from './utils/logger'
import bodyParser from 'body-parser'


  // function getAutoSuggestUsers(loginSubstring, limit) {

  // }

// create application/json parser
var jsonParser = bodyParser.json()

let users: User[] = [];

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  app.get('/api/user/:id', (req: Request, res: Response) => {
    logger.info(req.params.id);
    console.log(users);
    let user = users.filter((item) => item.id === req.params.id)
    res.json(user)
  }) //get user by id; //validateSchema(userSchema), 
  
  app.post('/api/user/', jsonParser, (req: Request, res: Response) => {
    logger.info(req);
    users.push(req.body)
    res.json({user: req.body})
  }) //create 

  app.patch('/api/user/:id') // and update user; 
  app.get('/api/user/?login=asdasd&limit=5')// get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstringin the login property:getAutoSuggestUsers(loginSubstring, limit)
  app.delete('/api/user/:id') //remove user (soft delete–user gets marked with isDeletedflag, but not removed from the collection).
}

// Add server-side validation for create/update operations of Userentity:
// +•all fields are required;
// +•login validation is required;
// +•password must contain letters and numbers;
// +•user’s age must be between 4 and 130.

// In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message.

export default routes;