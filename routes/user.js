const express = require('express');

const router = express.Router();

const { handleUserSignUp } = require('../controllers/user');

router.post('/signup', handleUserSignUp);

module.exports = router;
