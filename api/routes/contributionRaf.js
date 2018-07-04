var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
const uuidv4 = require('uuid/v4');

// Creation d'une contribution : on envoie au front le slug (ou le nom) pour l'affichage.    

module.exports = {
    sendInfoToDBRaf:async function(req, res, next) {
        let new_version_id = uuidv4();
        // Récupération des données
        const version_id = req.params.version_id;
        const starts_at = knex('versions').select('starts_at').where({'id':version_id});
        const ends_at = knex('versions').select('ends_at').where({'id':version_id});
        const user_id = req.body.user_id;
        const contribution_id = 
            knex('versions')
            .join('contributions', 'versions.contribution_id', '=', 'contributions.id')
            .select('contributions.id')
            .then(function(response){
                return response
            })

        return knex('versions')
        // Insertion des données dans la table 'contributions' - id est généré précédemment
        .insert({
            // Informations remplies par le contributeur
            file:req.body.file,
            // Informations remplies automatiquement mais nécessaire pour la DB
            id:new_version_id,
            status_admin:'delivered',
            status_contributor:'pending',
            contribution_id:contribution_id,
            parent_version_id:version_id,
            user_id:user_id,
            starts_at:starts_at,
            ends_at:ends_at,
            user_id:req.body.user_id
        })
            .then(function(response){
            // Ici, on sort de la fonction pour éviter qu'elle reboucle.
            next();
        })
        .catch(function(err) {
            console.log(err)
        });
    },

    sendJSONDataRaf:async function(req, res) {

        const version_id = req.params.version_id;
        // Appel de modules (routes/modules.js)
        const modules = require('./modules');
        const department_slug = await modules.getDepSlugByVersion(version_id);
        const contribution_name = await modules.getContribNameByVersion(version_id);
        const comment_admin = await modules.getAdminComment(version_id);

        const data = {
            department_slug,
            contribution_name,
            comment_admin
        }
        res.status(200).json(data);
    },
}