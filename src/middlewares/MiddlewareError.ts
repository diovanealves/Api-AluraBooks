import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'yup'
import mongoose from 'mongoose'
import BaseError from '../Error/BaseError'
import IncorrectRequest from '../Error/IncorrectRequest'
import ErrorValidation from '../Error/ErrorValidation'

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
  } else if (err instanceof BaseError) {
    err.SendResponse(res)
  } else {
    new BaseError().SendResponse(res)
  }
}
