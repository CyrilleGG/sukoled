'use strict';

/**
 * Module dependencies.
 */

const getVersionById = require('../../services/getVersionById');
const getContributionById = require('../../services/getContributionById');
const getFilesByVersionId = require('../../services/getFilesByVersionId');

/**
 * View for a version.
 */

module.exports = async (req, res) => {
  const version = await getVersionById(req.params.version_id);
  const contribution = await getContributionById(req.params.contribution_id);
  const files = await getFilesByVersionId(req.params.version_id)

  files.forEach(file => {
    file.file_binary = file.file_binary.toString('base64')
  })

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      contribution: {
        contribution_id: req.params.contribution_id,
        contribution_name: contribution[0].name
      },
      input: {
        comment_admin: version.comment_admin,
        comment_contributor: version.comment_contributor,
        highlight: version.highlight,
        version_file: version.file_json,
        additionalFiles: files
      },
      date: version.ends_at
    }
  });
};
