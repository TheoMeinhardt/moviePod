import Pool from 'pg-pool';
import log from 'loglevel';
import { getUserId } from './users.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const pool = new Pool();

async function addMovieToPersonalList(req, res) {
  try {
    const { username, movieTitle } = req.body;
    const userid = await getUserId(username);

    if (isNaN(userid)) {
      throw new Error('user not found');
    }

    if (await checkMatchDuplicate(userid, movieTitle)) {
      throw new Error('Movie already in list');
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

export { addMovieToPersonalList };
