import { Router } from 'express';
import { getMovie } from '../controllers/moviesGET.js';
import { addMovieToPersonalList } from '../controllers/moviesPOST.js';

const router = Router();

router.get('/getmovie/:t', getMovie);
router.post('/addmovietolist', addMovieToPersonalList);

export { router };
