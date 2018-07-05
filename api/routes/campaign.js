var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const uuidv4 = require('uuid/v4');

// Changer les status d'une contribution afin de créer la première version

module.exports = (req,res,next) => {
    let versionId = uuidv4();
    var contributionId = req.body.contribution_id;

    return knex('versions').insert({
        // Valeur créées par l'utilisateur
        contribution_id:req.body.contribution_id,
        name:req.body.name,
        user_id:req.body.user_id,
        starts_at:req.body.starts_at,
        ends_at:req.body.ends_at,
        // Valeurs rentrées automatiquement mais nécessaire pour la DB
        id:versionId,
        contribution_id:contributionId, // ou req params ?
        // Valeurs entrées par défaut lors de la création d'une contribution
        file_binary:'null',
        status_admin:'delivered',
        status_contributor:'not delivered',
    })
        .then(function(response){
            next();
        })
        .catch(function(err) {
            console.log(err)
        })
    .catch(function(err) {
        console.log(err)
    });
}