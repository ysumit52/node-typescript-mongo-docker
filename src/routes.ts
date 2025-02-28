import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../swagger-doc.json' with { type: 'json' };

import * as BookController from './controllers/book/index.js';
import * as UserController from './controllers/user/index.js';
import * as AuthController from './controllers/auth/index.js';

export const router = Router();

// Auth routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// Book routes
router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

// User routes
router.get('/user/all', UserController.all);

if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec));
}
