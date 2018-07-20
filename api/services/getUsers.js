'use strict';

/**
 * Module dependencies.
 */

const users = require('../db/users.js');

/**
 * Get all users.
 */

module.exports = async (user) => {
  return users.map(a => a.username);
};
