const key = process.env.TOKEN_KEY;
const jwt = require('jsonwebtoken');
const user = require('../models/user.model.js');
const error = require('./errors')
exports.tokenVerifier = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]
        if(!token) return res.status(401).send('Access Denied')
        jwt.verify(token, key, function (err, payload) {
            console.log('payload ' + payload)
            if (payload) {
                user.findById(payload._id).then(
                    (doc) => {
                        req.user = doc;
                        next()
                    }
                ).catch(err => {
                    console.log('user not found. ' + err);
                    // return res.status(404).send('Sorry, Not Found')
                    return error.unAuthorized(res);
                });
            } else {
                console.log('payload null/undefined. ' + err);
                // return res.status(401).send('Access Denied')
                return error.accessDenied(res);
                // next()
            }
        })
    } catch (e) {
        // console.log(e);
        // return res.status(404).send('Sorry, Not found.');
        return error.unAuthorized(res);
    }
}

