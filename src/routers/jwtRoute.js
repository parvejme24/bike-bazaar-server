const express = require('express');
const createJwtToken = require('../controllers/createJwtToken');
const jwtRoute = express.Router();

jwtRoute.post('/jwt', createJwtToken);

module.exports = jwtRoute