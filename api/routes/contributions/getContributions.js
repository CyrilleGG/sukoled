'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * List contributions.
 */

module.exports = async (req, res) => {

  const contributions = await mysql.select(
    'version.id AS version_id',
    'version.parent_version_id',
    'version.starts_at AS version_starts_at',
    'version.ends_at AS version_ends_at',
    'version.created_at AS version_created_at',
    'version.status_admin AS version_status_admin',
    'department.name AS department_name',
    'department.slug AS department_slug',
    'contribution.id AS contribution_id',
    'contribution.name AS contribution_name',
    'contribution.period AS contribution_period',
    'contribution.order AS contribution_order'
  )
    .from('versions as version')
    .orderBy('version.created_at', 'desc')
    .innerJoin('contributions as contribution', 'version.contribution_id', 'contribution.id')
    .innerJoin('departments as department', 'contribution.department_id', 'department.id')
    .whereIn('version.created_at', mysql.max('v2.created_at').from('versions as v2').groupBy('v2.ends_at', 'v2.contribution_id'))
    .orderBy('version_created_at', 'desc');
  
  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: contributions
  });
};

// 'contribution_id', 'ends_at'
// 'ends_at', 'contribution_id'