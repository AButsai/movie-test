/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import { ErrorValidSchemaJoi } from '../errors/ErrorProcessing.js'

type TValidationBody = (req: Request, res: Response, next: NextFunction) => any

export const validationBody = (schema: any): TValidationBody => {
  const func: TValidationBody = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const valid = schema(req.body)
    if (valid.error) {
      next(new ErrorValidSchemaJoi(valid.error.message))
      return
    }
    next()
  }
  return func
}
