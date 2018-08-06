'use strict';

/**
 * Module dependencies.
 */

const getDepartmentSlugByVersionId = require('../../services/getDepartmentSlugByVersionId');
const getVersionById = require('../../services/getVersionById');
const getContributionById = require('../../services/getContributionById');

/**
 * Get a non-RAF contribution info.
 */

module.exports = async (req, res) => {
  const department_slug = await getDepartmentSlugByVersionId(req.params.version_id);
  const version = await getVersionById(req.params.version_id);
  const contribution = await getContributionById(req.params.contribution_id);

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      department_slug,
      version_name: version.name,
      contribution,
      comment_admin: version.comment_admin,
      date: version.ends_at
    }
  });
};
