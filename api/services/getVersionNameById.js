'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get version's name by its id.
 */

module.exports = async (version_id) => {
  let versions = [];

  try {
    versions = await mysql('versions')
      .where({
        'id': version_id
      })
      .select('name');
  } catch (err) {
    return '';
  }

  return versions[0].name;
};
