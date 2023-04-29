import { ErrorDataBase } from '../../errors/ErrorProcessing.js'
import { Movie } from '../../model/index.js'

interface IUpdateMovieById {
  title?: string
  director?: string
  releaseDate?: string
}

export const updateMovieById = async (_id: string, body: IUpdateMovieById) => {
  try {
    return await Movie.findByIdAndUpdate({ _id }, body, { new: true })
  } catch (error) {
    throw new ErrorDataBase(error)
  }
}
