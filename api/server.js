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
/* const db = knex({
    client:'pg',
    connection:'' // se connecter sur une base de donner postgrsql - demander à Cyril car lié à Heroku
}) */
const db = require('./db');
var cors = require('cors');
app.use(cors());

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretKey';

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
app.get("/", function(req, res) { res.json({message: "Express is up!"}); });
app.post('/login', require('./routes/login'));
app.post("/secret", passport.authenticate('jwt', {session:false}), function(req, res){
    res.json("Vous êtes connecté, sans ça vous ne pourriez pas voir ce message."); 
});






app.listen(PORT, function () { // 3000 = nom du port sur lequel le serveur va être lancé
    console.log(`Example app listening on port ${PORT}!`)
});

// Routes
// app.get('/users', require('./routes/getUsers'));
// app.get('/users/:username', require('./routes/getUsersByUsername'));
// // app.get('/passport', require('./routes/passport'));