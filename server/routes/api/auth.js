import express from 'express';

const router = express.Router();

import {refresh, register, login, logout, user } from '../../controllers/authController.js'

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/refresh', refresh)

router.get('/user', user)

export default router;