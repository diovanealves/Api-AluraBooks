import { NextFunction, Request, Response } from 'express'
import NotFound from '../Error/NotFound'

export default function MiddlewareNotFound(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const err404 = new NotFound()
  next(err404)
}
