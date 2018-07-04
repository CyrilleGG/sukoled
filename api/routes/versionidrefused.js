// api\routes\versionidrefused.js
var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

// Créer une nouvelle version avec les mêmes paramètres que la précédente mais en changeant les status.

module.exports = (req,res,next) => {
    var contributionId = req.params.contribution_id;
    var versionId = req.params.version_id;

    var file = "file";
    var user_id = "nico";
    var status_admin = "progress";
    var status_contributor = "invalid";
    var starts_at = "2018-06-20 10:37:07.288293+00";
    var ends_at = "2018-06-20 10:37:07.288293+00"

    return knex('versions').insert({
        // contribution_id:contributionId,
        // parent_version:versionId,
        // file:req.body.file,
        // user_id:req.body.user_id,
        // status_admin:'progress',
        // status_contributor:'invalid'
        contribution_id:contributionId,
        parent_version:versionId,
        file:file,
        user_id:user_id,
        status_admin:'progress',
        status_contributor:'invalid',
        starts_at:starts_at,
        ends_at:ends_at
    })
        .then(function(response){
            next();
    })
}