import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Token } from '../../model/index.js'

export const getTokenByOwner = async (owner: string) => {
  try {
    const token = await Token.findOne({ owner })
    return token?.accessToken
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
