import { Router } from 'express';
import { addUser, comparePassword } from '../controllers/users.js';

const router = Router();

router.post('/checkpassword', comparePassword);
router.post('/adduser', addUser);

export { router };
