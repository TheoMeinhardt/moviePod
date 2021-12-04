import { Router } from 'express';
import { getMovie } from '../controllers/movies.js';

const router = Router();

router.get('/getmovie/:t', getMovie);

export { router };
