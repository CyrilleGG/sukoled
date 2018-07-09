const PORT = process.env.PORT || 3000; // process utilisé par l'application nodeJS.

// Appel des modules utilisés
const _ = require('lodash');
const express = require('express'); // appelle express dans une variable
const app = express(); // équivaut à une instance de express
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const mysql = require('mysql');
const db = require('./db');
var knex = require('knex')({
    client:'mysql',
    connection: 'mysql://DpNxguDvZwPWcm4u:JQ9hUBgXhAcsnknYBUadaxmscd6R4fVn@wsf-sukoled.czjrbeoyz2de.eu-west-3.rds.amazonaws.com:3306/natixis?ssl=true'
});

// Appel de CORS, pour éviter les problèmes côté client lors des appels à la BDD
var cors = require('cors');
app.use(cors());

// Module d'authentification
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '$Tne"é9:§§"__ù';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    //database call:
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
passport.use(strategy);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())


// Routes
app.get('/api/', function(req, res) { res.json({message: "Express is up!"}); });
app.post('/api/login', require('./routes/login'));

var contributionId = require('./routes/contributionId')
app.get('/api/contribution/:contribution_id/user/:user_id', contributionId.sendInfoToClient) // user_id

var campaign = require('./routes/campaign.js')
app.post('/api/campaign/', campaign.sendInfoToDBCampaign) // /:contribution_id ?
app.get('/api/campaign/', campaign.SendJSONDataCampaign)

// Route pour récupérer les données d'une version
var versionView = require('./routes/versionView');
app.get('/api/versionView/:version_id/user/:user_id', versionView.SendJSONDataContribView) // version_id
// app.post('/api/contributionView/:version_id', contributionView.SendInfoToClientContribView)
// app.get('/api/contributionView/:version_id', require('./routes/versionid'))

// Routes pour refuser ou accepter une version : si refusé alors on crée une nouvelle version, si accepté alors on la patch
var contribRefused = require('./routes/versionidrefused');
app.get('/api/versionRefused/:version_id/user/:user_id', contribRefused.sendJSONDataRefuse); // user_id
app.post('/api/versionRefused/:version_id/:contribution_id', contribRefused.sendInfoToDBRefuse); // version_id
app.patch('/api/versionAccept/:version_id', require('./routes/versionidaccept'));

// Création d'une contribution : to delete
var createcontrib = require('./routes/createcontrib');
app.get('/api/createcontrib/:version_id', createcontrib.sendJSONData); // Pas de droits hors admin
app.post('/api/createcontrib', createcontrib.sendInfoToDB);

// Contributeur : Création d'une version d'une contribution Non-Raf
var contributionFiliale = require('./routes/contributionFiliale');
app.get('/api/contributionFiliale/:version_id/user/:user_id', contributionFiliale.sendJSONDataFiliale); // :user_id
app.post('/api/contributionFiliale/:version_id', contributionFiliale.sendInfoToDBFiliale);

// Contributeur : Création d'une version d'une contribution Raf
var contributionRaf = require('./routes/contributionRaf');
app.get('/api/contributionRaf/:version_id/user/:user_id', contributionRaf.sendJSONDataRaf); // user_id
app.post('/api/contributionRaf/:version_id', contributionRaf.sendInfoToDBRaf);

var contributor = require('./routes/contributor')
app.get('/api/contributor/:user_id', contributor.home)

var inputs = require('./routes/inputs')
app.get('/api/inputs/:contribution_id/version/:version_id/:user_id', inputs.version) // user_id

var createPolicies = require('./routes/createPolicies')
app.get('/api/createPolicies', createPolicies.sendJSONDataPolicies)
app.post('/api/createPolicies', createPolicies.sendInfoToDBPolicies)
app.delete('/api/createPolicies', createPolicies.deletePolicies)

var contributions = require('./routes/contributions')
app.get('/api/contributions', contributions.list)


app.listen(PORT, function () { // 3000 = port sur lequel le serveur va être lancé
    console.log(`Example app listening on port ${PORT}!`)
});
