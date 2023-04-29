import { Token } from '../../model/tokenSchema.js'

interface IToken {
  accessToken: string
  id: string
}

export const addToken = async (body: IToken) => {
  const { accessToken, id } = body
  return await Token.create({ accessToken, owner: id })
}
