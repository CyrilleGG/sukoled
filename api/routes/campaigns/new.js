'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');
const sendgrid = require('../../utilities/sendgrid');
const uuidv4 = require('uuid/v4');

const email = require('../../emails/newCampaign');

/**
 * Create a new campaign.
 */

module.exports = async (req, res) => {
  let versions = [];

  try {
    versions = await mysql('versions')
      .insert({
        id: uuidv4(),
        contribution_id: req.body.contribution_id,
        name: req.body.version_name,
        user_id: req.body.user_id,
        starts_at: req.body.starts_at,
        ends_at: req.body.ends_at,
        file_binary: 'null',
        status_admin: 'hold',
        status_contributor: 'not delivered'
      });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }

  try {
    sendgrid.send(email(req.body.department_name));
  } catch (err) {}

  return res.status(201).json({
    statusCode: 201,
    message: 'Created'
  });
};
