const { Router } = require('express');
const GetRatesForDate = require('../domain/currency/get_rates_for_date');
const GetRatesForBase = require('../domain/currency/get_rates_for_base');
const { param, validationResult } = require('express-validator');
const consts = require('../consts');
const routerConsts = require('./consts');
const logRequests = require('./middleware/log_requests');
const validateRequests = require('./middleware/validate_requests');

const routes = Router();

routes.get('/rates/:date', [
    param('date').trim().isDate({ format: 'YYYY-MM-DD' }).withMessage('date must have following format YYYY-MM-DD')
  ],
  validateRequests,
  logRequests(routerConsts.requestKindsObj.currencyRateByDate),
  async (req, res, next) => {
    try {
      const rates = await GetRatesForDate.execute(req.params.date);
    
      return res.json({
        success: true,
        rates
      });
    } catch (err) {
      return next(err, req, res);
    }
  }
);

routes.get('/compare/:base/:secondary', [
    param('base').trim().toUpperCase().isIn(consts.currencies).withMessage(`base currency must be one of ${consts.currencies.join(',')}`),
    param('secondary').trim().toUpperCase().isIn(consts.currencies).withMessage(`secondary currency must be one of ${consts.currencies.join(',')}`)
  ],
  validateRequests,
  logRequests(routerConsts.requestKindsObj.currencyCompare),
  async (req, res, next) => {
    try {
      const rates = await GetRatesForBase.execute(req.params.base, req.params.secondary);
    
      return res.json({
        success: true,
        rates
      });
    } catch (err) {
      return next(err, req, res);
    }
  }
);

module.exports = routes;
