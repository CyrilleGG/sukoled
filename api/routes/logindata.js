var pg = require('pg');
var pg = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});

module.exports = (req, res) => {
    pg('departments').select('slug','name','created_at')
    .then((departments) => {
        res.json(departments);
        console.log(departments);
        // process.exit()
    })
    .catch((error) => {
        res.status(500).json({ error });
        console.log('false');
    });
}

console.log('hey')

// var query = knex.raw('id', 'name', 'created_at').from('contributions');
// knex('contributions').select('id','name','created_at');