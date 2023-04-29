import { Request, Response } from 'express'
import { ErrorLogin } from '../../errors/ErrorProcessing.js'
import { comparePassword, generateTokens } from '../../helpers/index.js'
import { updateToken } from '../../service/tokenService/index.js'
import { getUserByEmail } from '../../service/userService/index.js'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const candidate = await getUserByEmail(email.toLowerCase().trim())
  if (!candidate || !comparePassword(password, candidate?.password)) {
    throw new ErrorLogin()
  }

  const tokens = await generateTokens(candidate.email, candidate._id)

  await updateToken(candidate._id, tokens.accessToken)

  res.status(200).json({ message: 'Success', accessToken: `Bearer ${tokens.accessToken}` })
}
