const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1', routes);

app.listen(3000, () => {
  console.log('API is ready!');
});