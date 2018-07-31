'use strict';

/**
 * MySQL client.
 */

module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: '0.0.0.0',
    user: 'natixis',
    password: 'RpT4nvTV',
    database: 'hestia'
  }
});
