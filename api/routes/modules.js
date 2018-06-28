var knex = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});
const db = require('../db');
var users = require('../db/users.js');

// Liste des modules utilisés à travers différents fichiers

// Récupération de la liste des users
module.exports.getUsers = async function(user) {
    console.log('getUsers')
    var user = users.map(a => a.username);
    return user;
    // res.status(200).json(user)
}

// Récupération de la liste des départements
module.exports.getDepartments = async function(dep) {
    console.log('getDep')
    var dep = null;
    return knex('departments').select('slug','name')
    .then((departments) => {
        dep = (departments);
        console.log(dep);
        return dep;
        // res.status(200).json(dep);
    })
    .catch((error) => {
        console.log('false');
    });
}

module.exports.getContributionById = async function(contributionId){
    return knex('contributions').select('id as contribution_id', 'name', 'period').where({'id':contributionId}).then((result) => {
        return result
    })
}

module.exports.getVersionWContributionId = async function(contributionId){
    return knex('versions').select('versions.id as version_id').where({'contribution_id':contributionId}).then((result)=>{
        return result
    })
}