import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Movie } from '../../model/index.js'

export const deleteMovieById = async (_id: string) => {
  try {
    return await Movie.findOneAndDelete({ _id })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
