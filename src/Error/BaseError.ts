import { Response } from 'express'

export default class BaseError extends Error {
  status: number

  constructor(message = 'Internal server error', status = 500) {
    super()
    this.message = message
    this.status = status
  }

  SendResponse(res: Response) {
    res.status(this.status).send({
      err: this.message,
      status: this.status,
    })
  }
}
