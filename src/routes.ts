import { Express, Request, Response } from 'express'
import validateSchema from './middleware/validateSchema'
import { userSchema } from './schemas/user.schema'
import { User } from './types/user';
import logger from './utils/logger'
import bodyParser from 'body-parser'

function getAutoSuggestUsers(loginSubstring: string, limit: number) {
  const sortedUsers = users;
  sortedUsers.sort((a, b) => (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0))
  return sortedUsers.slice(0, limit)
}

// create application/json parser
var jsonParser = bodyParser.json()

let users: User[] = [];

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  // get user by id
  app.get('/api/user/:id', (req: Request, res: Response) => {
    logger.info(req.params.id);
    let user = users.filter((item) => item.id === req.params.id)
    res.json(user)
  })
  
  // create User
  app.post('/api/user/', jsonParser, validateSchema(userSchema), (req: Request, res: Response) => {
    logger.info(req);
    users.push(req.body)
    res.json({user: req.body})
  })

  // update User
  app.put('/api/user/', jsonParser, validateSchema(userSchema), (req: Request, res: Response) => {
    logger.info(req);
    const user = users.find((item) => item.id === req.body.id);
    if (!user) res.status(404).json({
      status: 'failed',
      message: `User ${req.body.id} doesn't exist`
    })
    users.forEach((item) => {
      if (item.id === req.body.id) {
        item.age = req.body.age
        item.login = req.body.login
        item.password = req.body.password
      }
    })
    res.json({updatedUser: req.body})
  })

  // get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstringin the login property:getAutoSuggestUsers(loginSubstring, limit)
  app.get('/api/user/', (req: Request, res: Response) => {
    console.log('login: ' + req.query.login, 'limit: ' + req.query.limit)
    
    let limit: number = 0;
    let login: string = '';

    if (req.query.limit) {
      limit = +req.query.limit;
    }

    if (req.query.login) {
      login = req.query.login.toString();
    }

    if (limit < 1) res.status(400).json({
      status: 'failed',
      message: "Can't select less then 1 user"
    })

    res.json(getAutoSuggestUsers(login, limit));
  })

  // remove user (soft delete–user gets marked with isDeletedflag, but not removed from the collection).
  app.delete('/api/user/', jsonParser, (req: Request, res: Response) => {
    logger.info(req);
    const user = users.find((item) => item.id === req.body.id);
    if (!user) res.status(404).json({
      status: 'failed',
      message: `User ${req.body.id} doesn't exist`
    })
    users.forEach((item) => {
      if (item.id === req.body.id) {
        item.isDeleted = true
      }
    })
    res.json({deletedUser: req.body})
  })
}

export default routes;