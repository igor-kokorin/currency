const { Router } = require('express');
const GetRatesForDate = require('../domain/currency/get_rates_for_date');

const routes = Router();

routes.get('/rates/:date', async (req, res, next) => {
  try {
    const rates = await GetRatesForDate.execute(req.params.date);
  
    return res.json({
      success: true,
      rates
    });
  } catch (err) {
    return next(err, req, res);
  }
});

routes.get('/compare/:base/:secondary', (req, res) => res.json({ success: true, base: req.params.base, secondary: req.params.secondary }));

module.exports = routes;
