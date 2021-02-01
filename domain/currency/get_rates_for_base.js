const { currency } = require('../../db/models');
const moment = require('moment');
const Currency = require('./services/currency');
const { NotFound } = require('http-errors');

class GetRatesForBase {
  static async execute (base, secondary) {
    if (!base || !secondary) {
      throw new Error('base and secondary currencies are required');
    }

    await Currency.updateForToday();

    const currencies = await currency.findAll({
      where: {
        date: moment().format('YYYY-MM-DD'),
        name: [ base, secondary ]
      }
    });
    
    const baseCurrency = currencies.find(c => c.name === base);

    if (!baseCurrency) {
      throw new NotFound('base currency not found');
    }

    const secondaryCurrency = currencies.find(c => c.name === secondary);

    if (!secondaryCurrency) {
      throw new NotFound('secondary currency not found');
    }

    if (baseCurrency.rate <= 0 || secondaryCurrency.rate <= 0) {
      throw new Error('currency rates cannot be negative or zero');
    }

    return {
      [baseCurrency.name]: 1,
      [secondaryCurrency.name]: secondaryCurrency.rate / baseCurrency.rate
    };
  }
}

module.exports = GetRatesForBase;