'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Delete a policy.
 */

module.exports = async (req, res) => {
  const policy = await mysql('policies')
    .where({
      'policies.id': req.params.policy_id
    })
    .del();

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok'
  });
};
