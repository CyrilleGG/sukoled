'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get user's policies for a contribution by its id.
 */

module.exports = async (contribution_id, user_id) => {
  let policies = [];

  try {
    policies = await mysql('policies')
      .where({
        'contribution_id': contribution_id,
        'user_id': user_id
      })
      .select('can_read');
  } catch (err) {
    return false;
  }

  return policies[0].can_read;
};
