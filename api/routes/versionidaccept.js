var knex = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});

// Changer les valeur d'une contribution afin de lui donner le status "acceptée"

module.exports = (req,res,next) => {
    var contributionId = req.param('contribution_id');
    var vid = req.param('version_id');

    knex('versions')
    .where({'versions.contribution_id':contributionId, 'versions.id':vid})
    .update({status_admin:'done', status_contributor:'invalid'})
    .then(() => {
        next();
    })
}