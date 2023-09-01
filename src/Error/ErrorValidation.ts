import IncorrectRequest from './IncorrectRequest'

export default class ErrorValidation extends IncorrectRequest {
  constructor(message: any) {
    super(message.errors, 404)
  }
}
