'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const users = require('../db/users');

const jwtOptions = {}
const ExtractJwt = passportJWT.ExtractJwt;
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '$Tne"é9:§§"__ù';

/**
 * Authenticate a user.
 */

module.exports = (req, res) => {
  if (req.body.username && req.body.password) {
    var username = req.body.username;
  }

  var user = users[_.findIndex(users, {
    username: username
  })];

  var payload = {
    id: user.id
  };

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      message: "L'utilisateur n'a pas été trouvé"
    });
  } else if (user.password === req.body.password) {
    return res.json({
      data: {
        token: jwt.sign(payload, jwtOptions.secretOrKey),
        username: username,
        role: user.role,
        user_id: user.id
      }
    });
  } else {
    return res.status(401).json({
      statusCode: 401,
      message: "Le mot de passe ne correspond pas"
    });
  }
};
