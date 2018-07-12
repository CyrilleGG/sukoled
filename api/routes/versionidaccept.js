// api/routes/versionidaccept
// Appel à la BDD
var knex = require('../utilities/database')

// Changer les status d'une contribution afin de lui donner le status "acceptée"

module.exports = {
    sendInfoToDBValidate: async function (req, res) {
        var versionId = req.params.version_id

        knex('versions')
            .where({ 'versions.id': versionId })
            .update({ status_admin: 'done', status_contributor: 'done' })
                .then(() => {
                    res.json('ok')
                })
                .catch(function (err) {
                    res.json(err)
                });
    },

    sendInfoToDBSubmit: async function (req, res) {
        var versionId = req.params.version_id
        var input = req.body

        console.log(input)

        knex('contributions_values')
            .where({ 'contributions_values.id': input.input_value_id })
            .update({ value: input.input_value })
                .then(() => {
                    knex('versions')
                        .where({ 'versions.id': versionId })
                        .update({ status_admin: 'done', status_contributor: 'done' })
                            .then(() => {
                                res.json('ok')
                            })
                            .catch(function (err) {
                                res.json(err)
                            });
                })
                .catch(function (err) {
                    res.json(err)
                });
    }
}