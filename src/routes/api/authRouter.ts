import express from 'express'

import { login, logout, register, currentUser } from '../../controllers/authController/index.js'
import { controllerWrapper, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { joiSchemaLogin, joiSchemaRegister } from '../../validation/joiSchemas/joiSchemas.js'

const authRouter = express.Router()

authRouter.post('/register', validationBody(joiSchemaRegister), controllerWrapper(register))

authRouter.post('/login', validationBody(joiSchemaLogin), controllerWrapper(login))

authRouter.get('/logout', validationSuccessToken, controllerWrapper(logout))

authRouter.get('/current', validationSuccessToken, controllerWrapper(currentUser))

export default authRouter
