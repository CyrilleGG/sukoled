// api/routes/contributionFiliale.js
// Appel à la BDD
var knex = require('../utilities/database')
// Module permettant de générer un UUID, ici V4.
const uuidv4 = require('uuid/v4');

// Creation d'une contribution : on envoie au front le department_slug et le version_name pour l'affichage.
// Ce fichier sert dans les cas où le contributeur participe pour la première ou énième fois.
// Ainsi, même si à la première étape il n'y a pas de commentaire admin, on en envoie quand même un.

module.exports = {
    sendInfoToDBFiliale: async function (req, res) {

        let new_version_id = uuidv4();
        // Récupération des données
        const version_id = req.params.version_id;
        const modules = require('./modules')
        const version = await modules.getVersionById(version_id);
        const user_id = req.body.user_id;
        const comment_contributor = req.body.comment_contributor;
        const contribution_id = req.body.contribution_id;
        const highlight = req.body.highlight;
        const files_names = req.body.files_names.split(',');
        const files = [];
        const regex = /(file_[1-9])/
        for (var key in req.body) {
            if (regex.test(key)) {
                let id = uuidv4();
                files.push({
                    id: id,
                    binary: req.body[key],
                    version_id: new_version_id,
                    contribution_id: contribution_id,
                    user_id: user_id
                })
            }
        }
        for (var i = 0; i < files_names.length; i++) {
            files[i]['name'] = files_names[i]
        }

        return knex('versions')
        // Insertion des données dans la table 'contributions' - id est généré précédemment
        .insert({
            // Informations remplies par le contributeur
            file_csv: req.body.file_csv,
            file_json: req.body.file_json,
            file_binary:req.body.file_0,
            comment_contributor: comment_contributor,
            highlight:highlight,
            // Informations remplies automatiquement mais nécessaire pour la DB
            id: new_version_id,
            name: version[0].name,
            status_admin: 'delivered',
            status_contributor: 'pending',
            starts_at: version[0].starts_at,
            ends_at: version[0].ends_at,
            contribution_id: contribution_id,
            parent_version_id: version_id,
            user_id: user_id
        })
            .then(function(response){
                return knex.batchInsert('files', files)
                    .then(function(responseB) {
                        res.json('ok')
                    })
                    .catch(function(err) {
                        res.json(err)
                    })
            })
            .catch(function(err) {
                res.json(err)
            });
    },

    sendJSONDataFiliale: async function (req, res) {

        const version_id = req.params.version_id;
        const contribution_id = req.params.contribution_id
        const user_id = req.params.user_id;
        // Appel des modules (routes/modules.js)
        const modules = require('./modules')
        // const query = await modules.getPoliciesWVersionId(version_id, user_id);
        // if (query == 1) {
        const department_slug = await modules.getDepSlugByVersion(version_id);
        const version_name = await modules.getVersionNameByVersion(version_id);
        const contribution = await modules.getContributionById(contribution_id);
        const comment_admin = await modules.getAdminComment(version_id);
        // const inputs = await knex.select(
        //     'input.id AS input_id',
        //     'input.input_type AS input_type',
        //     'input.name AS input_name',
        //     'input.description AS input_description',
        //     'input.slug AS input_slug'
        // )
        //     .from('contributions_inputs as input')
        //     .where({ 'input.contribution_id': req.params.contribution_id })

        const data = {
            department_slug,
            version_name,
            contribution,
            comment_admin,
            // inputs
        }
        res.status(200).json(data);
        // } else {
        //     res.json(null);
        // }
    },
}
