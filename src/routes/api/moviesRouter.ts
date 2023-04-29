import express from 'express'

import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from '../../controllers/moviesController/index.js'
import { controllerWrapper, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { joiSchemaAddMovie } from '../../validation/joiSchemas/joiSchemas.js'

const movieRouter = express.Router()

movieRouter.use(validationSuccessToken)

movieRouter.post('/add-movie', validationBody(joiSchemaAddMovie), controllerWrapper(addMovie))

movieRouter.get('/get-movie/:movieId', controllerWrapper(getMovie))

movieRouter.delete('/delete-movie/:movieId', controllerWrapper(deleteMovie))

movieRouter.patch(
  '/update-movie/:movieId',

  validationBody(joiSchemaAddMovie),
  controllerWrapper(updateMovie),
)

movieRouter.get('/all-movies', controllerWrapper(getAllMovies))

export default movieRouter
