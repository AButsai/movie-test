import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'

import { jwtConfig } from '../config/tokenConfig.js'
import { TToken, TTokensObj } from '../@types/types.js'
const { secretAccess, secretRefresh, tokens } = jwtConfig

const generateAccessToken = async (body: TToken): Promise<string> => {
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

const generateRefreshToken = async (body: TToken): Promise<string> => {
  const { email, id } = body
  const payload = {
    email: email.trim().toLowerCase(),
    userId: id,
    id: v4(),
    type: tokens.refresh.type,
  }
  const signInOptions: jwt.SignOptions = {
    expiresIn: tokens.refresh.expiresIn,
  }

  return jwt.sign(payload, secretRefresh, signInOptions)
}

export const generateTokens = async (email: string, id: string): Promise<TTokensObj> => {
  const accessToken = await generateAccessToken({ email, id })
  const refreshToken = await generateRefreshToken({ email, id })

  return {
    accessToken,
    refreshToken,
  }
}
