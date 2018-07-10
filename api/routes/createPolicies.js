// api\routes\versionidrefused.js
// Appel à la BDD
var knex = require('../utilities/database')
// Module permettant de générer un UUID, ici V4.
const uuidv4 = require('uuid/v4');

// Création des droits pour une utilisateur.
// Les utilisateurs proviennent du ldap et il n'est pas possible d'en créer depuis l'application.
// On envoie au front la liste des utilisateurs et des contributions.
// Il est aussi possible de supprimer des droits.

module.exports = {
    sendInfoToDBPolicies:async function(req, res) {

        let new_id = uuidv4();
        var contribution_id = req.body.contribution_id;
        let user_id = req.body.user_id;

        return knex('policies').insert({
            id:new_id,
            contribution_id:contribution_id,
            can_read:'1',
            can_write:'1',
            user_id:user_id
        })
            .then(function(response){
                res.json('ok');
        })
            .catch(function(err) {
                res.json(err)
        })
    },
    
    sendJSONDataPolicies:async function(req, res) {

        // Appel des modules (routes/modules.js)
        const modules = require('./modules')
        const departments = await modules.getDepartments();
        const users = await modules.getUsers();

        const data = {
            departments,
            users
        }
        res.status(200).json(data);
    },

    deletePolicies:async function(req, res) {

        var contribution_id = req.params.contribution_id;
        let user_id = req.params.user_id;
        knex('policies')
        .where({
            'policies.contribution_id':contribution_id,
            'policies.user_id':user_id
        })
        .del()
    }
}