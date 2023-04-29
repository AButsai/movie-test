import { Request, Response } from 'express'
import { ErrorNotFound, ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { getTokenByOwner } from '../../service/tokenService/index.js'
import { getUserByEmail } from '../../service/userService/index.js'

export const currentUser = async (req: Request, res: Response) => {
  const { email } = req.user

  const candidate = await getUserByEmail(email.toLowerCase().trim(), true)
  const accessToken = await getTokenByOwner(candidate?._id)
  if (!candidate) {
    throw new ErrorNotFound()
  }

  if (!accessToken) {
    throw new ErrorUnauthorized()
  }

  res.status(200).json({ data: { accessToken: `Bearer ${accessToken}`, user: candidate } })
}
