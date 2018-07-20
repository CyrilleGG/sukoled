'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

const getUsers = require('../../services/getUsers');

/**
 * Get policy for contribution.
 */

module.exports = async (req, res) => {
  const users = await getUsers();

  const policies = await mysql.select(
    'policy.id AS policy_id',
    'policy.user_id AS user_id',
    'contribution.id AS contribution_id',
    'contribution.name AS contribution_name',
  )
    .from('policies as policy')
    .innerJoin('contributions as contribution', 'policy.contribution_id', 'contribution.id')

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: { users, policies }
  });
};
