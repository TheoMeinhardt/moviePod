import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

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
    res.status(400).send('Bad Request!\n' + err);
  }
}

export { getMovie };
