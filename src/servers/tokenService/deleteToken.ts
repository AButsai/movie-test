import { Token } from '../../model/index.js'

export const deleteToken = async (owner: string) => {
  return await Token.deleteOne({ owner })
}
