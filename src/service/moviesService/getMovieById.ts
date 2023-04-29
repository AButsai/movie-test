import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Movie } from '../../model/index.js'

export const getMovieById = async (_id: string) => {
  try {
    return await Movie.findById({ _id })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
