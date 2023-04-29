import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { User } from '../../model/index.js'

export interface IUser {
  username: string
  email: string
  password: string
}

export const addNewUser = async (body: IUser) => {
  try {
    const newUser = new User(body)
    newUser.save()
    return newUser
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
