import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Token } from '../../model/index.js'

interface ITokenBody {
  accessToken: string
  owner: string
}

export const addToken = async (body: ITokenBody) => {
  try {
    return await Token.create({ ...body })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
