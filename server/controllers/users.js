import Pool from 'pg-pool';
import bcrypt from 'bcrypt';
import log from 'loglevel';
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
          throw err;
        } else {
          res.status(200).send(result.rows);
        }
      });
    } catch (err) {
      log.error(err);
      res.status(500).send(err);
    }
  } catch (err) {
    log.error(err);
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

  try {
    const { rows } = await pool.query(text, params);

    if (rows.length == 0) res.status(404).send('user not found');
    else {
      const hashedPassword = rows[0].password;

      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          log.error(err);
        } else {
          res.status(200).send(result);
        }
      });
    }
  } catch (err) {
    log.error(err);
    res.status(400).send(err);
  }
}

async function delUser(req, res) {
  const { username, password } = req.body;
  const text = 'SELECT password FROM siteuser WHERE username = $1';
  const params = [username];

  const { rows } = await pool.query(text, params);
  const hashedPassword = rows[0].password;

  bcrypt.compare(password, hashedPassword, async (err, result) => {
    if (err) {
      log.error(err);
    } else {
      if (result) {
        const text = 'DELETE FROM siteuser WHERE username = $1';
        const params = [username];

        try {
          await pool.query(text, params);
          res.status(200).send('OK');
        } catch (err) {
          log.error(err);
          res.status(500).send(err);
        }
      }
    }
  });
}

async function getUserId(username) {
  const text = 'SELECT userid FROM siteuser WHERE username = $1';
  const params = [username];

  const { rows } = await pool.query(text, params);
  console.log(rows);

  return rows.length >= 1 ? rows[0].userid : 'user not found';
}

export { addUser, comparePassword, getUserId, delUser };
