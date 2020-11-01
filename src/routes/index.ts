// src/routes/index.ts
import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/users', (request: Request, response: Response) => {
    return response.json({ message: 'Hello GoStack' });
});

export default routes;
