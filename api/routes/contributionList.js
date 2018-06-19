var pg = require('pg');
var knex = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});

module.exports = (req, res) => {
    knex('contributions').join('departments','contributions.department_id','=','departments.id')
    .select('contributions.name', 'contributions.period', 'departments.name as slug', 'contributions.id')
    .then((contributions) => {
        res.json(contributions);
        console.log(contributions);
        // process.exit()
    })
    .catch((error) => {
        res.status(500).json({ error });
        console.log('false');
    });
}