import express from 'express'

import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from '../../controllers/moviesController/index.js'
import { controllerWrapper, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { joiSchemaAddMovie } from '../../validation/joiSchemas/joiSchemas.js'

const movieRouter = express.Router()

movieRouter.use(validationSuccessToken)

movieRouter.post('/movies', validationBody(joiSchemaAddMovie), controllerWrapper(addMovie))

movieRouter.get('/movies', controllerWrapper(getAllMovies))

movieRouter.get('/movies/:movieId', controllerWrapper(getMovie))

movieRouter.patch('/movies/:movieId', validationBody(joiSchemaAddMovie), controllerWrapper(updateMovie))

movieRouter.delete('/movies/:movieId', controllerWrapper(deleteMovie))

export default movieRouter
