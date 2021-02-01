const { currency } = require('../../db/models');

class GetForDate {
  static async execute (date) {
    if (!date) {
      throw new Error('date is required');
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