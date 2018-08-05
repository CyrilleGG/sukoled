'use strict';

/**
 * Module dependencies.
 */

const oracle = require('../../utilities/oracle');

/**
 * DTM Breakdown by business line.
 */

module.exports = async (req, res) => {
  let current_month = req.params.month;
  let current_year = req.params.year;

  let previous_month;
  let previous_year;
  if (current_month == 1) {
    previous_month = 12;
    previous_year = req.params.year - 1;
  } else {
    previous_month = req.params.month - 1;
    previous_year = req.params.year;
  }

  const breakdown_current = await oracle('dtm')
    .select(
      'IND_CORE_BUSINESS AS ind_core_business',
      'IND_BUSINESS_LINE AS ind_business_line',
  )
    .sum('MT_EXPO_GLOBAL AS sum_mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      ANNEE: current_year,
      MOIS: current_month
    })
    .whereNot({
      IND_CORE_BUSINESS: ''
    })
    .groupBy('IND_CORE_BUSINESS', 'IND_BUSINESS_LINE');

  const breakdown_previous = await oracle('dtm')
    .select(
      'IND_CORE_BUSINESS AS ind_core_business',
      'IND_BUSINESS_LINE AS ind_business_line',
  )
    .sum('MT_EXPO_GLOBAL AS sum_mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      ANNEE: previous_year,
      MOIS: previous_month
    })
    .whereNot({
      IND_CORE_BUSINESS: ''
    })
    .groupBy('IND_CORE_BUSINESS', 'IND_BUSINESS_LINE');

  const breakdown_reference = await oracle('dtm')
    .select(
      'IND_CORE_BUSINESS AS ind_core_business',
      'IND_BUSINESS_LINE AS ind_business_line',
  )
    .sum('MT_EXPO_GLOBAL AS sum_mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      ANNEE: '2017',
      MOIS: '12'
    })
    .whereNot({
      IND_CORE_BUSINESS: ''
    })
    .groupBy('IND_CORE_BUSINESS', 'IND_BUSINESS_LINE');

  const current_larges = await oracle('dtm')
    .select(
      'IND_CORE_BUSINESS AS ind_core_business',
      'IND_BUSINESS_LINE AS ind_business_line',
  )
    .sum('MT_EXPO_GLOBAL AS sum_mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      ANNEE: current_year,
      MOIS: current_month,
      CD_INSTRUMENT: 'CASH MARCHE'
    })
    .whereNot({
      IND_CORE_BUSINESS: 'Other Activities'
    })
    .groupBy('IND_CORE_BUSINESS', 'IND_BUSINESS_LINE');

  const previous_larges = await oracle('dtm')
    .select(
      'IND_CORE_BUSINESS AS ind_core_business',
      'IND_BUSINESS_LINE AS ind_business_line',
  )
    .sum('MT_EXPO_GLOBAL AS sum_mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      ANNEE: previous_year,
      MOIS: previous_month,
      CD_INSTRUMENT: 'CASH MARCHE'
    })
    .whereNot({
      IND_CORE_BUSINESS: 'Other Activities'
    })
    .groupBy('IND_CORE_BUSINESS', 'IND_BUSINESS_LINE');

  const reference_larges = await oracle('dtm')
    .select(
      'IND_CORE_BUSINESS AS ind_core_business',
      'IND_BUSINESS_LINE AS ind_business_line',
  )
    .sum('MT_EXPO_GLOBAL AS sum_mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      ANNEE: '2017',
      MOIS: '12',
      CD_INSTRUMENT: 'CASH MARCHE'
    })
    .whereNot({
      IND_CORE_BUSINESS: 'Other Activities'
    })
    .groupBy('IND_CORE_BUSINESS', 'IND_BUSINESS_LINE');

  let total_current = 0;
  breakdown_current.forEach(line => {
    line.sum_mt_expo_global = line.sum_mt_expo_global / 1000000;
    total_current += line.sum_mt_expo_global;
    line.sum_mt_expo_global = Math.round(line.sum_mt_expo_global).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    total_current = Math.round(total_current);

    if (line.ind_core_business == 'CIB') {
      if (line.ind_business_line == 'Global Market') {
        line.large_corporates = current_larges[0].sum_mt_expo_global;
      }
    }
  });

  let total_previous = 0;
  breakdown_previous.forEach(line => {
    line.sum_mt_expo_global = line.sum_mt_expo_global / 1000000;
    total_previous += line.sum_mt_expo_global;
    line.sum_mt_expo_global = Math.round(line.sum_mt_expo_global).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    total_previous = Math.round(total_previous);

    if (line.ind_core_business == 'CIB') {
      if (line.ind_business_line == 'Global Market') {
        line.large_corporates = previous_larges[0].sum_mt_expo_global;
      }
    }
  });

  let total_reference = 0;
  breakdown_reference.forEach(line => {
    line.sum_mt_expo_global = line.sum_mt_expo_global / 1000000;
    total_reference += line.sum_mt_expo_global;
    line.sum_mt_expo_global = Math.round(line.sum_mt_expo_global).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    total_reference = Math.round(total_reference);

    if (line.ind_core_business == 'CIB') {
      if (line.ind_business_line == 'Global Market') {
        line.large_corporates = reference_larges[0].sum_mt_expo_global;
      }
    }
  });

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      date: req.params.year + '-' + req.params.month + '-01T00:00:00.000',
      current: { breakdown_current, total_current },
      previous: { breakdown_previous, total_previous },
      reference: { breakdown_reference, total_reference }
    }
  });
};
