const _ = require('lodash');
var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

module.exports = {
    home: async function(req, res) {
        const contributions = await knex.select(
            'version.id AS version_id',
            'version.name AS version_name',
            'version.ends_at AS version_ends_at',
            'version.created_at AS version_created_at',
            'version.status_contributor AS version_status_contributor',
            'department.name AS department_name',
            'contribution.id AS contribution_id'
        )
        .from('versions as version')
        .innerJoin('contributions as contribution', 'version.contribution_id', 'contribution.id')
        .innerJoin('departments as department', 'contribution.department_id', 'department.id')
        .where({
            'version.user_id': req.params.user_id
        })
        .groupBy('ends_at')
        .orderBy('ends_at', 'desc');

        let waiting = [];
        let done = [];

        contributions.forEach(function(contribution) {
            if (contribution.version_status_contributor !== 'done') {
                waiting.push(contribution);
            } else {
                done.push(contribution);
            }
        });

        res.json({ waiting, done })
    }
};