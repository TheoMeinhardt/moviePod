import { Router } from 'express';
import { addUser, comparePassword, delUser } from '../controllers/users.js';

const router = Router();

router.post('/checkpassword', comparePassword);
router.post('/adduser', addUser);
router.delete('/deluser', delUser);

export { router };
