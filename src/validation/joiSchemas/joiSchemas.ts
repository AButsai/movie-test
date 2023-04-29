import Joi from 'joi'
import { IAddMovie, IUserLogin, IUserReg } from './interfaces.js'

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

export const joiSchemaAddMovie = (data: IAddMovie) => {
  const schema = Joi.object<IAddMovie>({
    title: Joi.string().required(),
    director: Joi.string().required(),
    releaseDate: Joi.string()
      .pattern(/^\d{2}-\d{2}-\d{4}$/)
      .required()
      .custom((value, helpers) => {
        const currentDate = new Date().getTime()

        const dataPars = value.split('-')
        const day = parseInt(dataPars[0], 10)
        const month = parseInt(dataPars[1], 10) - 1
        const year = parseInt(dataPars[2], 10)

        const selectedDate = new Date(year, month, day).getTime()

        if (selectedDate > currentDate) {
          return helpers.error('any.invalid')
        }

        return value
      }, 'Custom Date Validation')
      .messages({
        'string.pattern.base': 'The date format must be DD-MM-YYYY',
        'any.required': 'The "date" field is required',
        'any.invalid': 'The date cannot be greater than the current date',
      }),
  })

  return schema.validate(data)
}
