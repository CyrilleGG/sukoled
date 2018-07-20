'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Validate a version.
 */

module.exports = async (req, res) => {
  const versions = await mysql('versions')
    .where({
      'id': req.params.version_id
    })
    .update({
      status_admin: 'done',
      status_contributor: 'done'
    });

  return res.status(200).json({
    statusCode: 200,
    message: 'Updated'
  });
};
