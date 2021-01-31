const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1', routes);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: 'Unknown error'
  });
});

app.listen(3000, () => {
  console.log('API is ready!');
});