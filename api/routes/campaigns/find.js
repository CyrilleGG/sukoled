'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql')
const uuidv4 = require('uuid/v4');

/**
 * Retrieve a specific campaign.
 */

module.exports = async (req, res) => {
  let contributions = [];

  try {
    contributions = await mysql('contributions')
      .select(
        'contributions.id AS contribution_id',
        'contributions.name AS contribution_name',
        'contributions.department_id AS department_id',
        'departments.slug AS department_slug',
        'departments.name AS department_name'
      )
      .join('departments', 'contributions.department_id', '=', 'departments.id');
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: contributions
  });
};
