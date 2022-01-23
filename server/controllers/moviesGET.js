import axios from 'axios';
import log from 'loglevel';
import Pool from 'pg-pool';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const pool = new Pool();

function buildURL(movieName) {
  const apiKey = process.env.API_KEY;

  let url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;
  return url;
}

async function getMovie(req, res) {
  try {
    const { data } = await axios.get(buildURL(req.params.t));
    res.status(200).json(data);
  } catch (err) {
    log.error(err);
    res.status(400).send('Bad Request!\n' + err);
  }
}

async function getPersonalMovieList(req, res) {
  const { username } = req.params;
  const text = 'SELECT s.username, movietitle, personalRating FROM movielist JOIN siteuser s ON s.userid = movielist.userid WHERE s.username = $1';
  const params = [username];

  try {
    let detailedMovies = [];
    const { rows } = await pool.query(text, params);

    for await (let movie of rows) {
      const { data } = await axios.get(buildURL(movie.movietitle));
      let newMovie = movie;
      newMovie.details = data;
      detailedMovies.push(newMovie);
    }

    res.status(200).json(detailedMovies);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
}

async function getUserData(req, res) {
  try {
    const text = 'SELECT username, dateofbirth, minuteswatched FROM siteuser WHERE username = $1';
    const params = [req.params.username];

    const { rows } = await pool.query(text, params);
    res.status(200).send(rows);
  } catch (err) {
    log.error(err);
    res.status(500).send(err);
  }
}

export { getMovie, getPersonalMovieList, buildURL, getUserData };
