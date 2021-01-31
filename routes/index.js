const currency = require('./currency');
const { Router } = require('express');

const routes = Router();

routes.use('/currency', currency);

module.exports = routes;
