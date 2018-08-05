'use strict';

/**
 * Module dependencies.
 */

const oracle = require('../../utilities/oracle');

/**
 * DTM Breakdown by economic sector.
 */

module.exports = async (req, res) => {
  const breakdown = await oracle('dtm')
    .select(
      'LB_REGRP_ACT_ECO_INT AS lb_regrp_act_eco_int',
      'CD_REGRP_ACT_ECO_INT AS cd_regrp_act_eco_int'
    )
    .sum('MT_EXPO_GLOBAL AS mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      ANNEE: req.params.year,
      MOIS: req.params.month
    })
    .andWhereNot({
      IND_BAL2: '3-RETAIL'
    })
    .whereNotIn('CD_REGRP_ACT_ECO_INT', ['', 'ZZZ'])
    .groupBy('CD_REGRP_ACT_ECO_INT');

    breakdown.forEach(sector => {
      sector.mt_expo_global = Math.round(sector.mt_expo_global / 1000000);
    });

  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      breakdown: breakdown,
      date: req.params.year + '-' + req.params.month + '-01T00:00:00.000'
    }
  });
};
