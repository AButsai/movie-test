import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { ErrorTokenTypeInvalid, ErrorUnauthorized, factoryErrorJWT } from '../errors/ErrorProcessing.js'
import { getUserByEmail } from '../servers/userService/getUserByEmail.js'

type TFuncToken = (req: Request, res: Response, next: NextFunction) => Promise<void>
type TDecodedToken = (token: string, secret: string, next: NextFunction) => Promise<any>

const { ACCESS_TOKEN_PRIVATE_KEY } = process.env

const decodedToken: TDecodedToken = async (token, secret, next) => {
  try {
    const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload
    const user = await getUserByEmail(decoded.email)
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
