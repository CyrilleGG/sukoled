var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

// GET des informations de la table et 'version' en fonction de l'id renvoyé dans l'URL.

module.exports = (req,res) => {
    var contributionId = req.params.contribution_id;
    var vid = req.params.version_id;

    knex('versions').join('contributions', 'versions.contribution_id', '=', 'contributions.id')
    .join('inputs_contributions', 'versions.contribution_id', '=', 'inputs_contributions.contribution_id')
    .select('*')
    .where({'versions.contribution_id':contributionId, 'versions.id':vid})
    .then((versions) => {
        res.json(versions);
    });
}