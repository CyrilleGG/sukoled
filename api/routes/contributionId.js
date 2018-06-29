var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

// GET des informations de la table 'contributions' en fonction de l'id renvoyé dans l'URL.

module.exports = {
    sendInfoToClient:async function(req, res) {
        var contributionId = req.param('contribution_id');
        
        console.log("____________________________________________________")
        
        const modules = require('./modules');
        const contributions = await modules.getContributionById(contributionId);
        const versions = await modules.getVersionWContributionId(contributionId);

        console.log("____________________________________________________")

        var data = (contributions.concat({versions:versions}));

        var data_version = {};
        for (var prop in versions) {
            if (versions.hasOwnProperty(prop)) {
                data_version[prop2] = versions[prop]
            }
        }
        console.log(data_version);

        var data = Object.assign({},...contributions, {"Versions":data_version})
        console.log(data)

        return res.json(data);
    }
}