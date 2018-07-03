var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const db = require('../db');
var users = require('../db/users.js');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');

// Creation d'une contribution : on envoie au front le slug (ou le nom) pour l'affichage.

module.exports = {
    sendInfoToDB:async function(req, res, next) {
        var dep = req.body.department_id
        var departmentID = knex.from('departments').where({'slug':dep}).select('id')
        let contribution_id = uuidv4();        

        return knex('contributions')
        // Insertion des données dans la table 'contributions' - id est généré précédemment
        .insert({
            name:req.body.name, 
            period:req.body.period,
            user_id:req.body.user_id,
            department_id:departmentID,
            limit:req.body.limit,
            threshold:req.body.threshold,
            id:contribution_id
        })
            .then(function(response){
                let input_id = uuidv4();
                return  knex('inputs_contributions')
                    // Insertion des données dans la table 'inputs_contributions' - contribution_id est l'id généré précédemment
                    .insert({
                        id: input_id,
                        input_type:req.body.input,
                        name:req.body.inputName,
                        description:req.body.description,
                        contribution_id:contribution_id
                    })
                    .then(function(responseB){
                        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
                        next();
                    })
                    .catch(function(err) {
                        console.log(err)
                    });
            })
            .catch(function(err) {
                console.log(err)
            });
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