// api\routes\versionidrefused.js
var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const uuidv4 = require('uuid/v4');

// Créer une nouvelle version avec les mêmes paramètres que la précédente mais en changeant les status.

module.exports = {
    sendInfoToDBRefuse:async function(req, res, next) {

        let new_version_id = uuidv4();
        var versionId = req.params.version_id;
        const contributionId = 
            knex('versions')
            .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
            .select('contributions.id')
        //     .then(function(response){
        //         return response
        // })
        const file = knex('versions').select('file_binary').where({'id':versionId});
        const starts_at = knex('versions').select('starts_at').where({'id':versionId});
        console.log(starts_at)
        const ends_at = knex('versions').select('ends_at').where({'id':versionId});

        const testdebog = knex('versions').insert({
            id: new_version_id,
            contribution_id: contributionId,
            parent_version_id: versionId,
            file_binary: file,
            user_id: req.body.user_id,
            comment_admin: req.body.comment,
            status_admin: 'progress',
            status_contributor: 'invalid',
            starts_at: starts_at,
            ends_at: ends_at
        })
        console.log(testdebog)

        // return knex('versions').insert({
        //     id:new_version_id,
        //     contribution_id:contributionId,
        //     parent_version_id:versionId,
        //     file_binary:file,
        //     user_id:req.body.user_id,
        //     comment_admin:req.body.comment,
        //     status_admin:'progress',
        //     status_contributor:'invalid',
        //     starts_at:starts_at,
        //     ends_at:ends_at
        // })
        //     .then(function(response){
        //         console.log(response);
        //         next();
        // })
        //     .catch(function(err) {
        //         console.log(err)
        // })
    },
    

    sendJSONDataRefuse:async function(req, res) {

        const version_id = req.params.version_id;
        const user_id = req.params.user_id;
        // Appel des modules (routes/modules.js)
        const modules = require('./modules')
        const query = await modules.getPoliciesWVersionId(version_id, user_id);
        if (query == 1) {
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
        } else {
            res.json(null);
        }
    }
}