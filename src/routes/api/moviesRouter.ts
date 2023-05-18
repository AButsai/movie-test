import express from 'express'

import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from '../../controllers/moviesController/index.js'
import { controllerWrapper, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { joiSchemaAddMovie } from '../../validation/joiSchemas/joiSchemas.js'

const movieRouter = express.Router()

movieRouter.use(validationSuccessToken)

movieRouter.post('', validationBody(joiSchemaAddMovie), controllerWrapper(addMovie))

movieRouter.get('', controllerWrapper(getAllMovies))

movieRouter.get('/:movieId', controllerWrapper(getMovie))

movieRouter.patch('/:movieId', validationBody(joiSchemaAddMovie), controllerWrapper(updateMovie))

movieRouter.delete('/:movieId', controllerWrapper(deleteMovie))

export default movieRouter
