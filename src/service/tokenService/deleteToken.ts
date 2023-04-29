import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Token } from '../../model/index.js'

export const deleteToken = async (owner: string) => {
  try {
    return await Token.deleteOne({ owner })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
