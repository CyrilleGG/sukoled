'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../utilities/mysql');

/**
 * Get a contribution's name by a version's id.
 */

module.exports = async (version_id) => {
  let contributions = [];

  try {
    contributions = await mysql('versions')
      .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
      .where({
        'versions.id': version_id
      })
      .select('contributions.name');
  } catch (err) {
    return '';
  }

  return contributions[0].name;
};
