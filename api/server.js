// api/server.js
const PORT = process.env.PORT || 3000; // process utilisé par l'application nodeJS.

// Appel des modules utilisés
const _ = require('lodash');
const express = require('express'); // appelle express dans une variable
const app = express(); // équivaut à une instance de express
const busboy = require('express-busboy');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// Appel de CORS, pour éviter les problèmes côté client lors des appels à la BDD
var cors = require('cors');
app.use(cors());

busboy.extend(app, {});

// Module d'authentification
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '$Tne"é9:§§"__ù';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  // console.log('payload received', jwt_payload);
  //database call:
  var user = users[_.findIndex(users, { id: jwt_payload.id })];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);
app.use(passport.initialize());



// Authentication.
app.post('/api/login', require('./routes/login'));

// Campaign-related routes.
app.post('/api/campaign', require('./routes/campaigns/new'));
app.get('/api/campaign', require('./routes/campaigns/find'));

// Contribution-related routes.
app.get('/api/contributions', require('./routes/contributions/getContributions'));
app.get('/api/contributionRaf/:contribution_id/version/:version_id/user/:user_id', require('./routes/contributions/getContributionRaf'));
app.get('/api/contribution/:contribution_id', require('./routes/contributions/getContribution'));
app.get('/api/contributionFiliale/:version_id/user/:user_id', require('./routes/contributions/getContributionFiliale'));
app.post('/api/contributionRaf/:version_id', require('./routes/contributions/newContributionRaf'));
app.post('/api/contributionFiliale/:version_id', require('./routes/contributions/newContributionFiliale'));

// Contributor-related routes.
app.get('/api/contributor/:user_id', require('./routes/contributor/home'));

// Policy-related routes.
app.get('/api/createPolicies', require('./routes/policies/getPolicy'));
app.post('/api/createPolicies', require('./routes/policies/newPolicy'));
app.delete('/api/createPolicies/:policy_id', require('./routes/policies/deletePolicy'));

// Input-related routes.
app.get('/api/inputs/:contribution_id/version/:version_id', require('./routes/inputs/getInputs'));

// Version-related routes.
app.get('/api/versionRefused/:version_id', require('./routes/versions/getVersion'));
app.post('/api/versionRefused/:version_id/:contribution_id', require('./routes/versions/newVersion'));
app.patch('/api/versionValidate/:version_id', require('./routes/versions/validateVersion'));
app.patch('/api/versionSubmit/:version_id', require('./routes/versions/submitVersion'));
app.get('/api/versionView/:contribution_id/version/:version_id', require('./routes/versions/viewVersion'));

// DTM-related routes.
app.get('/api/dtm/top/:year/:month', require('./routes/dtm/top'));
app.get('/api/dtm/breakdown/sector/:year/:month', require('./routes/dtm/breakdownBySector'));
app.get('/api/dtm/breakdown/line/:year/:month', require('./routes/dtm/breakdownByLine'));

// Highlights-related routes.
app.get('/api/highlights', require('./routes/dtm/highlights'));

app.listen(PORT, function () { // 3000 = port sur lequel le serveur va être lancé
  console.log(`Hestia Server listening on port ${PORT}`)
});
