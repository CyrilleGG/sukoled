var pg = require('pg');
var knex = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});
const db = require('../db');
var users = require('../db/users.js');
const _ = require('lodash');

module.exports = {
    // var department = knex.from('departments').where({name:req.body.department_id}).select('slug')
    sendInfoToDB:function(req, res, next) {
        console.log('GET IN, LOSER')

        var dep = req.body.department_id
        var departmentID = knex.from('departments').where({'slug':dep}).select('id')

        return knex('contributions').insert({name:req.body.name, 
            period:req.body.period,
            user_id:req.body.user_id,
            department_id:departmentID,
            limit:req.body.limit,
            threshold:req.body.threshold})
            .returning('id')
            .then(function(response){
                return knex('inputs_contributions').insert({input_type:req.body.input,
                    name:req.body.inputName,
                    description:req.body.description,
                    contribution_id:response[0]
                })
            })

        next()
    },

    sendJSONData:async function(req, res) {

        console.log('JSONData')
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

console.log('createcontrib')