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
  let new_version_id = uuidv4();
  let version = {};
  let files = [];
  let regex = /(file_[1-9])/;

  for (var key in req.body) {
    if (regex.test(key)) {
      files.push({
        id: uuidv4(),
        binary: req.body[key],
        version_id: new_version_id,
        contribution_id: req.body.contribution_id,
        user_id: req.body.user_id
      })
    }
  };

  if (req.body.files_names !== '') {
    const files_names = req.body.files_names.split(',');
    for (var i = 0; i < files_names.length; i++) {
      files[i]['name'] = files_names[i]
    }
  };

  if (req.body.files_types !== '') {
    const files_types = req.body.files_types.split(',');
    for (var i = 0; i < files_types.length; i++) {
      files[i]['type'] = files_types[i]
    }
  };

  let newVersion;
  let newFiles;

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
        id: new_version_id,
        name: version.name,
        highlight: req.body.highlight,
        file_csv: req.body.file_csv,
        file_json: req.body.file_json,
        file_binary: req.body.file_binary,
        comment_contributor: req.body.comment_contributor,
        status_admin: 'delivered',
        status_contributor: 'pending',
        starts_at: version.starts_at,
        ends_at: version.ends_at,
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

  try {
    newFiles = await mysql.batchInsert('files', files)
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
