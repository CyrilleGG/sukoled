'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');
const uuidv4 = require('uuid/v4');

/**
 * Create a new policy for version and a user.
 */

module.exports = async (req, res) => {
  const policy = await mysql('policies').insert({
    id: uuidv4(),
    contribution_id: req.body.contribution_id,
    user_id: req.body.user_id,
    can_read: '1',
    can_write: '1'
  });

  return res.status(201).json({
    statusCode: 201,
    message: 'Created'
  });
};
