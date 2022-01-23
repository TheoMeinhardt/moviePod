import { Router } from 'express';
import { getMovie, getPersonalMovieList, getUserData } from '../controllers/moviesGET.js';
import { addMovieToPersonalList, rateMovie, addWatchMinutes } from '../controllers/moviesPOST.js';
import { deleteMovieFromPersonalList } from '../controllers/moviesDELETE.js';

const router = Router();

router.get('/getmovie/:t', getMovie);
router.get('/getpersonalmovielist/:username', getPersonalMovieList);
router.get('/getUserData/:username', getUserData);
router.post('/addmovietolist', addMovieToPersonalList);
router.post('/ratemovie', rateMovie);
router.post('/addwatchminutes', addWatchMinutes);
router.delete('/deletemoviefrompersonallist', deleteMovieFromPersonalList);

export { router };
