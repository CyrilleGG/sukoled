var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const db = require('../db');
var users = require('../db/users.js');
const _ = require('lodash');

// Creation d'une contribution : on envoie au front le slug (ou le nom) pour l'affichage.

module.exports = {
    sendInfoToDB:async function(req, res, next) {
        var dep = req.body.department_id
        var departmentID = knex.from('departments').where({'slug':dep}).select('id')

        return knex('contributions')
        // Insertion des données dans la table 'contributions'
        .insert({name:req.body.name, 
            period:req.body.period,
            user_id:req.body.user_id,
            department_id:departmentID,
            limit:req.body.limit,
            threshold:req.body.threshold})
            .returning('id') // select
            .then(function(response){
                return knex('inputs_contributions')
                // Insertion des données dans la table 'inputs_contributions' (nécessite l'ID de la contribution)
                .insert({input_type:req.body.input,
                    name:req.body.inputName,
                    description:req.body.description,
                    contribution_id:response[0]})
                    .returning('contribution_id')
                    .then(function(response){
                        return knex('versions')
                        // Insertion des données dans la table 'versions' (nécessite l'ID de la contribution)
                        .insert({file:req.body.file,
                            user_id:req.body.user_id,
                            contribution_id:response[0],
                            status_admin:req.body.status_admin,
                            status_contributor:req.body.status_contributor,
                            starts_at:req.body.starts_at,
                            ends_at:req.body.ends_at
                        },
                        next());
                    })
            })
    },

    sendJSONData:async function(req, res) {

        // Appel de modules (routes/modules.js)

        const modules = require('./modules');
        const users = await modules.getUsers();
        const departments = await modules.getDepartments();

        console.log(users);
        const data = {
            departments,
            users
        }
        console.log('JSONData2');
        res.status(200).json(data);
    },
}