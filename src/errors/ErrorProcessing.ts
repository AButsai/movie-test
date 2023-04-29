/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'

export class RequestError extends Error {
  constructor(public status: number, public message: string) {
    super(message)
    this.status = status
  }
}

export class ErrorBadRequest extends RequestError {
  constructor(public message = 'Bad request') {
    super(400, `Bad request:: ${message}`)
  }
}

export class ErrorVerificationCodePassed extends ErrorBadRequest {
  constructor() {
    super('Verification has already been passed')
  }
}

export class ErrorEmailNotValid extends ErrorBadRequest {
  constructor() {
    super('Email not valid')
  }
}

export class ErrorValidSchemaJoi extends ErrorBadRequest {
  constructor(public message: string) {
    super(message)
  }
}

export class ErrorUnauthorized extends RequestError {
  constructor(public message = 'Not authorized') {
    super(401, `Unauthorized error:: ${message}`)
  }
}

export class ErrorLogin extends ErrorUnauthorized {
  constructor() {
    super('Email is wrong, or password is wrong')
  }
}

export class ErrorTokenTypeInvalid extends ErrorUnauthorized {
  constructor(public typeToken: string) {
    super(`Token type is not valid ${typeToken}`)
  }
}

export class ErrorEmailNotVerified extends ErrorUnauthorized {
  constructor() {
    super('Email is not verify')
  }
}

export class ErrorJWT extends ErrorUnauthorized {}

export function factoryErrorJWT(e: any) {
  if (e instanceof jwt.TokenExpiredError) {
    return new ErrorJWT('JWT Expired')
  }

  if (e instanceof jwt.JsonWebTokenError) {
    return new ErrorJWT('Invalid Signature')
  }

  if (e instanceof jwt.NotBeforeError) {
    return new ErrorJWT('JWT Not Active')
  }

  throw new Error('Unknown JWT Error')
}

export class ErrorNotFound extends RequestError {
  constructor(public message = 'Not found') {
    super(404, `Not Found Error:: ${message}`)
  }
}

export class ErrorConflict extends RequestError {
  constructor(public message = 'Conflict') {
    super(409, `Conflict error:: ${message}`)
  }
}

export class ErrorEmailExist extends ErrorConflict {
  constructor() {
    super('User with this email already exists!')
  }
}
