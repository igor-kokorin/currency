const { currency, sequelize, Sequelize } = require('../../../db/models');
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
  
      const { date: ratesDate, rates } = await cf.getCurrentRates();

      const ratesArr = Object.entries(rates).reduce((acc, curr) => {
        acc.push({
          name: curr[0],
          rate: curr[1]
        });

        return acc;
      }, []);

      await sequelize.query(`
        INSERT INTO currencies (date, name, rate, "createdAt", "updatedAt")
        VALUES ${ratesArr.map(rate => `('${ratesDate}', '${rate.name}', ${rate.rate}, NOW(), NOW())`).join(',')}
        ON CONFLICT (date, name) DO UPDATE SET rate = EXCLUDED.rate, "updatedAt" = NOW();
      `, {
        type: Sequelize.QueryTypes.INSERT
      });
    }

    return true;
  }
}

module.exports = Currency;