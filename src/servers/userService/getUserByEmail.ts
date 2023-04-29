import { User } from '../../model/index.js'

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email }, { password: 0 })
}
