// api/routes/contributor
const _ = require('lodash');
// Appel à la BDD
var knex = require('../utilities/database')

// Récupération des informations liés à une contribution auquel le contributeur a les droits

// Récupération des informations liés à une contribution auquel le contributeur a les droits

module.exports = {
    home: async function (req, res) {
        const contributions = await knex.select(
            'version.id AS version_id',
            'version.name AS version_name',
            'version.ends_at AS version_ends_at',
            'version.created_at AS version_created_at',
            'version.status_contributor AS version_status_contributor',
            'version.parent_version_id',
            'department.name AS department_name',
            'contribution.id AS contribution_id',
            'contribution.name AS contribution_name'
            )
            .from('versions as version')
            .innerJoin('contributions as contribution', 'version.contribution_id', 'contribution.id')
            .innerJoin('departments as department', 'contribution.department_id', 'department.id')
            .innerJoin('policies', 'version.contribution_id', 'policies.contribution_id')
            .where({
                'policies.user_id': req.params.user_id,
            })
            .groupBy('contribution_id')
            .orderBy('version_created_at', 'desc')

        let waiting = [];
        let done = [];

        contributions.forEach(function (contribution) {
            if (contribution.version_status_contributor !== 'done') {
                // console.log(contribution)
                waiting.push(contribution);
            } else {
                // console.log(contribution)
                done.push(contribution);
            }
        });

        res.json({ waiting, done })
    }
};