'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

const getDepartmentSlugByVersionId = require('../../services/getDepartmentSlugByVersionId');
const getVersionNameById = require('../../services/getVersionById');
const getContributionById = require('../../services/getContributionById');
const getAdminCommentByVersionId = require('../../services/getAdminCommentByVersionId');

/**
 * Get a RAF contribution info.
 */

module.exports = async (req, res) => {
  const department_slug = await getDepartmentSlugByVersionId(req.params.version_id);
  const version_name = await getVersionNameById(req.params.version_id);
  const contribution = await getContributionById(req.params.contribution_id);
  const comment_admin = await getAdminCommentByVersionId(req.params.version_id);

  const inputs = await mysql.select(
    'input.id AS input_id',
    'input.input_type AS input_type',
    'input.name AS input_name',
    'input.description AS input_description',
    'input.slug AS input_slug'
  )
    .from('contributions_inputs as input')
    .where({
      'input.contribution_id': req.params.contribution_id
    });

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      department_slug,
      version_name,
      contribution,
      comment_admin,
      inputs
    }
  });
};
