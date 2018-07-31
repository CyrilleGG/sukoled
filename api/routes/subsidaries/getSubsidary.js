'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Get a specific version by its id.
 */

module.exports = async (req, res) => {
  const subsidary_name = req.params.subsidary_name;
  
  const subsidary = await mysql.select(
    'version.starts_at AS starts_at',
    'version.ends_at AS ends_at',
    'version.file_json AS file_json',
    'version.highlight AS highlight',
    'version.comment_contributor AS comment_contributor'
  )
    .from('versions AS version')
    .innerJoin('contributions AS contribution', 'version.contribution_id', 'contribution.id')
    .where({
      'version.status_admin': 'done',
      'contribution.name': subsidary_name
    })
    .orderBy('version.ends_at', 'asc');

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: subsidary
  });
};
