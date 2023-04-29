import { Request, Response } from 'express'
import { ErrorEmailExist } from '../../errors/ErrorProcessing.js'
import { createHashPassport, generateTokens } from '../../helpers/index.js'
import { addToken } from '../../service/tokenService/index.js'
import { addNewUser, getUserByEmail } from '../../service/userService/index.js'

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  const candidate = await getUserByEmail(email.toLowerCase().trim())
  if (candidate) {
    throw new ErrorEmailExist()
  }

  const hasPassword = createHashPassport(password)

  const user = await addNewUser({ username, email: email.toLowerCase().trim(), password: hasPassword })

  const tokens = await generateTokens(user.email, user._id)
  await addToken({ accessToken: tokens.accessToken, owner: user._id })

  res.status(200).json({ message: 'Success', accessToken: `Bearer ${tokens.accessToken}` })
}
