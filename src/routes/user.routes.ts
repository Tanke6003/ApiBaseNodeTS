// routes/userRoutes.ts
import { Router,Request,Response } from 'express';

export function configureUserRoutes(router: Router): void {
    router.get('/users', (req: Request, res: Response) => {
        res.json({ message: 'Dummy route - Get all users' });
    });
    // router.post('/users', postUser);
    // router.put('/users/:id', updateUser);
    // router.delete('/users/:id', deleteUser);
}
