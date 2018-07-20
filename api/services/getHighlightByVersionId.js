'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get highlight for a specific version.
 */

module.exports = async (version_id) => {
  let highlights = [];

  try {
    highlights = await mysql('versions')
      .where({
        'id': version_id
      })
      .select('highlight');
  } catch (err) {
    return '';
  }

  return highlights[0].highlight;
};
