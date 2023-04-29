import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import authRouter from './routes/api/authRouter.js'
import movieRouter from './routes/api/moviesRouter.js'

import { RequestError } from './errors/ErrorProcessing.js'
import { limiter } from './helpers/rateLimit.js'
import { TError } from './types.js'

dotenv.config()
const app: Express = express()

const { PORT = 3001, DB_HOST } = process.env

app.use(cors())
app.use(express.json())
app.use(limiter)
app.use('/api/auth', authRouter)
app.use('/api/movies', movieRouter)

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: TError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof RequestError) {
    const { status, message } = err
    return res.status(status).json({ message })
  }
  console.log('err', err)
  res.status(500).json({ message: 'Server error' })
})

const connection = mongoose.connect(DB_HOST as string)

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => console.log(`Server not running. Error message: ${err.message}`))
