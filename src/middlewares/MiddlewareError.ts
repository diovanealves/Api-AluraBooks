import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'yup'
import mongoose from 'mongoose'

export default function MiddlewareError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      err: 'One or more of the provided data is incorrect',
    })
  } else if (err instanceof ValidationError) {
    return res.status(400).json({
      err: err.errors,
    })
  }
  return res.status(500).json({ err: 'Internal server error' })
}
