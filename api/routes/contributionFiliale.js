// api/routes/contributionFiliale.js
// Appel à la BDD
var knex = require('../utilities/database')
// Module permettant de générer un UUID, ici V4.
const uuidv4 = require('uuid/v4');
// const xlsx = require('node-xlsx').default;

// Creation d'une contribution : on envoie au front le department_slug et le version_name pour l'affichage.
// Ce fichier sert dans les cas où le contributeur participe pour la première ou énième fois.
// Ainsi, même si à la première étape il n'y a pas de commentaire admin, on en envoie quand même un.

module.exports = {
    sendInfoToDBFiliale:async function(req, res) {
        let new_version_id = uuidv4();
        // Récupération des données
        const version_id = req.body.version_id;
        const modules =  require('./modules')
        const dateAndName = await modules.dateAndName(version_id);
        const user_id =  req.body.user_id;
        const contribution_id = await
            knex('versions')
            .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
            .select('contributions.id')      

        console.log(req.body.excel)
        // const contribution_id = '12c0b1f4-7eac-11e8-80a5-0a0a4839146e'

        return knex('versions')
        // Insertion des données dans la table 'contributions' - id est généré précédemment
        .insert({
            // Informations remplies par le contributeur
            file_binary:req.body.excel,
            comment_contributor:req.body.comments,
            highlight:req.body.hightlights,
            // Informations remplies automatiquement mais nécessaire pour la DB
            id:new_version_id,
            status_admin:'delivered',
            status_contributor:'pending',
            contribution_id:contribution_id[0].id,
            parent_version_id:version_id,
            user_id:'user_id',
            name:dateAndName[0].name,
            starts_at:dateAndName[0].starts_at,
            ends_at:dateAndName[0].ends_at,
            user_id:req.body.user_id
        })
            .then(function(response){
            // Ici, on sort de la fonction pour éviter qu'elle reboucle.
            res.json(null)
        })
        .catch(function(err) {
            console.log(err)
        });
    },

    sendJSONDataFiliale:async function(req, res) {

        const version_id = req.params.version_id;
        const user_id = req.params.user_id;
        // Appel des modules (routes/modules.js)
        const modules = require('./modules')
        // const query = await modules.getPoliciesWVersionId(version_id, user_id);
        // if (query == 1) {
            const department_slug = await modules.getDepSlugByVersion(version_id);
            const version_name = await modules.getVersionNameByVersion(version_id);
            const comment_admin = await modules.getAdminComment(version_id);

            const data = await {
                department_slug,
                version_name,
                comment_admin
            }
            res.status(200).json(data);
        // } else {
        //     res.json(null)
        // }
    },
}