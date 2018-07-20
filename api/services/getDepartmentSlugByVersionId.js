'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get department slug by version id.
 */

module.exports = async (version_id) => {
  let slugs = [];

  try {
    slugs = await mysql('versions')
      .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
      .join('departments', 'contributions.department_id', '=', 'departments.id')
      .where({
        'versions.id': version_id
      })
      .select('departments.slug');
  } catch (err) {
    return '';
  }

  return slugs[0].slug;
};
