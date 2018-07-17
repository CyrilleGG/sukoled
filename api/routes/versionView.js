// api/routes/versionView
// Afficher les données liées à une version - contributor & admin
module.exports = {
    SendJSONDataContribView:async function(req, res) {

        const version_id = req.params.version_id;
        const contribution_id = req.params.contribution_id;
        // Appel de la route module (routes/modules.js)
        const modules = require('./modules');
        // const query = await modules.getPoliciesWVersionId(version_id, user_id);
        // if (query == 1) {
            // Appel des modules (routes/modules.js)
            // On récupère les données rentrées par le contributeur et l'administrateur et on les affiches
            // Contributeur : version_file, comment_contributor, hightlight
            // Admin : department_slug, contribution_name, version_name, comment_admin
            const version = await modules.getVersionById(version_id);
            const contribution = await modules.getContributionById(contribution_id)

            const data = {
                contribution: {
                    contribution_id: contribution_id,
                    contribution_name: contribution[0].name
                },
                input: {
                    comment_admin: version[0].comment_admin,
                    comment_contributor: version[0].comment_contributor,
                    highlight: version[0].highlight,
                    version_file: version[0].file_binary // Envoyé : file_binary
                },
                
            };
            res.status(200).json(data);
        // } else {
        //     res.json(null);
        // }
    },
}