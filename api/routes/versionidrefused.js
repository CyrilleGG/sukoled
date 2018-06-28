var knex = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});

// Créer une nouvelle version avec les mêmes paramètres que la précédente mais en changeant les status.

module.exports = (req,res,next) => {
    var contributionId = req.param('contribution_id');
    var vid = req.param('version_id');

    var file = "file";
    var user_id = "nico";
    var status_admin = "progress";
    var status_contributor = "invalid";
    var starts_at = "2018-06-20 10:37:07.288293+00";
    var ends_at = "2018-06-20 10:37:07.288293+00"

    return knex('versions').insert({
        // contribution_id:contributionId,
        // parent_version:vid,
        // file:req.body.file,
        // user_id:req.body.user_id,
        // status_admin:req.body.status_admin,
        // status_contributor:req.body.status_contributor
        contribution_id:contributionId,
        parent_version:vid,
        file:file,
        user_id:user_id,
        status_admin:status_admin,
        status_contributor:status_contributor,
        starts_at:starts_at,
        ends_at:ends_at
    })
        .then(function(response){
            next();
    })
}