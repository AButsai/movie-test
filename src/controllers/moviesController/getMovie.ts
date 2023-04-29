import { Request, Response } from 'express'
import { ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { totalFilms } from '../../helpers/index.js'
import { getMovieById } from '../../service/moviesService/index.js'
import { getUserByEmail } from '../../service/userService/index.js'

export const getMovie = async (req: Request, res: Response) => {
  const { email } = req.user
  const { movieId } = req.params

  const candidate = await getUserByEmail(email)
  if (!candidate) {
    throw new ErrorUnauthorized()
  }

  const movie = await getMovieById(movieId)
  const total = await totalFilms(candidate._id)

  res.status(200).json({ data: { totalFilms: total, movie } })
}
