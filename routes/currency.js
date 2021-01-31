const { Router } = require('express');

const routes = Router();

routes.get('/rates/:date', (req, res) => res.json({ success: true, date: req.params.date }));
routes.get('/compare/:base/:secondary', (req, res) => res.json({ success: true, base: req.params.base, secondary: req.params.secondary }));

module.exports = routes;
