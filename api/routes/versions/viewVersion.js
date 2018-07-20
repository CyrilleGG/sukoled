'use strict';

/**
 * Module dependencies.
 */

const getVersionById = require('../../services/getVersionById');
const getContributionById = require('../../services/getContributionById');

/**
 * View for a version.
 */

module.exports = async (req, res) => {
  const version = await getVersionById(req.params.version_id);
  const contribution = await getContributionById(req.params.contribution_id);

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      contribution: {
        contribution_id: req.params.contribution_id,
        contribution_name: contribution[0].name
      },
      input: {
        comment_admin: version[0].comment_admin,
        comment_contributor: version[0].comment_contributor,
        highlight: version[0].highlight,
        version_file: version[0].file_json
      }
    }
  });
};
