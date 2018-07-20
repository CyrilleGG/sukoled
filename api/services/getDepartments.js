'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get all departments.
 */

module.exports = async () => {
  let departments = [];

  try {
    departments = await mysql('departments').select('slug', 'name');
  } catch (err) {
    return departments;
  }

  return departments;
};
