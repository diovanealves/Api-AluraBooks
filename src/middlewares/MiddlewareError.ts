import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'yup'
import mongoose from 'mongoose'
import BaseError from '../Error/BaseError'
import IncorrectRequest from '../Error/IncorrectRequest'
import ErrorValidation from '../Error/ErrorValidation'
import NotFound from '../Error/NotFound'

export default function MiddlewareError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof mongoose.Error.CastError) {
    new IncorrectRequest().SendResponse(res)
  } else if (err instanceof ValidationError) {
    new ErrorValidation(err).SendResponse(res)
  } else if (err instanceof NotFound) {
    err.SendResponse(res)
  } else {
    new BaseError().SendResponse(res)
  }
}
