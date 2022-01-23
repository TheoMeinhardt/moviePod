import axios from 'axios';
import log from 'loglevel';
import Pool from 'pg-pool';
import { getUserId } from './users.js';
import { buildURL } from './moviesGET.js';
import { addWatchMinutes } from './moviesPOST.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const pool = new Pool();

async function checkMovieInPersonalList(username, movie) {
  const text = 'SELECT movietitle FROM movielist JOIN siteuser s ON s.userid = movielist.userid WHERE s.username = $1 AND movietitle = $2';
  const params = [username, movie];

  const { rows } = await pool.query(text, params);

  return rows.length != 0 ? true : false;
}

async function deleteMovieFromPersonalList(req, res) {
  const { username, movieTitle } = req.body;
  console.log(req.body);
  try {
    if (!checkMovieInPersonalList(username, movieTitle)) {
      res.status(400).send('movie not in list');
      throw new Error('movie not in list');
    }

    const text = 'DELETE FROM movielist WHERE userid = (SELECT userid FROM siteuser WHERE username = $1) and movietitle = $2;';
    const params = [username, movieTitle];

    await pool.query(text, params);
    // const userid = await getUserId(username);
    // const { data } = await axios.get(buildURL(movieTitle));
    // await addWatchMinutes(userid, `-${data.Runtime}`);

    res.status(200).send('OK');
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
}

export { deleteMovieFromPersonalList, checkMovieInPersonalList };
