'use strict';

/**
 * Module dependencies.
 */

const getContributionById = require('../../services/getContributionById');
const getVersionsByContributionId = require('../../services/getVersionsByContributionId');
const getDepartmentSlugByContributionId = require('../../services/getDepartmentSlugByContributionId');

/**
 * Get a non-RAF contribution info.
 */

module.exports = async (req, res) => {
  const contributions = await getContributionById(req.params.contribution_id);
  const versions = await getVersionsByContributionId(req.params.contribution_id);
  const department = await getDepartmentSlugByContributionId(req.params.contribution_id);

  let data = (contributions.concat({
    versions: versions
  }));

  let data_version = {};
  for (var prop in versions) {
    if (versions.hasOwnProperty(prop)) {
      data_version[prop] = versions[prop];
    }
  }

  var infos = Object.assign({}, ...contributions, {
    "Versions": data_version
  });

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      infos,
      department
    }
  });
};
