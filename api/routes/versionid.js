var knex = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});

// GET des informations de la table et 'version' en fonction de l'id renvoyé dans l'URL.

module.exports = (req,res) => {
    var contributionId = req.param('contribution_id');
    var vid = req.param('version_id');

    knex('versions').join('contributions', 'versions.contribution_id', '=', 'contributions.id').join('inputs_contributions', 'versions.contribution_id', '=', 'inputs_contributions.contribution_id')
    .select('*')
    .where({'versions.contribution_id':contributionId, 'versions.id':vid})
    .then((versions) => {
        res.json(versions);
    });
}