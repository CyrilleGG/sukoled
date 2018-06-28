var knex = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
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