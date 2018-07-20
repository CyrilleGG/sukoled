'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get contributor's comment for a specific version.
 */

module.exports = async (version_id) => {
  let comments = [];

  try {
    comments = await mysql('versions')
      .where({
        'id': version_id
      })
      .select('comment_contributor');
  } catch (err) {
    return '';
  }

  return comments[0].comment_contributor;
};
