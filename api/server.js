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

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretKey';

var users = require('./db/users');

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
app.get("/", function(req, res) {
    res.json({message: "Express is up!"});
});

app.post("/login", function(req, res) {
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
    }
    //database call :
    var user = users[_.findIndex(users, {username:username})];
    if(!user){
        res.status(401).json({message:"L'utilisateur n'a pas été trouvé"});
    }
    else if(user.password === req.body.password) {
        // Now we use the ID to identify the user
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message:"Ok", token:token});
    } else {
        res.status(401).json({message:"Le mot de passe ne correspond pas"});
    }
});

app.get("/secret", passport.authenticate('jwt', {session:false}), function(req, res){
    res.json("Vous êtes connecté, sans ça vous ne pourriez pas voir ce message."); 
});




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




app.listen(PORT, function () { // 3000 = nom du port sur lequel le serveur va être lancé
    console.log(`Example app listening on port ${PORT}!`)
});




// Routes
// app.get('/users', require('./routes/getUsers'));
// app.get('/users/:username', require('./routes/getUsersByUsername'));
// // app.get('/passport', require('./routes/passport'));