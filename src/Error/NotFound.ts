import BaseError from './BaseError'

export default class NotFound extends BaseError {
  constructor(message = 'Page not found') {
    super(message, 404)
  }
}
