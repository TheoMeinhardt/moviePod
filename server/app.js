import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes.js';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.listen(port, () => {
  console.log('\nserver listening on port ' + port);
});
