'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get versions' id by contribution id.
 */

module.exports = async (contribution_id) => {
  let versions = [];

  try {
    versions = await mysql('versions')
      .select('id AS version_id')
      .where({
        'contribution_id': contribution_id
      });
  } catch (err) {
    return versions;
  }

  return versions;
};
