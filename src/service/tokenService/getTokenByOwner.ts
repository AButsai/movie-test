import { Token } from '../../model/index.js'

export const getTokenByOwner = async (owner: string) => {
  const token = await Token.findOne({ owner })
  return token?.accessToken
}
