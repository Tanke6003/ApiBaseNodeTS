
import { Router } from 'express';
import { configureUserRoutes } from './user.routes';

const router = Router();

configureUserRoutes(router);

export { router as routes };
