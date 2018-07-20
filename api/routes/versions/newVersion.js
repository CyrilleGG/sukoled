'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql')
const uuidv4 = require('uuid/v4');

const getVersionById = require('../../services/getVersionById');
const getContributionValuesById = require('../../services/getContributionValuesById')

/**
 * Create new version.
 */

module.exports = async (req, res) => {
  const version_id = req.params.version_id;
  const new_version_id = uuidv4();
  const new_value_id = uuidv4();

  const version = await getVersionById(version_id);
  const contributionValues = await getContributionValuesById(req.body.input_value_id);

  const versions = await mysql.insert({
    id: new_version_id,
    name: version[0].name,
    comment_admin: req.body.comment_admin,
    file_binary: version[0].file_binary,
    file_csv: version[0].file_csv,
    file_json: version[0].file_json,
    contribution_id: req.params.contribution_id,
    parent_version_id: version_id,
    user_id: req.body.user_id,
    status_admin: 'progress',
    status_contributor: 'invalid',
    starts_at: version[0].starts_at,
    ends_at: version[0].ends_at,
    comment_contributor: version[0].comment_contributor,
    highlight: version[0].highlight
  })
    .into('versions');

  const values = await mysql.insert({
    id: new_value_id,
    value: contributionValues[0].value,
    contribution_id: contributionValues[0].contribution_id,
    version_id: new_version_id,
    input_id: contributionValues[0].input_id
  })
    .into('contributions_values');

  return res.status(201).json({
    statusCode: 201,
    message: 'Created'
  });
};
