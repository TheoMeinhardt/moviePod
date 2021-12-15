import Pool from 'pg-pool';
import bcrypt from 'bcrypt';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const pool = new Pool();

async function hashString(plainString) {
  return await bcrypt.hash(plainString, 10);
}

async function addUser(req, res) {
  const { username, password, dateOfbirth } = req.body;

  try {
    if (await checkUsernameDuplicate(username)) {
      throw new Error('Username already exists');
    }

    const text = 'INSERT INTO siteuser (userID, username, password, dateOfBirth) VALUES (default, $1, $2, $3)';
    const params = [username, await hashString(password), dateOfbirth];

    try {
      pool.query(text, params, (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        } else {
          res.status(200).send(result.rows);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function checkUsernameDuplicate(username) {
  const text = 'SELECT username FROM siteuser WHERE username = $1';
  const params = [username];

  const { rows } = await pool.query(text, params);
  return rows.length >= 1 ? true : false;
}

async function comparePassword(req, res) {
  const { username, password } = req.body;
  const text = 'SELECT password FROM siteuser WHERE username = $1';
  const params = [username];

  const { rows } = await pool.query(text, params);
  const hashedPassword = rows[0].password;

  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
}

export { addUser, comparePassword };
