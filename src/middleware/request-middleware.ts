import {
  RequestHandler, Request, Response, NextFunction
} from 'express';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import { BadRequest, UnauthorizedRequest } from '../errors/index.js';
import { logger } from '../logger.js';

const getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
  if (!error.details && error.message) {
    return error.message;
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined;
};

interface HandlerOptions {
  validation?: {
    body?: Joi.ObjectSchema
  },
  skipJwtAuth?: boolean
};

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 */
export const relogRequestHandler =
  (handler: RequestHandler, options?: HandlerOptions): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log({ level: 'info', message: req.url });

      if (!options?.skipJwtAuth) {
        const token = req.headers['authorization'];

        if (!token) {
          logger.log({ level: 'info', message: 'Auth token is not supplied' });
          return next(new UnauthorizedRequest('Auth token is not supplied'));
        }

        const secret = process.env.SECRET;
        if (!secret) {
          return next(new Error('SECRET environment variable is missing'));
        }

        await new Promise((resolve, reject) => {
          jwt.verify(token.replace(/^Bearer\s+/i, ''), secret, (err, decoded) => {
            if (err) {
              logger.log({ level: 'info', message: 'Token Validation Failed' });
              return reject(new UnauthorizedRequest());
            }
            resolve(decoded);
          });
        });
      }

      if (options?.validation?.body?.validate) {
        const { error } = options.validation.body.validate(req.body);
        if (error) {
          return next(new BadRequest(getMessageFromJoiError(error)));
        }
      }

      return Promise.resolve(handler(req, res, next)).catch((err: Error) => {
        if (process.env.NODE_ENV === 'development') {
          logger.log({ level: 'error', message: 'Error in request handler', error: err });
        }
        next(err);
      });
    } catch (error) {
      next(error);
    }
  };
