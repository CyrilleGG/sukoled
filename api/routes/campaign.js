var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const uuidv4 = require('uuid/v4');

// Changer les status d'une contribution afin de créer la première version

module.exports = (req,res,next) => {
    let versionId = uuidv4();
    var contributionId = req.param('contribution_id');

    return knex('versions').insert({
        id:versionId,
        contribution_id:contributionId,
        file:'null',
        user_id:user_id,
        status_admin:'delivered',
        status_contributor:'pending',
        starts_at:starts_at,
        ends_at:ends_at
    })
        .then(function(response){
            next();
    })
}