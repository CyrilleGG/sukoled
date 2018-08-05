'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Get a specific version by its id.
 */

module.exports = async (req, res) => {
  const highlights = await mysql.select(
      'version.highlight AS highlight',
      'contribution.name AS contribution_name',
      'department.name AS department_name'
  )
    .from('versions AS version')
    .innerJoin('contributions AS contribution', 'version.contribution_id', 'contribution.id')
    .innerJoin('departments AS department', 'contribution.department_id', 'department.id')
    .whereRaw('version.status_admin = "done" AND department.slug = "subsidaries" AND version.ends_at IN (SELECT MAX(v2.ends_at) FROM versions AS v2)');

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: highlights
  });
};
