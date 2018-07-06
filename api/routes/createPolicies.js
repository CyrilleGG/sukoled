// api\routes\versionidrefused.js
var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const uuidv4 = require('uuid/v4');

// Créer une nouvelle version avec les mêmes paramètres que la précédente mais en changeant les status.

module.exports = {
    sendInfoToDBPolicies:async function(req, res, next) {

        let new_version_id = uuidv4();
        var contribution_id = req.body.contribution_id;
        let user_id = req.body.user_id;

        return knex('policies').insert({
            id:new_version_id,
            contribution_id:contribution_id,
            can_read:'1',
            can_write:'1',
            user_id:user_id
        })
            .then(function(response){
                next();
        })
            .catch(function(err) {
                console.log(err)
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