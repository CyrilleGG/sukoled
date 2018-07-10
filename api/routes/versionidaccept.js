// api/routes/versionidaccept
// Appel à la BDD
var knex = require('../utilities/database')

// Changer les status d'une contribution afin de lui donner le status "acceptée"

module.exports = (req,res) => {
    var versionId = req.params.version_id;

    knex('versions')
    .where({'versions.contribution_id':contributionId, 'versions.id':versionId})
    .update({status_admin:'done', status_contributor:'done'})
    .then(() => {
        res.json(null)
    })
}