const { CronJob } = require('cron');
const Currency = require('../domain/currency/services/currency');

const job = new CronJob('0 0 12 * * *', async () => {
  console.log('running currency rates update');

  await Currency.updateForToday();
}, null, true, 'Asia/Krasnoyarsk');

job.start();