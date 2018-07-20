'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Submit a new version.
 */

module.exports = async (req, res) => {
  const values = await mysql('contributions_values')
    .where({
      'contributions_values.id': req.body.input_value_id
    })
    .update({
      value: req.body.input_value
    });

  const versions = await mysql('versions')
    .where({
      'versions.id': req.params.version_id
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
