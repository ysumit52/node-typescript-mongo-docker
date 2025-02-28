import { ApplicationError } from './application-error.js';

export class BadRequest extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Bad request', 400);
  }
}
