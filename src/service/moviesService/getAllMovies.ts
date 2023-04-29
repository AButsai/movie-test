import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Movie } from '../../model/index.js'

export const getAllMovies = async (owner: string, skip: number, limit: number) => {
  try {
    return await Movie.find({ owner }, '', { skip, limit })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
