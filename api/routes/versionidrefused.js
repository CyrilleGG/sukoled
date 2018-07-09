// api/routes/versionidrefused.js
// Appel à la BDD
var knex = require('../utilities/database')
// Module permettant de générer un UUID, ici V4.
const uuidv4 = require('uuid/v4');

// Créer une nouvelle version avec les mêmes paramètres que la précédente mais en changeant les status.

module.exports = {
    sendInfoToDBRefuse:async function(req, res) {

        let new_version_id = uuidv4();
        var version_id = req.params.version_id;
        const contribution_id = req.params.contribution_id;
        const modules = require('./modules')
        const file = await modules.getFile(version_id);
        const dateAndName = await modules.dateAndName(version_id);

        return knex.insert({
            // Informations remplies par le contributeur
            comment_admin: req.body.comment,
            // Informations remplies automatiquement mais nécessaire pour la DB
            file_binary: file,
            id: new_version_id,
            name: dateAndName[0].name,
            contribution_id: contribution_id[0].id,
            parent_version_id: version_id,
            user_id: req.body.user_id,
            status_admin: 'progress',
            status_contributor: 'invalid',
            starts_at: dateAndName[0].starts_at,
            ends_at: dateAndName[0].ends_at,
            user_id:'test'
            })
            .into('versions')
            .then(function(response){
                res.json(null)
            })
            .catch(function(err) {
                console.log(err)
            })
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
            .catch((error) => {
                console.log(error);
            });
        // } else {
        //     res.json(null);
        // }
    }
}