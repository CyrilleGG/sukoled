var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const uuidv4 = require('uuid/v4');

// Changer les status d'une contribution afin de créer la première version

module.exports = (req,res,next) => {
    let versionId = uuidv4();
    // var contributionId = req.params('contribution_id');

    return knex('versions').insert({
        id:versionId,
        // contribution_id:contributionId,
        contribution_id:req.body.contribution_id,
        file:'null',
        user_id:req.body.user_id,
        status_admin:'delivered',
        status_contributor:'not delivered',
        starts_at:req.body.starts_at,
        ends_at:req.body.ends_at,
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