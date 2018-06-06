module.exports = (req, res) => {
    var users = require('../db/users.js');
    const _ = require('lodash');
    const jwt = require('jsonwebtoken');
    const passportJWT = require('passport-jwt');
    var jwtOptions = {}
    const ExtractJwt = passportJWT.ExtractJwt;
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = 'secretKey';
    

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
}
