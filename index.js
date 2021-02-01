const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const HttpErrors = require('http-errors');
const { validationResult } = require('express-validator');

const app = express();

app.use(bodyParser.json());

app.use('/api/v1', routes);

app.use((err, req, res, next) => {
  if (err.errors) {
    res.status(400).json({
      success: false,
      errors: err.errors
    });

    return 
  }

  if (HttpErrors.isHttpError(err)) {
    res.status(err.status).json({
      success: false,
      errors: [ { msg: err.message } ]
    });

    return 
  }

  res.status(500).json({
    success: false,
    errors: [ { msg: 'Unknown error' } ]
  });
});

app.listen(process.env.PORT, () => {
  console.log('API is ready!');
});