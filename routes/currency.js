const { Router } = require('express');
const GetRatesForDate = require('../domain/currency/get_rates_for_date');
const GetRatesForBase = require('../domain/currency/get_rates_for_base');

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

routes.get('/compare/:base/:secondary', async (req, res, next) => {
  try {
    const rates = await GetRatesForBase.execute(req.params.base, req.params.secondary);
  
    return res.json({
      success: true,
      rates
    });
  } catch (err) {
    return next(err, req, res);
  }
});

module.exports = routes;
