const { currency } = require('../../db/models');
const moment = require('moment');
const CurrecyFreaks = require('../../lib/currency_freaks');

class GetForDate {
  static async execute (date) {
    if (!date) {
      throw new Error('date is required');
    }

    if (moment().format('YYYY-MM-DD') === date) {
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
    }

    const rates = await currency.findAll({
      where: {
        date,
        name: [ 'RUB', 'EUR', 'USD', 'JPY' ]
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

module.exports = GetForDate;