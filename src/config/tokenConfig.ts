import { ITokenConfig } from './interfaces'

const { ACCESS_TOKEN_PRIVATE_KEY } = process.env

export const jwtConfig: ITokenConfig = {
  secretAccess: ACCESS_TOKEN_PRIVATE_KEY as string,

  tokens: {
    access: {
      type: 'access',
      expiresIn: '3d',
    },
  },
}
