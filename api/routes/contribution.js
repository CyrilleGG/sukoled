var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

// GET des informations liées à la contribution.

module.exports = (req, res) => {
    knex('contributions').join('departments','contributions.department_id','=','departments.id')
    .join('inputs_contributions', 'contributions.id', '=', 'inputs_contributions.contribution_id')
    .join('policies', 'contributions.id', '=', 'policies.contribution_id')
    .join('versions' ,'contributions.id' ,'=', 'versions.contribution_id')
    .select( 'contributions.id', 'contributions.name', 'contributions.period', 'departments.name as slug', 'inputs_contributions.input_type', 'policies.user_id', 'policies.can_write', 'policies.can_read')
    .then((contributions) => {
        console.log(contributions);
        res.json(contributions);
    })
    .catch((error) => {
        res.status(500).json({ error });
        console.log('false');
    });
}