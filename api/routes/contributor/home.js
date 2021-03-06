'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * List every contribution for a contributor.
 */

module.exports = async (req, res) => {
  const contributions = await mysql.select(
    'version.id AS version_id',
    'version.name AS version_name',
    'version.ends_at AS version_ends_at',
    'version.created_at AS version_created_at',
    'version.status_contributor AS version_status_contributor',
    'version.parent_version_id',
    'department.name AS department_name',
    'department.slug AS department_slug',
    'contribution.id AS contribution_id',
    'contribution.name AS contribution_name'
  )
    .from('versions as version')
    .innerJoin('contributions as contribution', 'version.contribution_id', 'contribution.id')
    .innerJoin('departments as department', 'contribution.department_id', 'department.id')
    .whereIn('version.created_at', mysql.max('v2.created_at').from('versions as v2').groupBy('v2.ends_at', 'v2.contribution_id'))
    .innerJoin('policies', 'version.contribution_id', 'policies.contribution_id')
    .where({
      'policies.user_id': req.params.user_id,
    })
    .orderBy('version_created_at', 'desc');

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: { contributions }
  });
};
