import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { User } from '../../model/index.js'

export const getUserByEmail = async (email: string, includePassword = false) => {
  try {
    let user = User.findOne({ email })
    if (includePassword) {
      user = user.select('-password')
    }
    return await user.exec()
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
