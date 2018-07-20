'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql')
const uuidv4 = require('uuid/v4');

const getVersionById = require('../../services/getVersionById');

/**
 * Create a new RAF contribution.
 */

module.exports = async (req, res) => {
  const new_version_id = uuidv4();

  const version = await getVersionById(req.params.version_id);

  const versions = await mysql('versions')
    .insert({
      id: new_version_id,
      name: version.name,
      comment_contributor: req.body.comment_contributor,
      status_admin: 'delivered',
      status_contributor: 'pending',
      starts_at: version.starts_at,
      ends_at: version.ends_at,
      contribution_id: req.body.contribution_id,
      parent_version_id: req.params.version_id,
      user_id: req.body.user_id
    });

  const values = await mysql('contributions_values')
    .insert({
      id: uuidv4(),
      value: req.body.contribution_values.input_value,
      contribution_id: req.body.contribution_id,
      version_id: new_version_id,
      input_id: req.body.contribution_values.input_id,
    });

  return res.status(201).json({
    statusCode: 201,
    message: 'Created'
  });
};
