import express from 'express'
import logger from "./utils/logger"
import routes from './routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3333, ()=> {
  logger.info('app is running')
  routes(app)
}).on('error', err => {
  logger.error(err);
  process.exit(1);
});