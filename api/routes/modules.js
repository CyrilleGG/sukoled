var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
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
        console.log(error);
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

module.exports.getDepSlugByVersion = async function(version_id){
    return knex('versions')
    .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
    .join('departments','contributions.department_id','=','departments.id')
    .where({'versions.id':version_id})
    .select('departments.slug')
    .then(function(response){
        return response;
    })
    .catch((error) => {
        console.log(error);
    });
}

module.exports.getContribNameByVersion = async function(version_id){
    return knex('versions')
    .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
    .where({'versions.id':version_id})
    .select('contributions.name')
    .then(function(response){
        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
        return response;
    })
    .catch((error) => {
        console.log(error);
    });
}