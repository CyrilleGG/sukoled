// api/routes/versionidrefused.js
// Appel à la BDD
var knex = require('../utilities/database')
// Module permettant de générer un UUID, ici V4.
const uuidv4 = require('uuid/v4');

// Créer une nouvelle version avec les mêmes paramètres que la précédente mais en changeant les status.

module.exports = {
    sendInfoToDBRefuse:async function(req, res) {

        let new_version_id = uuidv4();
        let new_value_id = uuidv4();
        const version_id = req.params.version_id;
        const contribution_id = req.params.contribution_id;
        const input_value_id = req.body.input_value_id
        const modules = require('./modules')
        const file = await modules.getFile(version_id);
        const version = await modules.getVersionById(version_id);
        const contributionValues = await modules.getContributionValuesById(input_value_id)

        return knex.insert({
            // Informations remplies par le contributeur
            comment_admin: req.body.comment,
            // Informations remplies automatiquement mais nécessaire pour la DB
            file_binary: file,
            id: new_version_id,
            name: version[0].name,
            contribution_id: contribution_id,
            parent_version_id: version_id,
            user_id: req.body.user_id,
            status_admin: 'progress',
            status_contributor: 'invalid',
            starts_at: version[0].starts_at,
            ends_at: version[0].ends_at,
            comment_contributor: version[0].comment_contributor,
            highlight: version[0].highlight
            })
            .into('versions')
                .then(function(response){
                    return knex.insert( {
                        id: new_value_id,
                        value: contributionValues[0].value,
                        contribution_id: contributionValues[0].contribution_id,
                        version_id: new_version_id,
                        input_id: contributionValues[0].input_id
                    })
                    .into('contributions_values')
                        .then((res) => {
                            res.json('ok')
                        })
                        .catch((err) => {
                            res.json(err)
                        })

                })
                .catch((err) => {
                    res.json(err);
                });
    },
    

    sendJSONDataRefuse:async function(req, res) {

        const version_id = req.params.version_id;
        const user_id = req.params.user_id;
        // Appel des modules (routes/modules.js)
        // const modules = require('./modules')
        // const query = await modules.getPoliciesWVersionId(version_id, user_id);
        // if (query == 1) {
            return knex('versions')
            .select(
                'versions.file_binary as file', 
                'versions.comment_contributor as comment_contributor', 
                'contributions.name as contribution_name', 
            )
            .where({'versions.id':version_id})
            .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
            .then((response) => {
                return res.status(200).json(response);
            })
            .catch((err) => {
                res.json(err);
            });
        // } else {
        //     res.json(null);
        // }
    }
}