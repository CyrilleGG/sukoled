// api/routes/contribution.js
// Appel à la BDD
var knex = require('../utilities/database')

// GET des informations liées à la contribution.

module.exports = (req, res) => {
    knex('contributions').join('departments','contributions.department_id','=','departments.id')
    .join('contributions_inputs', 'contributions.id', '=', 'contributions_inputs.contribution_id')
    .join('policies', 'contributions.id', '=', 'policies.contribution_id')
    .join('versions' ,'contributions.id' ,'=', 'versions.contribution_id')
    .select(
        'contributions.id', 
        'contributions.name', 
        'contributions.period', 
        'departments.name as slug', 
        'contributions_inputs.input_type', 
        'policies.user_id', 
        'policies.can_write', 
        'policies.can_read'
    )
    .then((contributions) => {
        res.json(contributions);
    })
    .catch((error) => {
        res.status(500).json({ error });
        console.log('false');
    });
}