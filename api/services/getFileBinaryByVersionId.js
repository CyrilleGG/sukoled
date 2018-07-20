'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get file binary for a specific version.
 */

module.exports = async (version_id) => {
  let files = [];

  try {
    files = await mysql('versions')
      .where({
        'id': version_id
      })
      .select('file_binary');
  } catch (err) {
    return '';
  }

  return files[0].file_binary;
};
