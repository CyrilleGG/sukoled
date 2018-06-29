var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});
// GET des informations de la table 'contributions'.

module.exports = (req, res) => {
    knex('contributions').join('departments','contributions.department_id','=','departments.id')
    .select('contributions.name', 'contributions.period', 'departments.name as slug', 'contributions.id')
    .then((contributions) => {
        console.log(contributions);
        res.json(contributions);
    })
    .catch((error) => {
        res.status(500).json({ error });
        console.log('false');
    });
}