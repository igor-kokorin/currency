const { currency } = require('../../db/models');
const moment = require('moment');
const Currency = require('./services/currency');
const consts = require('../../consts');

class GetRatesForDate {
  static async execute (date) {
    if (!date) {
      throw new Error('date is required');
    }

    if (moment().format('YYYY-MM-DD') === date) {
      await Currency.updateForToday();
    }

    const rates = await currency.findAll({
      where: {
        date,
        name: consts.currencies
      }
    });

    return rates.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: curr.rate
      }
    }, {});
  }
}

module.exports = GetRatesForDate;