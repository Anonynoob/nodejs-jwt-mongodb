const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv/config');
const key = process.env.TOKEN_KEY;
const jwt = require('jsonwebtoken');
const user = require('./app/models/user.model.js');
//create Express App
const app = express();
// app.use(env());
app.use(helmet())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors());

//JWT
app.use(function (req, res, next) {
   try {
       const token = req.headers.authorization.split(' ')[1]
       jwt.verify(token, key, function (err, payload) {
           console.log('payload ' + payload)
           if (payload) {
               user.findById(payload._id).then(
                   (doc) => {
                       req.user = doc;
                       next()
                   }
               ).catch(err =>{
                    console.log('user not found '+ err);
               });
           } else {
               console.log('payload null/undefined '+err);
               next()
           }
       })
   } catch (e) {
       console.log(e);
       return res.sendStatus(404);
   } 
});

//database config
const dbConfig = require('./config/database.config'),
 mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connect to db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=> {
    console.log("Success");
}).catch(err => {
    console.log('Failed', err);
    process.exit();
});


//simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
const port = process.env.port || 4000;
app.listen(port, () => {
    console.log("Server is listening on port " + port + " "+ process.env.TOKEN_KEY);
});