import { Router } from 'express';
import { getMovie, getPersonalMovieList } from '../controllers/moviesGET.js';
import { addMovieToPersonalList } from '../controllers/moviesPOST.js';
import { deleteMovieFromPersonalList } from '../controllers/moviesDELETE.js';

const router = Router();

router.get('/getmovie/:t', getMovie);
router.get('/getpersonalmovielist/:username', getPersonalMovieList);
router.post('/addmovietolist', addMovieToPersonalList);
router.delete('/deletemoviefrompersonallist', deleteMovieFromPersonalList);

export { router };
