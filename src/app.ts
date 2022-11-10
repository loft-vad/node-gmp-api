import express from 'express'
import logger from "./utils/logger"
import routes from './routes'

const app = express()

app.listen(3333, ()=> {
  logger.info('app is running')

  routes(app)
})