import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import path from 'path'

import authRouter from './routes/api/authRouter.js'
import userRouter from './routes/api/userRouter.js'
import wordRouter from './routes/api/wordRouter.js'

import { PrismaClient } from '@prisma/client'
import { TError } from './@types/types.js'
import { RequestError } from './errors/ErrorProcessing.js'
import { limiter } from './middleware/rateLimit.js'

dotenv.config()

const { PORT = 3001 } = process.env
const app: Express = express()
export const prisma = new PrismaClient()

prisma.$connect()

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(limiter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/words', wordRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('<p>Base URL: https://learningapi-1-j8777224.deta.app/ </p>')
})

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

app.listen(PORT, () => {
  console.info(`[server]: Server is running at ${PORT}`)
})
