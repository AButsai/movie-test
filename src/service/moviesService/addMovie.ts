import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Movie } from '../../model/index.js'

interface IMovieBody {
  title: string
  director: string
  releaseDate: string
  owner: string
}

export const addMovie = async (body: IMovieBody) => {
  try {
    return await Movie.create({ ...body })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
