'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Get a specific version by its id.
 */

module.exports = async (req, res) => {
  const versions = await mysql('versions')
    .select(
      'versions.file_binary as file',
      'versions.comment_contributor as comment_contributor',
      'contributions.name as contribution_name',
  )
    .where({
      'versions.id': req.params.version_id
    })
    .join('contributions', 'versions.contribution_id', '=', 'contributions.id');

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: versions
  });
};
