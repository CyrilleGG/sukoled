// api/routes/versionView
// Afficher les données liées à une version - contributor & admin
module.exports = {
    SendJSONDataContribView:async function(req, res) {

        const version_id = req.params.version_id;
        const user_id = req.params.user_id;
        // Appel de la route module (routes/modules.js)
        const modules = require('./modules');
        // const query = await modules.getPoliciesWVersionId(version_id, user_id);
        // if (query == 1) {
            // Appel des modules (routes/modules.js)
            // On récupère les données rentrées par le contributeur et l'administrateur et on les affiches
            // Contributeur : version_file, comment_contributor, hightlight
            // Admin : department_slug, contribution_name, version_name, comment_admin
            const department_slug = await modules.getDepSlugByVersion(version_id);
            const contribution_name = await modules.getContribNameByVersion(version_id);
            const version_name = await modules.getVersionNameByVersion(version_id);
            const comment_admin = await modules.getAdminComment(version_id);
            const version_file = await modules.getVersionFile(version_id);
            const comment_contributor = await modules.getContributorComment(version_id);
            const highlight = await modules.getHighlight(version_id);

            const data = {
                department_slug,
                contribution_name,
                version_name,
                version_file, // Envoyé : file_binary
                comment_contributor,
                comment_admin,
                highlight,
            };
            res.status(200).json(data);
        // } else {
        //     res.json(null);
        // }
    },
}