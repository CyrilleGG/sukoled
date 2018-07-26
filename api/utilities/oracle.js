'use strict';

/**
 * Oracle client.
 */

module.exports = require('knex')({
  client: 'mysql',
  connection: 'mysql://natixis:RpT4nvTV@localhost:3306/hestia'
});
