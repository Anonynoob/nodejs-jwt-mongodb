module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const products = require('../controllers/product.controller.js');
    const users = require('../controllers/user.controller');
    const mid = require('../helpers/middleware');
    // Create a new Note
    app.post('/notes/register', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

    app.post('/products/save', products.create);
    app.get('/products', mid.tokenVerifier, products.findAll);
    app.put('/products/update/:productId', products.update);
    app.get('/products/edit/:productId', products.findOne);

    app.post('/api/auth/signin', users.findOne);
    app.post('/user/register', users.create);
    app.get('/users', mid.tokenVerifier ,users.findAll);
}