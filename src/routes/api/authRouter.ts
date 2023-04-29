import express from 'express'

import { login, logout, refreshToken, registration } from '../../controllers/auth.js'
import { resendingEmail, verifyEmail } from '../../controllers/email.js'
import { changePassword, changePasswordVerify, changeRequestPassword } from '../../controllers/forgotPassword.js'
import { controllerWrapper } from '../../middleware/controllerWrapper.js'
import { validationBody } from '../../middleware/validationBody.js'
import { validationRefreshToken, validationSuccessToken } from '../../middleware/validationJWT.js'
import {
  joiSchemaChangePassword,
  joiSchemaLogin,
  joiSchemaPasswordVerify,
  joiSchemaRegister,
  joiSchemaRequestPassword,
} from '../../validations/joiSchemas/joiSchemas.js'

const authRouter = express.Router()

authRouter.post('/registration', validationBody(joiSchemaRegister), controllerWrapper(registration))

authRouter.post('/login', validationBody(joiSchemaLogin), controllerWrapper(login))

authRouter.get('/logout', validationSuccessToken, controllerWrapper(logout))

authRouter.get('/refresh-token', validationRefreshToken, controllerWrapper(refreshToken))

authRouter.get('/request-password', validationBody(joiSchemaRequestPassword), controllerWrapper(changeRequestPassword))

authRouter.post(
  '/verify-password',
  validationRefreshToken,
  validationBody(joiSchemaPasswordVerify),
  controllerWrapper(changePasswordVerify),
)

authRouter.patch(
  '/change-password',
  validationRefreshToken,
  validationBody(joiSchemaChangePassword),
  controllerWrapper(changePassword),
)

authRouter.post('/verify-email', controllerWrapper(verifyEmail))

authRouter.post('/resend-email', controllerWrapper(resendingEmail))

export default authRouter
