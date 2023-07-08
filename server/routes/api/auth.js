import express from 'express';

const router = express.Router();

import {refresh, register, login, logout, user } from '../../controllers/authController.js'
import auth from '../../midldleware/auth.js';

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/refresh', refresh)

router.get('/user', auth, user)

export default router;