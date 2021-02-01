const axios = require('axios');
const consts = require('../consts');

class CurrencyFreaks {
  constructor () {
    this.currencyFreaksApi = axios.create({
      baseURL: 'https://api.currencyfreaks.com/',
      timeout: 10000,
      params: {
        apikey: process.env.CURRENCY_FREAKS_API_KEY
      }
    });
  }

  async getCurrentRates () {
    const response = await this._callApi('/latest', {
      symbols: consts.currencies.join(',')
    });

    const [ date ] = response.date.split(' ');

    if (!date.match(/^\d\d\d\d-\d\d-\d\d$/)) {
      throw new Error('date is not defined');
    }

    const rates = Object.entries(response.rates).reduce((acc, value) => {
      const [ currency, rate ] = value;

      if (Number.isNaN(rate)) {
        throw new Error('invalid type for rate');
      }

      if (!consts.currencies.includes(currency)) {
        throw new Error('unknown currency type');
      }

      return {
        ...acc,
        [currency]: Number(rate)
      };
    }, {});

    return {
      date,
      rates
    }
  }

  async _callApi (endpoint, params) {
    try {
      const response = await this.currencyFreaksApi.get(endpoint, {
        params
      });
  
      return response.data;
    } catch (err) {
      console.error('Request to currency freaks failed with ', JSON.stringify(err.response && err.response.data));

      throw err;
    }
  }
}

module.exports = CurrencyFreaks;