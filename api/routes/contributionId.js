var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

// GET des informations de la table 'contributions' en fonction de l'id renvoyé dans l'URL.

module.exports = {
    sendInfoToClient:async function(req, res) {
        
        //Permet de vérifier les droits users avant d'envoyer le json

        const contribution_id = req.params.contribution_id;
        const user_id = req.params.user_id;
        const modules = require('./modules');
        const query = await modules.getPoliciesWContribId(contribution_id, user_id);
        if (query == 1) {
            const modules = require('./modules');
            const contributions = await modules.getContributionById(contribution_id);
            const versions = await modules.getVersionWContributionId(contribution_id);
    
            var data = (contributions.concat({versions:versions}));
    
            var data_version = {};
            for (var prop in versions) {
                if (versions.hasOwnProperty(prop)) {
                    data_version[prop] = versions[prop]
                }
            }
            console.log(data_version);
    
            var data = Object.assign({},...contributions, {"Versions":data_version})
            console.log(data)
    
            return res.json(data);
            // res.json('ok');
        } else {
            res.json(null);
        }
    }
}