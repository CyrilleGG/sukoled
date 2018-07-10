// api/routes/contributionRaf
// Appel à la BDD
var knex = require('../utilities/database')
// Module permettant de générer un UUID, ici V4.
const uuidv4 = require('uuid/v4');

// Creation d'une contribution : on envoie au front le slug (ou le nom) pour l'affichage.    

module.exports = {
    sendInfoToDBRaf: async function (req, res) {
        let new_version_id = uuidv4();
        // Récupération des données
        const version_id = req.params.version_id;
        const modules = require('./modules')
        const dateAndName = await modules.dateAndName(version_id);
        const user_id = req.body.user_id;
        const contribution_id = await
            knex('versions')
                .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
                .select('contributions.id')
                .then(function (response) {
                    return response
                })

        return knex('versions')
            // Insertion des données dans la table 'contributions' - id est généré précédemment
            .insert({
                // Informations remplies par le contributeur
                file: req.body.excel,
                // Informations remplies automatiquement mais nécessaire pour la DB
                id: new_version_id,
                status_admin: 'delivered',
                status_contributor: 'pending',
                contribution_id: contribution_id[0].id,
                parent_version_id: version_id,
                user_id: user_id,
                name: dateAndName[0].name,
                starts_at: dateAndName[0].starts_at,
                ends_at: dateAndName[0].ends_at,
                user_id: req.body.user_id
            })
            .then(function (response) {
                // Ici, on sort de la fonction pour éviter qu'elle reboucle.
                res.json('ok')
            })
            .catch(function (err) {
                res.json(err)
            });
    },

    sendJSONDataRaf: async function (req, res) {

        const version_id = req.params.version_id;
        const user_id = req.params.user_id;
        // Appel des modules (routes/modules.js)
        const modules = require('./modules')
        // const query = await modules.getPoliciesWVersionId(version_id, user_id);
        // if (query == 1) {
        const department_slug = await modules.getDepSlugByVersion(version_id);
        const version_name = await modules.getVersionNameByVersion(version_id);
        const comment_admin = await modules.getAdminComment(version_id);
        const inputs = await knex.select(
            'input.input_type AS input_type',
            'input.name AS input_name',
            'input.description AS input_description',
            'input.slug AS input_slug'
        )
            .from('contributions_inputs as input')
            .where({ 'input.contribution_id': req.params.contribution_id })

        const data = {
            department_slug,
            version_name,
            comment_admin,
            inputs
        }
        res.status(200).json(data);
        // } else {
        //     res.json(null);
        // }
    },
}