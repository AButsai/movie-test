import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Token } from '../../model/index.js'

export const updateToken = async (owner: string, accessToken: string | null) => {
  try {
    await Token.updateOne({ owner }, { accessToken })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
