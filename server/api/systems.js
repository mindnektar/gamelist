import { Router } from 'express';
import { System } from '../models/system';

const router = new Router();

router.get('/systems', (request, response, next) => {
    System.find()
        .then(systems => response.send(systems))
        .catch(next);
});

export default router;
