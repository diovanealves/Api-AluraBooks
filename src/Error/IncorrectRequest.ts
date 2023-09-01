import BaseError from './BaseError'

export default class IncorrectRequest extends BaseError {
  constructor(
    message = 'One or more of the provided data is incorrect',
    status = 400,
  ) {
    super(message, status)
  }
}
