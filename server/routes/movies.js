import { Router } from 'express';
import { getMovie } from '../controllers/moviesGET.js';

const router = Router();

router.get('/getmovie/:t', getMovie);

export { router };
