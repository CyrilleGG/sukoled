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
    .leftOuterJoin('versions as version2', function () {
      this.on('version.contribution_id', '=', 'version.contribution_id').andOn('version.created_at', '>', 'version2.created_at')
    })
    .innerJoin('contributions as contribution', 'version.contribution_id', 'contribution.id')
    .innerJoin('departments as department', 'contribution.department_id', 'department.id')
    .groupBy('contribution_id')
    .orderBy('version_created_at', 'asc');

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: contributions
  });
};
