import Joi from 'joi'
import { IUserLogin, IUserReg } from './interfaces.js'

export const joiSchemaRegister = (data: IUserReg) => {
  const schema = Joi.object<IUserReg>({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().label('Password'),
  })

  return schema.validate(data)
}

export const joiSchemaLogin = (data: IUserLogin) => {
  const schema = Joi.object<IUserLogin>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  return schema.validate(data)
}
