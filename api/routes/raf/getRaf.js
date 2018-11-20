'use strict';

/**
 * Module dependencies.
 */

const mysql = require('../../utilities/mysql');

/**
 * Get the 5 latest versions of each RAF.
 */

module.exports = async (req, res) => {
  const raf = await mysql.select(
    'contribution.id AS contribution_id',
    'contribution.name AS contribution_name',
    'contribution.order AS contribution_order',
    'contribution.start AS contribution_start',
    'contribution.limit AS contribution_limit',
    'contribution.threshold AS contribution_threshold',
    'contribution_value.value AS contribution_value',
    'version.comment_contributor AS version_comment_contributor',
    'version.ends_at AS version_ends_at'
  )
    .from('contributions AS contribution')
    .innerJoin('departments AS department', 'contribution.department_id', 'department.id')
    .innerJoin('contributions_values AS contribution_value', 'contribution_value.contribution_id', 'contribution.id')
    .innerJoin('versions AS version', 'contribution_value.version_id', 'version.id')
    .where({
      'department.slug': 'raf',
      'version.status_admin': 'done'
    })
    .orderBy('version.ends_at', 'asc')
    .orderBy('contribution_order', 'asc');

  raf.forEach(r => {

    var value = parseFloat(r.contribution_value)
    var start = parseFloat(r.contribution_start)
    var limit = parseFloat(r.contribution_limit)
    var threshold = parseFloat(r.contribution_threshold)

    if (threshold < 0) {
      value = (-1) * value
      start = (-1) * start
      limit = (-1) * limit
      threshold = (-1) * threshold
    } else if (start > threshold) {
      value = start - value
      limit = start - limit
      threshold = start - threshold
      start = 0
    }

    if (value <= start) {
      r['pos'] = 0 - 3
      r['color'] = '#00FF00'
    } else if (start < value && value < limit) {
      r['pos'] = (value * 40) / limit - 3
      r['color'] = '#00FF00'
    } else if (value == limit) {
      r['pos'] = 40 - 3
      r['color'] = '#FFA600'
    } else if (limit < value && value < threshold) {
      r['pos'] = (value * 80) / threshold - 3
      r['color'] = '#FFA600'
    } else if (value == threshold) {
      r['pos'] = 80 - 3
      r['color'] = '#FF0000'
    } else if (threshold < value) {
      r['pos'] = 90 - 3
      r['color'] = '#FF0000'
    }
  });

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: raf
  });
};
