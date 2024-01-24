// routes/userRoutes.ts
import { Router,Request,Response } from 'express';
import UserController from '../controllers/user.controller';

export function configureUserRoutes(router: Router): void {
    const controller:UserController = new UserController();
    router.get('/users',controller.getAllUsers);
    // router.post('/users', postUser);
    // router.put('/users/:id', updateUser);
    // router.delete('/users/:id', deleteUser);
}
