import express from 'express'

import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from '../../controllers/moviesController/index.js'
import { controllerWrapper, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { IAddMovie } from '../../validation/joiSchemas/interfaces.js'
import { joiSchemaAddMovie } from '../../validation/joiSchemas/joiSchemas.js'

const movieRouter = express.Router()

movieRouter.use(validationSuccessToken)

movieRouter.post('/', validationBody<IAddMovie>(joiSchemaAddMovie), controllerWrapper(addMovie))

movieRouter.get('/', controllerWrapper(getAllMovies))

movieRouter.get('/:movieId', controllerWrapper(getMovie))

movieRouter.patch('/:movieId', validationBody<IAddMovie>(joiSchemaAddMovie), controllerWrapper(updateMovie))

movieRouter.delete('/:movieId', controllerWrapper(deleteMovie))

export default movieRouter
