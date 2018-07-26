'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get a specific contribution.
 */

module.exports = async (contribution_id) => {
  let contribution = [];

  try {
    contribution = await mysql('contributions')
      .select('id AS contribution_id', 'name', 'period', 'limit', 'threshold', 'unit')
      .where({
        'id': contribution_id
      });
  } catch (err) {
    return contribution;
  }

  return contribution;
};
