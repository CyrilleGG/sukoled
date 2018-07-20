'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

// Envoie du department lié à la version
module.exports = async (contribution_id) => {
  let slugs = [];

  try {
    slugs = await mysql('contributions')
      .join('departments', 'contributions.department_id', '=', 'departments.id')
      .where({
        'contributions.id': contribution_id
      })
      .select('departments.slug');
  } catch (err) {
    return '';
  }

  return slugs[0].slug;
};
