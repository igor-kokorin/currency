const axios = require('axios');

class CurrencyFreaks {
  constructor () {
    this.currencyFreaksApi = axios.create({
      baseURL: 'https://api.currencyfreaks.com/',
      timeout: 1000,
      params: {
        apikey: process.env.CURRENCY_FREAKS_API_KEY
      }
    });
  }

  async getRatesForDate (date) {
    if (!date) {
      throw new Error('date is required');
    }

    const response = await this._callApi('/latest', {
      symbols: 'RUB,EUR,USD,JPY'
    })

    return Object.entries(response.rates).reduce((acc, value) => {
      const [ currency, rate ] = value;

      return {
        ...acc,
        [currency]: Number(rate)
      };
    }, {});
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