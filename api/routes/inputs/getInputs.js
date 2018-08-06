'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Get inputs for a contribution.
 */

module.exports = async (req, res) => {
  const inputs = await mysql.select(
    'input.id AS input_id',
    'input.input_type AS input_type',
    'input.name AS input_name',
    'input.description AS input_description',
    'input.slug AS input_slug',
    'value.id AS input_value_id',
    'value.value AS input_value',
    'version.comment_contributor AS comment_contributor',
    'version.comment_admin AS comment_admin',
    'version.highlight AS highlight',
    'version.ends_at AS version_ends_at'
  )
    .from('contributions_values as value')
    .innerJoin('contributions_inputs as input', 'value.input_id', 'input.id')
    .innerJoin('versions as version', 'value.version_id', 'version.id')
    .where({
      'version.id': req.params.version_id
    });

  const contributions = await mysql.select(
    'contribution.id AS contribution_id',
    'contribution.name AS contribution_name',
    'contribution.limit AS contribution_limit',
    'contribution.threshold AS contribution_threshold'
  )
    .from('contributions as contribution')
    .where({
      'contribution.id': req.params.contribution_id
    });

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      input: inputs[0],
      contribution: contributions[0],
      date: inputs[0].version_ends_at
    }
  });
};
