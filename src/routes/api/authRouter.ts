import express from 'express'

import { currentUser, login, logout, register } from '../../controllers/authController/index.js'
import { controllerWrapper, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { IUserLogin, IUserReg } from '../../validation/joiSchemas/interfaces.js'
import { joiSchemaLogin, joiSchemaRegister } from '../../validation/joiSchemas/joiSchemas.js'

const authRouter = express.Router()

authRouter.post('/register', validationBody<IUserReg>(joiSchemaRegister), controllerWrapper(register))

authRouter.post('/login', validationBody<IUserLogin>(joiSchemaLogin), controllerWrapper(login))

authRouter.get('/logout', validationSuccessToken, controllerWrapper(logout))

authRouter.get('/current', validationSuccessToken, controllerWrapper(currentUser))

export default authRouter
