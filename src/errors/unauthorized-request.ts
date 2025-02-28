import { ApplicationError } from './application-error.js';

export class UnauthorizedRequest extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Unauthorized', 401);
  }
}
