'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Get the 5 latest versions of each RAF.
 */

module.exports = async (req, res) => {
  const raf = await mysql.select(
    'contribution.id AS contribution_id',
    'contribution.name AS contribution_name',
    'contribution.order AS contribution_order',
    'contribution.limit AS contribution_limit',
    'contribution.threshold AS contribution_threshold',
    'contribution_value.value AS contribution_value',
    'version.ends_at AS version_ends_at'
  )
    .from('contributions AS contribution')
    .innerJoin('departments AS department', 'contribution.department_id', 'department.id')
    .innerJoin('contributions_values AS contribution_value', 'contribution_value.contribution_id', 'contribution.id')
    .innerJoin('versions AS version', 'contribution_value.version_id', 'version.id')
    .where({
      'department.slug': 'raf',
      'version.status_admin': 'done'
    })
    .orderBy('version.ends_at', 'asc')
    .orderBy('contribution_order', 'asc');

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: raf
  });
};