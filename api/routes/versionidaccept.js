var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
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