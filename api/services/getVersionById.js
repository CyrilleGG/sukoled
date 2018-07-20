'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get version's infos by its id.
 */

module.exports = async (version_id) => {
  let versions = [];

  try {
    versions = await mysql('versions')
      .where({
        'id': version_id
      })
      .select('*');
  } catch (err) {
    return versions[0];
  }

  return versions[0];
};
