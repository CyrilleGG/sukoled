'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');
const uuidv4 = require('uuid/v4');

const getVersionById = require('../../services/getVersionById');

/**
 * Create a new non-RAF contribution.
 */

module.exports = async (req, res) => {
  let version = {};
  let newVersion;

  try {
    version = await getVersionById(req.params.version_id);
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }

  try {
    newVersion = await mysql('versions')
      .insert({
        id: uuidv4(),
        name: version[0].name,
        highlight: req.body.highlight,
        file_csv: req.body.file_csv,
        file_json: req.body.file_json,
        file_binary: req.body.file_binary,
        comment_contributor: req.body.comment_contributor,
        status_admin: 'delivered',
        status_contributor: 'pending',
        starts_at: version[0].starts_at,
        ends_at: version[0].ends_at,
        contribution_id: req.body.contribution_id,
        parent_version_id: req.params.version_id,
        user_id: req.body.user_id
      });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }

  return res.status(201).json({
    statusCode: 201,
    message: 'Created'
  });
};
