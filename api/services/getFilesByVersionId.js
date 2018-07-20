'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get additional files binaries for a specific version.
 */

module.exports = async (version_id) => {
  let files = [];

  try {
    files = await mysql('files')
      .where({
        'version_id': version_id
      })
      .select('id as file_id', 'name AS file_name', 'binary AS file_binary');
  } catch (err) {
    return '';
  }

  return files;
};
