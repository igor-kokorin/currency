const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

const jwt = require('jsonwebtoken');

jwt.sign({ secureToken: true }, process.env.JWT_SECRET, { algorithm: 'HS256', issuer: process.env.JWT_ISSUER }, function(err, token) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(token);
});