const _ = require('lodash');
var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

module.exports = {
    list: async function(req, res) {
        const contributions = await knex.select(
            'version.id AS version_id',
            'version.starts_at AS version_starts_at',
            'version.ends_at AS version_ends_at',
            'version.created_at AS version_created_at',
            'version.status_admin AS version_status_admin',
            'department.name AS department_name',
            'contribution.id AS contribution_id',
            'contribution.name AS contribution_name',
            'contribution.order AS contribution_order'
        )
        .from('versions as version')
        .innerJoin('contributions as contribution', 'version.contribution_id', 'contribution.id')
        .innerJoin('departments as department', 'contribution.department_id', 'department.id')
        .groupBy('contribution_id')
        .orderBy('version_created_at', 'desc');

        res.json({ contributions })
    }
};
