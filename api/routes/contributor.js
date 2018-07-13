// api/routes/contributor
const _ = require('lodash');
// Appel à la BDD
var knex = require('../utilities/database')

// Récupération des informations liés à une contribution auquel le contributeur a les droits

// Récupération des informations liés à une contribution auquel le contributeur a les droits

module.exports = {
    home: async function (req, res) {
        const contributions = await knex.select(
            'version1.id AS version_id',
            'version1.name AS version_name',
            'version1.ends_at AS version_ends_at',
            'version1.created_at AS version_created_at',
            'version1.status_contributor AS version_status_contributor',
            'version1.parent_version_id',
            'department.name AS department_name',
            'department.slug AS department_slug',
            'contribution.id AS contribution_id',
            'contribution.name AS contribution_name'
        )
            .from('versions as version1')
            .leftOuterJoin('versions as version2', function () {
                this.on('version1.contribution_id', '=', 'version1.contribution_id').andOn('version1.created_at', '>', 'version2.created_at')
            })
            .innerJoin('contributions as contribution', 'version1.contribution_id', 'contribution.id')
            .innerJoin('departments as department', 'contribution.department_id', 'department.id')
            .innerJoin('policies', 'version1.contribution_id', 'policies.contribution_id')
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
