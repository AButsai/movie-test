import { Request, Response } from 'express'
import { ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { updateToken } from '../../service/tokenService/index.js'
import { getUserByEmail } from '../../service/userService/index.js'

export const logout = async (req: Request, res: Response) => {
  const { email } = req.user

  const candidate = await getUserByEmail(email.toLowerCase().trim())
  if (!candidate) {
    throw new ErrorUnauthorized()
  }

  await updateToken(candidate._id, null)

  res.status(204).json({ message: 'Disconnect...' })
}
