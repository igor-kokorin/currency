const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const HttpErrors = require('http-errors');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1', routes);

app.use((err, req, res, next) => {
  if (HttpErrors.isHttpError(err)) {
    res.status(err.status).json({
      success: false,
      error: err.message
    });

    return 
  }

  res.status(500).json({
    success: false,
    error: 'Unknown error'
  });
});

app.listen(process.env.PORT, () => {
  console.log('API is ready!');
});