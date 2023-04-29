import { Request, Response } from 'express'
import { ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { totalFilms } from '../../helpers/index.js'
import { getAllMovies as getAll } from '../../service/moviesService/index.js'
import { getUserByEmail } from '../../service/userService/index.js'

export const getAllMovies = async (req: Request, res: Response) => {
  const { email } = req.user

  let page = parseInt(req.query.page as string, 10)
  let limit = parseInt(req.query.limit as string, 10)

  if (isNaN(page) || page === undefined || isNaN(limit) || limit === undefined) {
    page = 0
    limit = 5
  }

  const skip = page * limit

  const candidate = await getUserByEmail(email)
  if (!candidate) {
    throw new ErrorUnauthorized()
  }

  const movies = await getAll(candidate._id, skip, limit)
  const total = await totalFilms(candidate._id)

  if (movies.length === 0) {
    return res.status(200).json({ data: { totalFilms: total, movies, message: "You don't have more movies" } })
  }
  res.status(200).json({ data: { totalFilms: total, movies } })
}
