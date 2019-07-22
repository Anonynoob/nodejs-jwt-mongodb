// const Note = require('../models/product.model.js');
const User = require('../models/user.model.js');
var Validator = require('jsonschema').Validator;
var v = new Validator();
const key = process.env.TOKEN_KEY;
const jwt = require('jsonwebtoken');
// var instance = 4;
// var schema = { "type": "number" };
// console.log(v.validate(instance, schema));
// create and save new note
exports.create = (req, res) => {
    //    console.log(req.body.password);
    const user = new User({
        first: req.body.first,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image
    });

    // save note in database
    user.save()
        .then(data => {
            res.send(data);
            res.status(200).send();
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the note"
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving notes"
            });
        });
};

// Find a single note with a productId
exports.findOne = (req, res) => {
    // console.log(req.body.password);
    // console.log(req.body.email);
    // console.log(key)
    User.findOne({ email: req.body.email })
        .then(user => {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch) {
                    // console.log(user._id);
                    var token = jwt.sign(user._id.toHexString(), key);
                    // res.status(200).json({
                    //     userId: user.id,
                    //     username: user.username,
                    //     image: user.image,
                    //     name: user.first,
                    //     token
                    // });
                    console.log(token);
                    res.send(token);
                }
                else {
                    console.log(err);
                    res.status(400).json({ message: 'Invalid Password/Username' });

                }
            });

        }).catch(err => {
            console.log(err);
            return res.status(400).json({ message: 'Invalid Password/Username' });
        });
};

