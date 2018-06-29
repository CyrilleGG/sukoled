var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

// Afficher tous les départements qui ont le name 'RAF'

module.exports = (req, res) => {
    knex('departments').select('*').where({name:'RAF'})
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