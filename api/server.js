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
app.get('/api/raf', require('./routes/raf'));
app.get('/api/filiale', require('./routes/filiale'));
app.get('/api/contributions', require('./routes/contributionList'))

// app.get('/contribution/:contribution_id', require('./routes/contributionId'))
var contributionId = require('./routes/contributionId')
app.get('/api/contribution/:contribution_id', contributionId.sendInfoToClient) //
app.post('/api/campaign/'/*'/api/campaign/:contribution_id'*/, require ('./routes/campaign.js'))

app.get('/api/contribution/:contribution_id/version/:version_id', require('./routes/versionid'))

app.post('/api/contribution/:contribution_id/version/:version_id/refused', require('./routes/versionidrefused'))
app.patch('/api/contribution/:contribution_id/version/:version_id/accept', require('./routes/versionidaccept'))

var createcontrib = require('./routes/createcontrib');
app.post('/api/createcontrib', createcontrib.sendInfoToDB);
app.get('/api/createcontrib', createcontrib.sendJSONData);






app.listen(PORT, function () { // 3000 = port sur lequel le serveur va être lancé
    console.log(`Example app listening on port ${PORT}!`)
});