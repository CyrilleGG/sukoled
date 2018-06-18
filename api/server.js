const PORT = process.env.PORT || 3000; // process utilisé par l'application nodeJS.

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
const knex = require('knex');
const db = require('./db');
var pg = require('knex')({
    client:'pg',
    connection: 'postgres://lpcbrcdmurqmbq:925a55a6db9dc1c88c272a80da7166da31e635b27ff6c1911636095a6a0eb8a2@ec2-46-51-179-166.eu-west-1.compute.amazonaws.com:5432/dbnba4ihfii687?ssl=true'
});

// db.select().from('activities')

var cors = require('cors');
app.use(cors());

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

//parse application for easier testing
app.use(bodyParser.urlencoded({
    extended:true
}));

//parse application/json
app.use(bodyParser.json())


// Routes
app.get('/', function(req, res) { res.json({message: "Express is up!"}); });
app.post('/login', require('./routes/login'));
app.get('/raf', require('./routes/raf'));
app.get('/filiale', require('./routes/filiale'));
app.get('/contribraf', require('./routes/contributionListRAF'))
app.get('/contribfiliale', require('./routes/contributionListFiliale'))

var createcontrib = require('./routes/createcontrib');
app.post('/createcontrib', createcontrib.sendInfoToDB);
app.get('/createcontrib', createcontrib.sendJSONData);






app.listen(PORT, function () { // 3000 = nom du port sur lequel le serveur va être lancé
    console.log(`Example app listening on port ${PORT}!`)
});