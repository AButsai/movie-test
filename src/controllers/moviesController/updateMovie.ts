import { Request, Response } from 'express'
import { ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { totalFilms } from '../../helpers/index.js'
import { updateMovieById } from '../../service/moviesService/index.js'
import { getUserByEmail } from '../../service/userService/index.js'

export const updateMovie = async (req: Request, res: Response) => {
  const { title, director, releaseDate } = req.body
  const { email } = req.user
  const { movieId } = req.params

  const candidate = await getUserByEmail(email)
  if (!candidate) {
    throw new ErrorUnauthorized()
  }

  const movie = await updateMovieById(movieId, { title, director, releaseDate })
  const total = await totalFilms(candidate._id)

  res.status(200).json({ data: { totalFilms: total, movie } })
}
