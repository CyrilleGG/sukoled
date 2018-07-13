// api/routes/modules.js
var knex = require('../utilities/database')
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
    .catch((err) => {
        return []
    });
}

// Envoie des données de la contribution
module.exports.getContributionById = async function(contributionId){
    return knex('contributions')
    .select('id as contribution_id', 'name', 'period', 'limit', 'threshold')
    .where({'id':contributionId})
    .then((result) => {
        return result
    })
    .catch((err) => {
        return []
    });
}

module.exports.getContributionValuesById = async function (valueId) {
    return knex('contributions_values')
        .select('id as input_value_id', 'value', 'contribution_id', 'version_id', 'input_id')
        .where({ 'id': valueId })
        .then((result) => {
            return result
        })
        .catch((err) => {
            return []
        });
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
    .catch((err) => {
        return []
    });
}

// Envoie du department lié à la version
module.exports.getDepSlugByContribution = async function (contribution_id) {
    return knex('contributions')
        .join('departments', 'contributions.department_id', '=', 'departments.id')
        .where({ 'contributions.id': contribution_id })
        .select('departments.slug')
        .then(function (response) {
            return response[0].slug;
        })
        .catch((err) => {
            return []
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
    .catch((err) => {
        return []
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
    .catch((err) => {
        return []
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
    .catch((err) => {
        return []
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
    .catch((err) => {
        return []
    });
}

// Envoie de l'highlight lié à la version
module.exports.getHighlight = async function(version_id){
    return knex('versions')
    .where({'versions.id':version_id})
    .select('highlight')
    .then(function(response){
        // Ici, on sort de la fonction pour éviter qu'elle reboucle.
        return response[0].highlight;
    })
    .catch((err) => {
        return []
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
    .catch((err) => {
        return []
    });
}

// Récupération des droits en fonction de la contribution_id et de l'user_id
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
    .catch((err) => {
        return []
    });
}

// Récupération des droits en fonction de la version_id et de l'user_id
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
    .catch((err) => {
        return []
    });
}

// Récupération du file en fonction de l'user_id
module.exports.getFile = async function(version_id){
    return knex('versions')
    .where({
        'versions.id':version_id,
    })
    .select('file_binary')
    .then(function(response){
        return response[0].file_binary
    })
    .catch((err) => {
        return []
    });
}

// Récupération d'infos de la versions : starts_at, ends_at et name
module.exports.getVersionById =  function(version_id) {
    return knex('versions')
    .where({
        'id':version_id
    })
    .select('*')
    .then(function(response){
        return response
    })
    .catch((err) => {
       return []
    });
}