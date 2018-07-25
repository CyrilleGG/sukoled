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
    .where({
      'version.status_admin': 'done',
      'department.slug': 'subsidaries'
    });

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: highlights
  });
};
