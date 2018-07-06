const _ = require('lodash');
var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

module.exports = {
    version: async function(req, res) {
        //Permet de vérifier les droits users avant d'envoyer le json
        const contribution_id = req.params.contribution_id;
        const user_id = req.params.user_id;
        const modules = require('./modules');
        const query = await modules.getPoliciesWContribId(contribution_id, user_id);
        if ((query == 1) || (role == 'mod')){
            const inputs = await knex.select(
                'input.id AS input_id',
                'input.input_type AS input_type',
                'input.name AS input_name',
                'input.description AS input_description',
                'input.priority AS input_priority',
                'value.value AS input_value',
                'contribution.id AS contribution_id',
                'contribution.name AS contribution_name',
                'version.id AS contribution_version_id',
                'version.name AS contribution_version_name',
                'department.name AS department_name'
            )
            .from('contributions_values as value')
            .innerJoin('contributions_inputs as input', 'value.input_id', 'input.id')
            .innerJoin('contributions as contribution', 'input.contribution_id', 'contribution.id')
            .innerJoin('versions as version', 'value.version_id', 'version.id')
            .innerJoin('departments as department', 'contribution.department_id', 'department.id')
            .where({
                'contribution.id': req.params.contribution_id,
                'version.id': req.params.version_id
            });

            res.json({ inputs })
        } else {
            res.json(null)
        }
    }
};
