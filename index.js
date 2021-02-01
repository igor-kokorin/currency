const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const HttpErrors = require('http-errors');
const ValidationError = require('./routes/errors/validation');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/v1', routes);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
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

  console.error(err.message);

  res.status(500).json({
    success: false,
    errors: [ { msg: 'Unknown error' } ]
  });
});

app.listen(process.env.PORT, () => {
  console.log('API is ready!');
});