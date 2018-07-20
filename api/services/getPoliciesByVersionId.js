'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get user's policies for a version by its id.
 */

module.exports = async (version_id, user_id) => {
  let policies = [];

  try {
    policies = await mysql('policies')
      .join('contributions', 'policies.contribution_id', '=', 'contributions.id')
      .join('versions', 'contributions.id', '=', 'versions.contribution_id')
      .where({
        'versions.id': version_id,
        'policies.user_id': user_id
      })
      .select('policies.can_read');
  } catch (err) {
    return false;
  }

  return policies[0].can_read;
};
