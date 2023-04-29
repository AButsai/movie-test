import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
dotenv.config()

import { TToken, TUser } from '../@types/types.js'
import { ErrorTokenTypeInvalid, ErrorUnauthorized, factoryErrorJWT } from '../errors/ErrorProcessing.js'
import { getUser } from '../servers/userService.js'

type TFuncToken = (req: Request, res: Response, next: NextFunction) => Promise<void>
type TDecodedToken = (token: string, secret: string, next: NextFunction) => Promise<TUser>

const { ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY } = process.env

const decodedToken: TDecodedToken = async (token, secret, next) => {
  try {
    const decoded = jwt.verify(token, secret) as TToken
    const user = await getUser(decoded.email)
    if (!user) {
      next(new ErrorUnauthorized())
    }
    return user
  } catch (error) {
    next(factoryErrorJWT(error))
  }
}

export const validationSuccessToken: TFuncToken = async (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization === null) {
    next(new ErrorUnauthorized())
    return
  }
  const [typeToken, token] = req.headers.authorization?.split(' ') as string[]
  if (typeToken.toLowerCase() !== 'bearer') {
    next(new ErrorTokenTypeInvalid(typeToken))
    return
  }

  const user = await decodedToken(token, ACCESS_TOKEN_PRIVATE_KEY as string, next)

  req.user = user
  next()
}

export const validationRefreshToken: TFuncToken = async (req, res, next) => {
  const { refreshToken } = req.cookies

  const user = await decodedToken(refreshToken, REFRESH_TOKEN_PRIVATE_KEY as string, next)

  req.user = user
  next()
}
