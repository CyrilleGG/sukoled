const db = require('../db');
var users = require('../db/users.js');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
var jwtOptions = {}
const ExtractJwt = passportJWT.ExtractJwt;
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = '$Tne"é9:§§"__ù';

// Envoie des données reçus depuis le front (username & password) et envoie vers la database.
// Si les données correspondent, alors on donne un token

module.exports = (req, res) => {
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
    }
    // Si l'utilisateur (front) existe dans la database, on passe à l'étape suivante, sinon on renvoie un message d'erreur.
    var user = users[_.findIndex(users, {username:username})];
    if(!user){
        res.status(401).json({message:"L'utilisateur n'a pas été trouvé"});
    }
    else if(user.password === req.body.password) {
        // Si le mot de passe correspond au pseudonyme utilisateur, on envoie un token, sinon on renvoie un message d'erreur.
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message:"Ok", token:token, username:username, role:user.role});
    } else {
        res.status(401).json({message:"Le mot de passe ne correspond pas"});
    }
}