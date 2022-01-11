import axios from 'axios';
import log from 'loglevel';
import Pool from 'pg-pool';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const pool = new Pool();

async function deleteMovieFromPersonalList(req, res) {
  const { username, movieTitle } = req.body;

  try {
    if (pool.query('select movietitle from movielist join siteuser s on s.userid = movielist.userid where s.username = $1 and movietitle = $2', [username, movieTitle]).length == 0) {
      res.status(400).send('movie not in list');
      throw new Error('movie not in list');
    }

    const text = 'DELETE FROM movielist WHERE userid = (SELECT userid FROM siteuser WHERE username = $1) and movietitle = $2;';
    const params = [username, movieTitle];

    await pool.query(text, params);

    res.status(200).send('OK');
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
}

export { deleteMovieFromPersonalList };
