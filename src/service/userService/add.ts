import { User } from '../../model/index.js'

export interface IUser {
  username: string
  email: string
  password: string
}

export const addNewUser = async (body: IUser) => {
  const newUser = new User(body)
  newUser.save()
  return newUser
}
