import express from 'express'
import mongoose from 'mongoose'
import config from './utils/config.js'
import {
  requestLogger,
  unknownEndpoint,
  errorHandler
} from './utils/middleware.js'
import userRouter from './controllers/userRouter.js'
import cors from 'cors'
import loginRouter from './controllers/loginRouter.js'

mongoose.set('strictQuery',false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('conneted to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB: ',error.message)
  })


const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app