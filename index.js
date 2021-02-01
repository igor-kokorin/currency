const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const HttpErrors = require('http-errors');
const Jwt = require('express-jwt');
const ValidationError = require('./routes/errors/validation');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/v1', Jwt({
  secret: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  algorithms: [ 'HS256' ],
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  }
}), routes);

app.use((err, req, res, next) => {
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(err.status).json({
      success: false,
      errors: [
        {
          msg: err.message
        }
      ]
    });

    return 
  }

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
      errors: [
        {
          msg: err.message
        }
      ]
    });

    return 
  }

  console.error(err.message);

  res.status(500).json({
    success: false,
    errors: [
      {
        msg: 'Unknown error'
      }
    ]
  });
});

app.listen(process.env.PORT, () => {
  console.log('API is ready!');
});