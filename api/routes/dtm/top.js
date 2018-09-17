'use strict';

/**
 * Module dependencies.
 */

const oracle = require('../../utilities/oracle')

/**
 * DTM Top 20.
 */

module.exports = async (req, res) => {
  const companies_current = await oracle('dtm')
    .select(
      'LB_RAF_TET AS lb_raf_tet',
      'CD_RAF_TETE AS cd_raf_tete',
      'ANNEE AS year',
      'MOIS AS month',
      'IDT_PART as date',
      'CD_NOTE_INT_LIKE_SP_RAF_TET AS cd_note_int_like_sp_raf_tet',
  )
    .max('MT_LIMITE_TGR AS max_mt_limite_tgr')
    .sum('MT_EXPO_GLOBAL AS sum_mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      IND_RAFMDO: '0',
      IND_INTGPE: '0',
      IND_BAL2_RAF_TET: '1-ENTREPRISES',
      ANNEE: req.params.year,
      MOIS: req.params.month,
      VERS: '1'
    })
    .whereNotIn('CD_RAF_TETE', ['0111747', '0287090'])
    .andWhere(function () {
      this.where('MT_EXPO_GLOBAL', '>', '0').orWhere('CD_INSTRUMENT', '=', 'CASH FINANCEMENT CT')
    })
    .groupBy(
      'LB_RAF_TET',
      'CD_RAF_TETE',
      'ANNEE', 'MOIS',
      'CD_NOTE_INT_LIKE_SP_RAF_TET'
    )
    .orderBy('SUM_MT_EXPO_GLOBAL', 'DESC')
    .limit(20);

  let total_current = 0;
  companies_current.forEach(company => {
    total_current += company.sum_mt_expo_global;
    company.sum_mt_expo_global = Math.round(company.sum_mt_expo_global / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    company.max_mt_limite_tgr = Math.round(company.max_mt_limite_tgr / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  });

  const companies_reference = await oracle('dtm')
    .select(
      'LB_RAF_TET AS lb_raf_tet',
      'CD_RAF_TETE AS cd_raf_tete',
      'ANNEE AS year',
      'MOIS AS month',
      'CD_NOTE_INT_LIKE_SP_RAF_TET AS cd_note_int_like_sp_raf_tet',
  )
    .max('MT_LIMITE_TGR AS max_mt_limite_tgr')
    .sum('MT_EXPO_GLOBAL AS sum_mt_expo_global')
    .where({
      IND_RAFGEN: '0',
      IND_RAFPOOL: '0',
      IND_GBP: '0',
      IND_GCE: '0',
      IND_RAFMDO: '0',
      IND_INTGPE: '0',
      IND_BAL2_RAF_TET: '1-ENTREPRISES',
      ANNEE: '2017',
      MOIS: '12',
      VERS: '1'
    })
    .whereNotIn('CD_RAF_TETE', ['0111747', '0287090'])
    .andWhere(function () {
      this.where('MT_EXPO_GLOBAL', '>', '0').orWhere('CD_INSTRUMENT', '=', 'CASH FINANCEMENT CT')
    })
    .groupBy(
      'LB_RAF_TET',
      'CD_RAF_TETE',
      'ANNEE', 'MOIS',
      'CD_NOTE_INT_LIKE_SP_RAF_TET'
    )
    .orderBy('SUM_MT_EXPO_GLOBAL', 'DESC')
    .limit(20);

  let total_reference = 0;
  companies_reference.forEach(company => {
    total_reference += company.sum_mt_expo_global;
  });


  return res.status(200).json({
    statusCode: 200,
    message: 'Ok',
    data: {
      date: companies_current[0].month + '-01-' + companies_current[0].year,
      companies: companies_current,
      total: {
        current: Math.round(total_current / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        reference: Math.round(total_reference / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      }
    }
  });
};
