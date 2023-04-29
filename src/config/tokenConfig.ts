// import dotenv from 'dotenv'
import { ITokenConfig } from './interfaces'
// dotenv.config()

const { ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY } = process.env

export const jwtConfig: ITokenConfig = {
  secretAccess: ACCESS_TOKEN_PRIVATE_KEY as string,
  secretRefresh: REFRESH_TOKEN_PRIVATE_KEY as string,
  tokens: {
    access: {
      type: 'access',
      expiresIn: '3d',
    },
    refresh: {
      type: 'refresh',
      expiresIn: '30d',
    },
  },
}
