var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const uuidv4 = require('uuid/v4');
const xlsx = require('xlsx');

// Creation d'une contribution : on envoie au front le slug (ou le nom) pour l'affichage.    

module.exports = {
    sendInfoToDBFiliale:async function(req, res, next) {
        let new_version_id = uuidv4();
        // Récupération des données
        const version_id = await req.params.version_id;
        const modules = await require('./modules')
        const dateAndName = await modules.dateAndName(version_id);
        const user_id = await req.body.user_id;
        const contribution_id = await
            knex('versions')
            .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
            .select('contributions.id')      

        const file_csv = xlsx.utils.sheet_to_csv(req.body.excel, {
            FS: ";"
        })

        return knex('versions')
        // Insertion des données dans la table 'contributions' - id est généré précédemment
        .insert({
            // Informations remplies par le contributeur
            file_csv: file_csv,
            file_binary:req.body.excel,
            comment_contributor:req.body.comments,
            highlight:req.body.hightlights,
            // Informations remplies automatiquement mais nécessaire pour la DB
            id:new_version_id,
            status_admin:'delivered',
            status_contributor:'pending',
            contribution_id:contribution_id,
            parent_version_id:version_id,
            user_id:user_id,
            name:dateAndName.name,
            starts_at:dateAndName.starts_at,
            ends_at:dateAndName.ends_at,
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

            const data = {
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
