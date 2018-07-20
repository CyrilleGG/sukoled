'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get a specific input value.
 */

module.exports = async (value_id) => {
  let value = [];

  try {
    value = await mysql('contributions_values')
      .select('id AS input_value_id', 'value', 'contribution_id', 'version_id', 'input_id')
      .where({
        'id': value_id
      });
  } catch (err) {
    return value;
  }

  return value;
};
