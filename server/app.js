import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { router as userRouter } from './routes/users.js';
import { router as movieRouter } from './routes/movies.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(morgan('common', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(userRouter);
app.use(movieRouter);

app.listen(port, () => {
  console.log('\nserver listening on port ' + port);
});
