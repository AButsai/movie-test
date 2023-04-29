import jwt from 'jsonwebtoken'

import { jwtConfig } from '../config/tokenConfig.js'
import { ITokenBody } from './interfaces.js'
const { secretAccess, tokens } = jwtConfig

const generateAccessToken = async (body: ITokenBody) => {
  const { email, id } = body
  const payload = {
    email: email.trim().toLowerCase(),
    userId: id,
    type: tokens.access.type,
  }
  const signInOptions: jwt.SignOptions = {
    expiresIn: tokens.access.expiresIn,
  }

  return jwt.sign(payload, secretAccess, signInOptions)
}

export const generateTokens = async (email: string, id: string) => {
  const accessToken = await generateAccessToken({ email, id })

  return {
    accessToken,
  }
}
