const moment = require('moment');
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currencies = [];

    for (const currency of [ 'RUB', 'EUR', 'USD', 'JPY' ]) {
      for (const date = moment().startOf('year'); date < moment(); date.add(1, 'day')) {
        currencies.push({
          name: currency,
          rate: Math.random() * 20 + 50,
          date: date.format('YYYY-MM-DD')
        });
      }
    }

    return models.currency.bulkCreate(currencies);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.query(`
      DELETE FROM currencies;
    `);
  }
};
