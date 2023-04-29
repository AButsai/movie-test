import { Request, Response } from 'express'
import { ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { totalFilms } from '../../helpers/index.js'
import { addMovie as addMovieService } from '../../service/moviesService/index.js'
import { getUserByEmail } from '../../service/userService/index.js'

export const addMovie = async (req: Request, res: Response) => {
  const { title, director, releaseDate } = req.body
  const { email } = req.user

  const candidate = await getUserByEmail(email)
  if (!candidate) {
    throw new ErrorUnauthorized()
  }

  const movie = await addMovieService({ title, director, releaseDate, owner: candidate._id })
  const total = await totalFilms(candidate._id)

  res.status(200).json({ message: 'Success', data: { totalFilms: total, movie } })
}
