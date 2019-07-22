// const Note = require('../models/product.model.js');
const Product = require('../models/product.model.js');
var Validator = require('jsonschema').Validator;
var v = new Validator();
// var instance = 4;
// var schema = { "type": "number" };
// console.log(v.validate(instance, schema));
// create and save new note
exports.create = (req, res) => {
    var schema = {
        "productname": "String",
        "productdescription": "String",
        "productprice" : "Number"
    }
    // Validate request
    // if (!req.body.content) {
    //     console.log(req.body.content);
    //     return res.status(400).send({
    //         message: "product content can not be empty"
    //     });
    // }
    // var result = v.validate(req.body, schema);
    // while (result) {
    //     console.log(result);
    //     return res.status(404).send({
    //         message: "404"
    //     });
    // }
    // Create a product
    const product = new Product({
        ProductName: req.body.productname,
        ProductDescription: req.body.productdescription,
        ProductPrice : req.body.productprice
    });

    // save note in database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the note"
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Product.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving notes"
            });
        });
};

// Find a single note with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id" + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error retrieving product with id " + req.params.productId
            });
        });
};

// Update a note identified by the productId in the request
exports.update = (req, res) => {
    // Validate request
    // if (Object.keys(req.body).length === 0) {
    //     return res.status(400).send({
    //         message: "product content can not be empty"
    //     });
    // }

    // Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        ProductName: req.body.productname,
        ProductDescription: req.body.productdescription,
        ProductPrice: req.body.productprice
    }, { new: true })
        .then(product => {
            if (!product) {
                console.log(req.params.productId);
                return res.status(500).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(400).send({
                    message: "Note not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.productId
            });
        });
};

// Delete a note with the specified productId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.productId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.productId
                });
            }
            res.send({ message: "Note deleted successfully" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "could not delete note with id " + req.params.productId
            });
        });
};