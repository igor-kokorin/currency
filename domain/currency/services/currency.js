const { currency } = require('../../../db/models');
const moment = require('moment');
const CurrecyFreaks = require('../../../lib/currency_freaks');

class Currency {
  static async updateForToday () {
    const date = moment().format('YYYY-MM-DD');

    const todayCurrencyRate = await currency.findOne({
      where: {
        date
      }
    });

    if (!todayCurrencyRate) {
      const cf = new CurrecyFreaks();
  
      const rates = await cf.getCurrentRates();

      await currency.bulkCreate(
        Object.entries(rates).reduce((acc, curr) => {
          acc.push({
            name: curr[0],
            rate: curr[1],
            date
          });

          return acc;
        }, [])
      );
    }

    return true;
  }
}

module.exports = Currency;