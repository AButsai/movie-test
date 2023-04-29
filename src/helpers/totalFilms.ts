import { getAllMovies } from '../service/moviesService/index.js'

export const totalFilms = async (owner: string) => {
  const allFilms = await getAllMovies(owner, 0, Number.MAX_SAFE_INTEGER)
  return allFilms.length
}
