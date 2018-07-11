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
        res.json(err);
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
    .catch((err) => {
        res.json(err);
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
        res.json(err);
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
        res.json(err);
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
        res.json(err);
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
        res.json(err);
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
        res.json(err);
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
        res.json(err);
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
        res.json(err);
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
        res.json(err);
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
        res.json(err);
    });
}

// Récupération d'infos de la versions : starts_at, ends_at et name
module.exports.dateAndName =  function(version_id) {
    return knex('versions')
    .where({
        'versions.id':version_id
    })
    .select('starts_at', 'ends_at', 'name')
    .then(function(response){
        return response
    })
    .catch((err) => {
        res.json(err);
    });
}