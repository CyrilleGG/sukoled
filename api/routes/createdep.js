var pg = require('pg');
var knex = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});

module.exports = (req, res) => {
    knex('departments').insert({slug:req.body.slug, name:req.body.name})
        .then(function(result) {
            res.json(`Successfully created ${slug} as ${name} !`)
        })
}

console.log('heyyyy')