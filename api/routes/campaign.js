// api/routes/campaign.js
var knex = require('../utilities/database')
const uuidv4 = require('uuid/v4');

// Changer les status d'une contribution afin de créer la première version

module.exports = {
    sendInfoToDBCampaign:async function(req, res) {

        let versionId = uuidv4();

        return knex('versions').insert({
            // Valeur créées par l'utilisateur
            contribution_id:req.body.contribution_id,
            name:req.body.version_name,
            user_id:req.body.user_id,
            starts_at:req.body.starts_at,
            ends_at:req.body.ends_at,
            // Valeurs rentrées automatiquement mais nécessaire pour la DB
            id:versionId,
            // Valeurs entrées par défaut lors de la création d'une contribution
            file_binary:'null',
            status_admin:'hold',
            status_contributor:'not delivered',
        })
            .then(function(response){
                res.json('ok')
            })
            .catch(function(err) {
                res.json(err)
            })
        .catch(function(err) {
            res.json(err)
        });
    },

    SendJSONDataCampaign:async function(req, res) {
        return knex('contributions')
        .select(
            'contributions.id as contribution_id',
            'contributions.name as contribution_name',
            'contributions.department_id',
            'departments.slug as department_slug',
            'departments.name as department_name'
        )
        .join('departments', 'contributions.department_id', '=', 'departments.id')
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((err) =>{
            res.json(err)
        });
    }
}