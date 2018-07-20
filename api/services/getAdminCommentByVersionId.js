'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get admin's comment for a specific version.
 */

module.exports = async (version_id) => {
  let comments = [];

  try {
    comments = await mysql('versions')
      .where({
        'id': version_id
      })
      .select('comment_admin');
  } catch (err) {
    return '';
  }

  return comments[0].comment_admin;
};
