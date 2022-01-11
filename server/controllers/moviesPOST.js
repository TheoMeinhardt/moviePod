import Pool from 'pg-pool';
import log from 'loglevel';
import { getUserId } from './users.js';
import { checkMovieInPersonalList } from './moviesDELETE.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const pool = new Pool();

async function addMovieToPersonalList(req, res) {
  try {
    const { username, movieTitle } = req.body;
    const userid = await getUserId(username);

    console.log(userid);
    if (isNaN(userid)) {
      res.status(400).send('user does not exist');
      throw new Error('user does not exist');
    }

    if (await checkMatchDuplicate(userid, movieTitle)) {
      res.status(400).send('movie already in list');
      throw new Error('movie already in list');
    }

    await addMovieToDB(movieTitle);

    const text = 'INSERT INTO movielist (matchid, userid, movietitle) VALUES (default, $1, $2)';
    const params = [userid, movieTitle];

    await pool.query(text, params);

    res.status(200).send();
  } catch (err) {
    log.error(err);
    res.status(400).send(err);
  }
}

async function addMovieToDB(title) {
  try {
    const text = 'INSERT INTO movie (movietitle) values ($1)';
    const params = [title];

    await pool.query(text, params);
  } catch (err) {
    return err;
  }
}

async function checkMatchDuplicate(user, title) {
  try {
    const text = 'SELECT userid, movietitle FROM movielist WHERE userid = $1 and movietitle = $2';
    const params = [user, title];

    const { rows } = await pool.query(text, params);
    if (rows.length >= 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    log.error(err);
    return undefined;
  }
}

async function rateMovie(req, res) {
  const { username, movieTitle, rating } = req.body;

  try {
    if (!(await checkMovieInPersonalList(username, movieTitle))) {
      res.status(400).send('movie not in list');
      throw new Error('Movie not in personal list');
    }

    const text = 'UPDATE movielist SET personalRating = $1 WHERE userid = $2 AND movieTitle = $3';
    const params = [rating, await getUserId(username), movieTitle];

    await pool.query(text, params);

    res.status(200).send('OK');
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
}

export { addMovieToPersonalList, rateMovie };
