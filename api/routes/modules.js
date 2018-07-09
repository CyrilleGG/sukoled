// modules
var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const db = require('../db');
var users = require('../db/users.js');

// Liste des modules utilisés à travers différents fichiers

// Récupération de la liste des users
module.exports.getUsers = async function(user) {
    var user = users.map(a => a.username);
    return user;
    // res.status(200).json(user)
}

// Récupération de la liste des départements
module.exports.getDepartments = async function(dep) {
    var dep = null;
    return knex('departments')
    .select('slug','name')
    .then((departments) => {
        dep = (departments);
        return dep;
        // res.status(200).json(dep);
    })
    .catch((error) => {
        console.log(error);
    });
}

// Envoie des données de la contribution
module.exports.getContributionById = async function(contributionId){
    return knex('contributions')
    .select('id as contribution_id', 'name', 'period')
    .where({'id':contributionId})
    .then((result) => {
        return result
    })
}

// Envoie des versions liés à la contribution
module.exports.getVersionWContributionId = async function(contributionId){
    return knex('versions')
    .select('versions.id as version_id')
    .where({'contribution_id':contributionId})
    .then((result)=>{
        return result
    })
}

// Envoie du department lié à la version
module.exports.getDepSlugByVersion = async function(version_id){
    return knex('versions')
    .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
    .join('departments','contributions.department_id','=','departments.id')
    .where({'versions.id':version_id})
    .select('departments.slug')
    .then(function(response){
        return response[0].slug;
    })
    .catch((error) => {
        console.log(error);
    });
}

// Envoie du nom de la contribution lié à la version
module.exports.getContribNameByVersion = async function(version_id){
    return knex('versions')
    .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
    .where({'versions.id':version_id})
    .select('contributions.name')
    .then(function(response){
        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
        return response[0].name;
    })
    .catch((error) => {
        console.log(error);
    });
}

// Envoie du nom de la version
module.exports.getVersionNameByVersion = async function(version_id){
    return knex('versions')
    .where({'versions.id':version_id})
    .select('versions.name')
    .then(function(response){
        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
        return response[0].name;
    })
    .catch((error) => {
        console.log(error);
    });
}

// Envoie du commentaire administrateur lié à la version
module.exports.getAdminComment = async function(version_id){
    return knex('versions')
    .where({'versions.id':version_id})
    .select('comment_admin')
    .then(function(response){
        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
        return response[0].comment_admin;
    })
    .catch((error) => {
        console.log(error);
    });
}

// Envoie du commentaire du contributeur lié à la version
module.exports.getContributorComment = async function(version_id){
    return knex('versions')
    .where({'versions.id':version_id})
    .select('comment_contributor')
    .then(function(response){
        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
        return response[0].comment_contributor;
    })
    .catch((error) => {
        console.log(error);
    });
}

// Envoie de l'highlight lié à la version
module.exports.getHighlight = async function(version_id){
    return knex('versions')
    .where({'versions.id':version_id})
    .select('highlight')
    .then(function(response){
        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
        // console.log(response[0].highlight)
        return response[0].highlight;
    })
    .catch((error) => {
        console.log(error);
    });
}

// Envoie du fichier (file_binary) lié à la version
module.exports.getVersionFile = async function(version_id){
    return knex('versions')
    .where({'versions.id':version_id})
    .select('file_binary')
    .then(function(response){
        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
        return response[0].file_binary;
    })
    .catch((error) => {
        console.log(error);
    });
}

module.exports.getPoliciesWContribId = async function(contribution_id, user_id){
    return knex('policies')
    .where({
        'policies.contribution_id':contribution_id,
        'policies.user_id':user_id
    })
    .select('policies.can_read')
    .then(function(response){
        return response[0].can_read
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports.getPoliciesWVersionId = async function(version_id, user_id){
    return knex('policies')
    .join('contributions', 'policies.contribution_id', '=', 'contributions.id')
    .join('versions', 'contributions.id', '=', 'versions.contribution_id')
    .where({
        'versions.id':version_id,
        'policies.user_id':user_id
    })
    .select('policies.can_read')
    .then(function(response){
        return response[0].can_read
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports.getContribWPolicies = async function(version_id, user_id){
    return knex('policies')
    .join('contributions', 'policies.contribution_id', '=', 'contributions.id')
    .join('versions', 'contributions.id', '=', 'versions.contribution_id')
    .where({
        'versions.id':version_id,
        'policies.user_id':user_id
    })
    .select('policies.can_read')
    .then(function(response){
        return response[0].can_read
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports.getFile = async function(version_id){
    return knex('versions')
    .where({
        'versions.id':version_id,
    })
    .select('file_binary')
    .then(function(response){
        return response[0].file_binary
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports.dateAndName =  function(version_id) {
    return knex('versions')
    .where({
        'versions.id':version_id
    })
    .select('starts_at', 'ends_at', 'name')
    .then(function(response){
        return response[0]
    })
    .catch((error)=>{
        console.log(error)
    })
}