// api/routes/inputs
const _ = require('lodash');
// Appel à la BDD
var knex = require('../utilities/database')

// Récupération de la liste des inputs liés à une contribution.

module.exports = {
    version: async function(req, res) {
        //Permet de vérifier les droits users avant d'envoyer le json
        const contribution_id = req.params.contribution_id;
        const version_id = req.params.version_id;
        // const user_id = req.params.user_id;
        // const role = req.params.role;
        // const modules = require('./modules');
        // const query = await modules.getPoliciesWContribId(contribution_id, user_id);
        // if (query == 1){
            const inputs = await knex.select(
                'input.id AS input_id',
                'input.input_type AS input_type',
                'input.name AS input_name',
                'input.description AS input_description',
                'input.slug AS input_slug',
                'value.id AS input_value_id',
                'value.value AS input_value',
                'version.comment_contributor AS comment_contributor',
                'version.highlight AS highlight'
            )
            .from('contributions_values as value')
            .innerJoin('contributions_inputs as input', 'value.input_id', 'input.id')
            .innerJoin('versions as version', 'value.version_id', 'version.id')
            .where({
                'version.id': version_id
            });

            const contribution = await knex.select(
                'contribution.id AS contribution_id',
                'contribution.name AS contribution_name',
                'contribution.limit AS contribution_limit',
                'contribution.threshold AS contribution_threshold'
            )
            .from('contributions as contribution')
            .where({ 'contribution.id': contribution_id })

            res.json({
                input: inputs[0],
                contribution: contribution[0]
            })
        // } else 
        //     res.json(null)
        // }
    }
};
